const express = require('express');
const router = express.Router();

const ProductService = require('../services/ProductService');
const CartService = require('../services/CartService');

// HOME
router.get('/', async (req, res) => {
  try {
    const cart = await CartService.getOrCreateCart(req.session);
    const result = await ProductService.getProducts(req.query);

    res.render('home', {
      products: result.docs,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage
      },
      query: req.query,
      cartId: cart._id.toString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar productos');
  }
});


// REAL TIME
router.get('/realtimeproducts', async (req, res) => {
  try {
    const cart = await CartService.getOrCreateCart(req.session);
    const result = await ProductService.getProducts(req.query);

res.render('realtimeproducts', {
  products: result.docs
});

  } catch (error) {
    res.status(500).send('Error al cargar realtime');
  }
});

// CART VIEW
router.get('/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartService.getCartById(cid);
    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    res.render('cart', { cart, cid });
    
  } catch (error) {
    res.status(500).send('Error al cargar el carrito');
  }
});




module.exports = router;
