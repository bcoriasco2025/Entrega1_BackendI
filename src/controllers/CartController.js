const CartService = require('../services/CartService');

class CartController {
  static async createCart(req, res) {
    try {
      const cart = await CartService.createCart();
      res.status(201).json({
        status: 'success',
        payload: cart
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  static async getCartById(req, res) {
    try {
      const { cid } = req.params;
      const cart = await CartService.getCartById(cid);

      if (!cart) {
        return res.status(404).json({
          status: 'error',
          message: 'Carrito no encontrado'
        });
      }

      res.json({
        status: 'success',
        payload: cart
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  static async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const cart = await CartService.addProductToCart(cid, pid);

      if (!cart) {
        return res.status(404).json({
          status: 'error',
          message: 'Carrito no encontrado'
        });
      }

      res.json({
        status: 'success',
        payload: cart
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

    static async removeProductFromCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const cart = await CartService.removeProductFromCart(cid, pid);

      if (!cart) {
        return res.status(404).json({
          status: 'error',
          message: 'Carrito o producto no encontrado'
        });
      }

      res.json({ status: 'success', payload: cart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const { products } = req.body;

      const cart = await CartService.updateCart(cid, products);
      if (!cart) {
        return res.status(404).json({
          status: 'error',
          message: 'Carrito no encontrado'
        });
      }

      res.json({ status: 'success', payload: cart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async updateProductQuantity(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      const cart = await CartService.updateProductQuantity(cid, pid, quantity);
      if (!cart) {
        return res.status(404).json({
          status: 'error',
          message: 'Carrito o producto no encontrado'
        });
      }

      res.json({ status: 'success', payload: cart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async clearCart(req, res) {
    try {
      const { cid } = req.params;
      const cart = await CartService.clearCart(cid);

      if (!cart) {
        return res.status(404).json({
          status: 'error',
          message: 'Carrito no encontrado'
        });
      }

      res.json({ status: 'success', payload: cart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

}

module.exports = CartController;