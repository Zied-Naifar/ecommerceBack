const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name']
  },
  description: {
    type: String,
    required: [true, 'Please add a product description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a product price']
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  productId: {
    type: String
  },
  visible: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    required: [true, 'Please add a product category']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', ProductSchema)
