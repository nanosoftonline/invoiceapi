var Datastore = require('nedb-promises');
var customerDB = Datastore.create(__dirname + '../db/ne_post.db');

async function getAll() {
    let result = await customerDB.find();
    return result;
}

async function create(customer) {
    let result = await customerDB.insert(customer);
    return result;
}

async function update({ id, customer }) {
    let result = await customerDB.update({ _id: id }, customer);
    return result;
}

async function getOne(id) {
    let result = await customerDB.findOne({ _id: id });
    return result;

}

async function deleteOne(id) {
    let result = await customerDB.remove({ _id: id }, { multi: false });
    return result;
}

module.exports = {
    getAll,
    create,
    update,
    getOne,
    deleteOne
}