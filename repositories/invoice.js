var Datastore = require('nedb-promises');
var invoiceDB = Datastore.create(__dirname + '../db/ne_post.db');

async function getAll() {
    let result = await invoiceDB.find();
    return result;
}

async function create(invoice) {
    let result = await invoiceDB.insert(invoice);
    return result;
}

async function update({ id, invoice }) {
    let result = await invoiceDB.update({ _id: id }, invoice);
    return result;
}

async function getOne(id) {
    let result = await invoiceDB.findOne({ _id: id });
    return result;

}

async function deleteOne(id) {
    let result = await invoiceDB.remove({ _id: id }, { multi: false });
    return result;
}

module.exports = {
    getAll,
    create,
    update,
    getOne,
    deleteOne
}