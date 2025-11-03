const express = require('express');
const router = express.Router();
const CartManager = require('../managers/cartManager');
const cartMgr = new CartManager('data/carts.json');


router.get('/', async (req, res) => {
  try {
    const allCarts = await cartMgr._readFile(); 
    res.json(allCarts); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const cart = await cartMgr.createCart();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await cartMgr.getById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart.products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cart = await cartMgr.addProduct(req.params.cid, req.params.pid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
