var Datastore = require('nedb-promises');
const express = require("express");
const router = express.Router();
const PERMITTED_ROUTES = process.env.PERMITTED_ROUTES.split(" ");
const API_KEY = process.env.API_KEY;
let customer = Datastore.create(__dirname + `/db/ne_customer.db`);
let product = Datastore.create(__dirname + `/db/ne_product.db`);
let invoice = Datastore.create(__dirname + `/db/ne_invoice.db`);
customer.ensureIndex({ fieldName: "name", unique: true })
product.ensureIndex({ fieldName: "name", unique: true })

let db = {
    customer,
    product,
    invoice
}


const allowedRoutes = (req, res, next) => {
    const currentCollection = req.params.collection;
    if (PERMITTED_ROUTES.indexOf(currentCollection) === -1) {
        res.statusCode = 409;
        return next("Route Not Allowed")
    }
    next();
};

const auth = (req, res, next) => {
    let apiKey = req.headers["x-api-key"];
    if (apiKey !== API_KEY) {
        res.statusCode = 401;
        return next("Incorrect API Key")
    }
    next();
};


router.get("/:collection", allowedRoutes, auth, async (req, res) => {
    try {
        const { collection } = req.params
        let result = await db[collection].find();
        res.json(result)
    } catch (err) {
        res.statusCode = 500;
        res.json({ err: err.message })
    }

})

router.post("/:collection", async (req, res) => {
    try {
        const { collection } = req.params
        const result = await db[collection].insert(req.body);
        res.json(result);
    } catch (err) {
        res.statusCode = 500;
        res.json({ err: err.message })
    }
})

router.get("/:collection/:id", async (req, res) => {
    try {
        const { collection, id } = req.params
        const result = await db[collection].findOne({ _id: id });
        if (result === null) {
            res.statusCode = 404;
        }
        return res.json(result);
    } catch (err) {
        res.statusCode = 500;
        res.json({ err: err.message })
    }
})

router.delete("/:collection/:id", async (req, res) => {
    try {
        const { collection, id } = req.params
        const result = await db[collection].remove({ _id: id }, { multi: false });
        if (result === 0) {
            res.statusCode = 404;
        }

        return res.json(result);
    } catch (err) {
        res.statusCode = 500;
        res.json({ err: err.message })
    }

})

router.put("/:collection/:id", async (req, res) => {
    try {
        const { collection, id } = req.params
        const result = await db[collection].update({ _id: id }, { $set: req.body });
        res.json(result);
    } catch (err) {
        res.statusCode = 500;
        res.json({ err: err.message })
    }
})

router.get("/", async (req, res) => {
    res.json({ message: "Invoice API" })
})


module.exports = router;