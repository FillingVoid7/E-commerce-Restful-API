const express = require('express');
const {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller');
const router = express.Router();

router.post('/',createProduct);
router.get('/',getProduct);
router.patch('/:id',updateProduct );
router.delete('/:id',deleteProduct);

module.exports = router;
