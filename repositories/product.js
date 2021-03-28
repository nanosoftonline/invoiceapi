var Datastore = require('nedb-promises');
var productDB = Datastore.create(__dirname + '../db/ne_post.db');

async function getAll() {
    let result = await productDB.find();
    return result;
}

async function create(product) {
    let result = await productDB.insert(product);
    return result;
}

async function update({ id, product }) {
    let result = await productDB.update({ _id: id }, product);
    return result;
}

async function getOne(id) {
    let result = await productDB.findOne({ _id: id });
    return result;

}

async function deleteOne(id) {
    let result = await productDB.remove({ _id: id }, { multi: false });
    return result;
}

module.exports = {
    getAll,
    create,
    update,
    getOne,
    deleteOne
}