const CartDAO = require('../data-access-object/CartDAO');
const CartModel = require('../models/cart.model');

const cartDAO = new CartDAO();

class CartService {
  static async createCart() {
    return await cartDAO.createCart();
  }

static async getCartById(cid) {
  try {
  const cart = await CartDAO.getCartById(cid);
  return cart; 
  } catch (error) {
    console.error('Error in CartService.getCartById:', error);
    throw error;
  }
}

  static async addProductToCart(cid, pid) {
    return await cartDAO.addProductToCart(cid, pid);
  }

  static async removeProductFromCart(cid, pid) {
    return await cartDAO.removeProductFromCart(cid, pid);
  }

  static async updateCart(cid, products) {
    return await cartDAO.updateCart(cid, products);
  }

  static async updateProductQuantity(cid, pid, quantity) {
    return await cartDAO.updateProductQuantity(cid, pid, quantity);
  }

  static async clearCart(cid) {
    return await cartDAO.clearCart(cid);
  }

  static async getOrCreateCart(session) {
    if (session.cartId) {
      const cart = await CartModel
        .findById(session.cartId)
        .populate('products.product'); 

      if (cart) return cart;
    }

    const newCart = await CartModel.create({ products: [] });
    session.cartId = newCart._id.toString();

    return await CartModel
      .findById(newCart._id)
      .populate('products.product'); 
  }
}

module.exports = CartService;
