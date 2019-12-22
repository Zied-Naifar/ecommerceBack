const path = require("path");
const fs = require("fs");
const asyncHandler = require("../middleware/async");
const Product = require("../models/Product");
const { isEmpty } = require("lodash");

// @desc      Get all products
// @route     GET /api/v1/products
// @access    Private
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    data: products
  });
});

// @desc      Get single product
// @route     GET /api/v1/products/:id
// @access    Private
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc      Create product
// @route     POST /api/v1/products
// @access    Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  const sortedProduct = await Product.find().sort("-productId");
  var newProduct;
  var productId;
  if (isEmpty(sortedProduct)) {
    productId = 1;
  } else {
    productId = sortedProduct[0].productId + 1;
  }
  newProduct = await Product.create({
    ...req.body,
    productId
  });
  res.status(200).json({
    success: true,
    data: newProduct
  });
});

// @desc      Update product
// @route     PUT /api/v1/products/:id
// @access    Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedProduct
  });
});

// @desc      Delete product
// @route     DELETE /api/v1/products/:id
// @access    Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      visible: false
    },
    {
      new: true
    }
  );

  console.log("deletedProduct: ", deletedProduct);

  if (deletedProduct) {
    const deletedPhotoPath = `${process.env.FILE_UPLOAD_PATH}/${deletedProduct.photo}`;

    fs.unlink(deletedPhotoPath, err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("photo delete success");
    });
    res.status(200).json({
      success: true,
      data: deletedProduct
    });
  }
});

// @desc      Upload photo for product
// @route     PUT /api/v1/products/:id/photo
// @access    Private
exports.productPhotoUpload = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }
  // Create custom filename
  file.name = `photo_${product.productId}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Product.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});
