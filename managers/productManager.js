const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    constructor(filename = 'data/products.json') {
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

_generateId(product, existing) {
    const base = product.code ? product.code : `P${Date.now()}`;
    let candidate = `${base}`;
    let i = 1;
    const exists = (id) => existing.some(p => p.id === id);
    while (exists(candidate)) {
        candidate = `${base}-${i++}`;
        }
    return candidate;
    }

async getAll() {
    return await this._readFile();
    }

async getById(pid) {
        const all = await this._readFile();
        return all.find(p => String(p.id) === String(pid)) || null;
    }

async add(product) {
    const all = await this._readFile();
    const newProd = { ...product };

    if (!newProd.title || !newProd.description || !newProd.code) {
        throw new Error('title, description y code son obligatorios');
        }
    if (typeof newProd.price !== 'number') newProd.price = Number(newProd.price) || 0;
    if (typeof newProd.status !== 'boolean') newProd.status = newProd.status !== 'false';
    if (!Array.isArray(newProd.thumbnails)) newProd.thumbnails = newProd.thumbnails ? [newProd.thumbnails] : [];


    newProd.id = this._generateId(newProd, all);

    all.push(newProd);
        await this._writeFile(all);
        return newProd;
    }

async update(pid, updates) {
    const all = await this._readFile();
    const idx = all.findIndex(p => String(p.id) === String(pid));
    if (idx === -1) return null;


    const { id, ...rest } = updates;
    all[idx] = { ...all[idx], ...rest };
    await this._writeFile(all);
    return all[idx];
    }

async delete(pid) {
    const all = await this._readFile();
    const newArr = all.filter(p => String(p.id) !== String(pid));
    if (newArr.length === all.length) return false;
    await this._writeFile(newArr);
    return true;
    }
}

module.exports = ProductManager;