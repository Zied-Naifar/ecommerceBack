const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, "Please add a valid client name"]
  },
  clientAddress: {
    type: String,
    required: [true, "Please add a valid client address"]
  },
  clientPhoneNumber: {
    type: String,
    required: [true, "Please add a valid client phone number"]
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: {
          type: String
        }
      }
    ],
    required: [true, "Please add order products"]
  },
  isPrinted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
