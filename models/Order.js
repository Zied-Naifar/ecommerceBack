const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmpty } = require("lodash");

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
          ref: "Product",
          required: true
        },
        quantity: {
          type: String,
          required: true
        }
      }
    ],
    validate: {
      validator: function(e) {
        if (!isEmpty(e)) {
          return true;
        } else {
          return false;
        }
      },
      message: () => `You can't pass an empty order`
    }
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
