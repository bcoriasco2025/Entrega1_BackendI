const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productManager');
const pm = new ProductManager('data/products.json');

router.get('/', async (req, res) => {
    try {
        const products = await pm.getAll();
        res.render('home', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar los productos');
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await pm.getAll();
        res.render('realtimeproducts', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar los productos');
    }
});

module.exports = router;
