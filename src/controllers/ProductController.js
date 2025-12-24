const ProductService = require('../services/ProductService');

class ProductController {

  static async getProducts(req, res) {
    try {
      const products = await ProductService.getProducts(req.query);
      res.json({
        status: 'success',
        payload: products
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const { pid } = req.params;
      const product = await ProductService.getProductById(pid);

      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: 'Producto no encontrado'
        });
      }

      res.json({ status: 'success', payload: product });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async createProduct(req, res) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json({
        status: 'success',
        payload: product
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { pid } = req.params;
      const product = await ProductService.updateProduct(pid, req.body);

      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: 'Producto no encontrado'
        });
      }

      res.json({ status: 'success', payload: product });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { pid } = req.params;
      const result = await ProductService.deleteProduct(pid);

      if (!result) {
        return res.status(404).json({
          status: 'error',
          message: 'Producto no encontrado'
        });
      }

      res.json({ status: 'success', message: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
}

module.exports = ProductController;
