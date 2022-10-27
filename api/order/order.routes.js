const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getOrdersById, addOrder, updateOrder, removeOrder } = require('./order.controller')
const router = express.Router()

router.get('/', log, getOrdersById)
// router.post('/', requireAuth,  addOrder)
router.post('/', addOrder)
router.put('/:id', updateOrder)
// router.put('/:id', requireAuth, requireAdmin, updateOrder)
router.delete('/:id', removeOrder)
// router.delete('/:id', requireAuth, requireAdmin, removeOrder)
module.exports = router