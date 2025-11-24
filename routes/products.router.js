const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productManager');
const pm = new ProductManager('data/products.json');

router.get('/', async (req, res) => {
  try {
    const products = await pm.getAll();
    const { limit } = req.query;
    if (limit) return res.json(products.slice(0, Number(limit)));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const product = await pm.getById(req.params.pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const created = await pm.add(req.body);

    const io = req.app.get('socketio');
    io.emit('updateProducts', await pm.getAll());

    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const updated = await pm.update(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });

    const io = req.app.get('socketio');
    io.emit('updateProducts', await pm.getAll());

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const ok = await pm.delete(req.params.pid);
    if (!ok) return res.status(404).json({ error: 'Producto no encontrado' });

    const io = req.app.get('socketio');
    io.emit('updateProducts', await pm.getAll());

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;