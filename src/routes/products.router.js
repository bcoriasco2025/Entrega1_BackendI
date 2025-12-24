const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

router.get('/', ProductController.getProducts);
router.get('/:pid', ProductController.getProductById);
router.post('/', ProductController.createProduct);
router.put('/:pid', ProductController.updateProduct);
router.delete('/:pid', ProductController.deleteProduct);

module.exports = router;
