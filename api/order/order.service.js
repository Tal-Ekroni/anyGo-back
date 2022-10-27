
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')




async function query(userId, type) {
    try {
        const criteria = _buildCriteria(userId, type)
        const collection = await dbService.getCollection('order')
        var orders = await collection.find(criteria).toArray()
        return orders
    } catch (err) {
        console.log(err);
        logger.error('cannot find orders', err)
        throw err
    }
}


function _buildCriteria(userId, type) {
    let criteria = {}
    if (type === 'host') criteria = { 'host._id': userId }
    else criteria = { 'buyer._id': userId };
    return criteria
}


async function remove(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.deleteOne({ '_id': ObjectId(orderId) })
        return orderId
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}

async function add(order) {
    try {
        console.log(order);
        const collection = await dbService.getCollection('order')
        const addedOrder = await collection.insertOne(order)
        return addedOrder
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}
async function update(order) {
    try {
        var id = ObjectId(order._id)
        delete order._id
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ "_id": id }, { $set: { ...order } })
        return order
    } catch (err) {
        logger.error(`cannot update order ${orderId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    // getById,
    add,
    update,
}
