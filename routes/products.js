const express = require('express');
const {createProduct,getProduct,updateProduct,deleteProduct} = require('../controllers/product.controller');
const router = express.Router();
const validate = require('../middleware/validate')
const productSchema = require('../validators/productValidator')


router.post('/',validate(productSchema),createProduct);
router.get('/',getProduct);
router.patch('/:id',validate(productSchema) , updateProduct );
router.delete('/:id',deleteProduct);

module.exports = router;
