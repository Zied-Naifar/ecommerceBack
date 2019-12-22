const express = require("express");
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
} = require("../controllers/orders");

const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth");

router.use(protect);

router
  .route("/")
  .get(getOrders)
  .post(createOrder);

router
  .route("/:id")
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder);

module.exports = router;
