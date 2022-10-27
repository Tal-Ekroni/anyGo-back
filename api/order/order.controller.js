const orderService = require('./order.service.js')
const logger = require('../../services/logger.service.js')


async function getOrdersById(req, res) {
  try {
    const userId = JSON.parse(req.query.params).userId;
    const type = JSON.parse(req.query.params).type
    // console.log(type, userId, 'userrrr');
    const order = await orderService.query(userId, type)
    // await console.log(order, 'hi')
    res.json(order)
  } catch (err) {
    logger.error('Failed to get order', err)
    res.status(500).send({ err: 'Failed to get order' })
  }
}
// POST (add order)
async function addOrder(req, res) {
  try {
    const order = req.body;
    console.log('order', order);
    const addedOrder = await orderService.add(order)
    res.json(addedOrder)
  } catch (err) {
    logger.error('Failed to add order', err)
    res.status(500).send({ err: 'Failed to add order' })
  }
}

// PUT (Update order)
async function updateOrder(req, res) {
  try {
    const order = req.body;
    const updatedOrder = await orderService.update(order)
    res.json(updatedOrder)
  } catch (err) {
    logger.error('Failed to update order', err)
    res.status(500).send({ err: 'Failed to update order' })

  }
}

// DELETE (Remove order)
async function removeOrder(req, res) {
  try {
    const orderId = req.params.id;
    const removedId = await orderService.remove(orderId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove order', err)
    res.status(500).send({ err: 'Failed to remove order' })
  }
}

module.exports = {
  getOrdersById,
  // getOrderById,
  addOrder,
  updateOrder,
  removeOrder
}
