const asyncHandler = require("../middleware/async");
const Order = require("../models/Order");

// @desc      Get all orders
// @route     GET /api/v1/orders
// @access    Private
exports.getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find()
    .populate({
      path: "products.product",
      model: "Product"
    })
    .populate("createdBy");

  res.status(200).json({
    success: true,
    data: orders
  });
});

// @desc      Get single order
// @route     GET /api/v1/orders/:id
// @access    Private
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate({
      path: "products.product",
      model: "Product"
    })
    .populate("createdBy");

  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc      Create order
// @route     POST /api/v1/orders
// @access    Private
exports.createOrder = asyncHandler(async (req, res, next) => {
  const orderFields = {};
  orderFields.createdBy = req.user.id;
  if (req.body.clientPhoneNumber)
    orderFields.clientPhoneNumber = req.body.clientPhoneNumber;
  if (req.body.clientAddress)
    orderFields.clientAddress = req.body.clientAddress;
  if (req.body.clientName) orderFields.clientName = req.body.clientName;
  if (req.body.products) orderFields.products = req.body.products;

  const newOrder = await Order.create(orderFields);
  res.status(200).json({
    success: true,
    data: newOrder
  });
});

// @desc      Update order
// @route     PUT /api/v1/orders/:id
// @access    Private
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .populate({
      path: "products.product",
      model: "Product"
    })
    .populate("createdBy");

  res.status(200).json({
    success: true,
    data: updatedOrder
  });
});

// @desc      Delete order
// @route     DELETE /api/v1/orders/:id
// @access    Private
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: deletedOrder
  });
});
