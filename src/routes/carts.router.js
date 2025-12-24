const express = require('express');
const CartController = require('../controllers/CartController');

const router = express.Router();

router.post('/', CartController.createCart);
router.get('/:cid', CartController.getCartById);
router.post('/:cid/products/:pid', CartController.addProductToCart);
router.delete('/:cid/products/:pid', CartController.removeProductFromCart);
router.put('/:cid', CartController.updateCart);
router.put('/:cid/products/:pid', CartController.updateProductQuantity);
router.delete('/:cid', CartController.clearCart);

module.exports = router;
