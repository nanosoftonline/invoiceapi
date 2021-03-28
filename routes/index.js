const express = require("express");
const router = express.Router();

const HomeRouter = require("./home");
const InvoiceRouter = require("./invoice");
const CustomerRouter = require("./customer");
const ProductRouter = require("./product");


router.use("/invoice", InvoiceRouter)
router.use("/customer", CustomerRouter)
router.use("/productr", ProductRouter)
router.use("/", HomeRouter)

module.exports = router;