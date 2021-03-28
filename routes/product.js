const express = require("express");
const router = express.Router();
const ProductRepository = require("../repositories/product");

router.get("/", async (req, res) => {
    const result = await ProductRepository.getAll();
    res.json(result)
})

router.post("/", async (req, res) => {
    const product = req.body;
    const result = await ProductRepository.create(product);
    res.json(result);
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    const result = await ProductRepository.getOne(id);
    res.json(result);
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const result = await ProductRepository.deleteOne(id);
    res.json(result);

})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    const result = await ProductRepository.update({ id, product: req.body });
    res.json(result);
})

module.exports = router;