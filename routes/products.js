const express = require('express')
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productPhotoUpload
} = require('../controllers/products')

const router = express.Router({ mergeParams: true })

const { protect } = require('../middleware/auth')

// router.use(protect);

router
  .route('/')
  .get(getProducts)
  .post(createProduct)

router
  .route('/:id')
  .get(getProduct)
  .put(updateProduct)

router.put('/:id/delete', deleteProduct)

router.put('/:id/photo', productPhotoUpload)

module.exports = router
