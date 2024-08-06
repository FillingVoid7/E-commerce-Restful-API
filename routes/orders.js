const express = require('express');
const {createOrder,getOrder,updateOrder,deleteOrder} = require('../controllers/order.controller');
const router = express.Router();
const validate = require('../middleware/validate');
const orderSchema = require('../validators/orderValidator');

router.post('/', validate(orderSchema),createOrder);
router.get('/', getOrder);
router.patch('/:id', validate(orderSchema),updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
