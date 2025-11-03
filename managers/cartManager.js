const fs = require('fs').promises;
const path = require('path');

class CartManager {
  constructor(filename = 'data/carts.json') {
    this.path = path.resolve(filename);
  }

  async _readFile() {
    try {
      const content = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(content || '[]');
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(this.path, '[]', 'utf-8');
        return [];
      }
      throw err;
    }
  }

  async _writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
  }

  _generateId(existing) {
    const ids = existing.map(c => Number(c.id)).filter(n => !isNaN(n));
    const max = ids.length ? Math.max(...ids) : 0;
    return String(max + 1);
  }

  async createCart() {
    const all = await this._readFile();
    const newCart = {
      id: this._generateId(all),
      products: []
    };
    all.push(newCart);
    await this._writeFile(all);
    return newCart;
  }

  async getById(cid) {
    const all = await this._readFile();
    return all.find(c => String(c.id) === String(cid)) || null;
  }

  async addProduct(cid, pid) {
    const all = await this._readFile();
    const idx = all.findIndex(c => String(c.id) === String(cid));
    if (idx === -1) return null;
    const cart = all[idx];

    const prodIdx = cart.products.findIndex(p => String(p.product) === String(pid));
    if (prodIdx === -1) {
      cart.products.push({ product: String(pid), quantity: 1 });
    } else {
      cart.products[prodIdx].quantity += 1;
    }

    all[idx] = cart;
    await this._writeFile(all);
    return cart;
  }
}

module.exports = CartManager;