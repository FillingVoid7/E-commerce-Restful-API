const express = require('express');
const {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/order.controller');
const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
