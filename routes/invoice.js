const express = require("express");
const router = express.Router();
const InvoiceRepository = require("../repositories/invoice");

router.get("/", async (req, res) => {
    const result = await InvoiceRepository.getAll();
    res.json(result)
})

router.post("/", async (req, res) => {
    const invoice = req.body;
    const result = await InvoiceRepository.create(invoice);
    res.json(result);
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    const result = await InvoiceRepository.getOne(id);
    res.json(result);
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const result = await InvoiceRepository.deleteOne(id);
    res.json(result);

})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    const result = await InvoiceRepository.update({ id, invoice: req.body });
    res.json(result);
})

module.exports = router;