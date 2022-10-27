const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy) {
    try {
        const criteria = _buildCriteria(JSON.parse(filterBy.params))
        const collection = await dbService.getCollection('stay')
        var stays = await collection.find(criteria).toArray()
        console.log('filterrrrrr', criteria);
        return stays
    } catch (err) {
        console.log(err);
        logger.error('cannot find stays', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    let criteria = {}
    if (filterBy.location) {
        criteria = { 'loc.address': { $regex: filterBy.location, $options: 'i' } }
    }
    if (filterBy.assetType) {
        criteria.assetType = { $regex: filterBy.assetType, $options: 'i' }
    }
    if (filterBy.amenities) {
        criteria.amenities = { $regex: filterBy.amenities, $options: 'i' }
    }
    if (filterBy.uniqueStay) {
        criteria.uniqueStay = true
    }
    if (filterBy.capacity) {
        criteria.capacity = { $gt: +filterBy.capacity }
    }
    if (filterBy.hostId) {
        criteria = { 'host._id': filterBy.hostId }
    }
    return criteria

}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        const stay = collection.findOne({ '_id': ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.deleteOne({ '_id': ObjectId(stayId) })
        return stayId
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err)
        throw err
    }
}

async function add(stay) {
    try {
        console.log(stay);
        const collection = await dbService.getCollection('stay')
        const addedStay = await collection.insertOne(stay)
        return addedStay
    } catch (err) {
        logger.error('cannot insert stay', err)
        throw err
    }
}
async function update(stay) {
    try {
        const stayToSave = { ...stay, _id: ObjectId(stay._id) }
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: stayToSave._id }, { $set: { ...stayToSave } })
        return stayToSave
    } catch (err) {
        logger.error(`cannot update stay ${stayId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update
}