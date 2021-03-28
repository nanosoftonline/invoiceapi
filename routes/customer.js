const express = require("express");
const router = express.Router();
const CustomerRepository = require("../repositories/customer");

router.get("/", async (req, res) => {
    const result = await CustomerRepository.getAll();
    res.json(result)
})

router.post("/", async (req, res) => {
    const customer = req.body;
    const result = await CustomerRepository.create(customer);
    res.json(result);
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    const result = await CustomerRepository.getOne(id);
    res.json(result);
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const result = await CustomerRepository.deleteOne(id);
    res.json(result);

})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    const result = await CustomerRepository.update({ id, customer: req.body });
    res.json(result);
})

module.exports = router;