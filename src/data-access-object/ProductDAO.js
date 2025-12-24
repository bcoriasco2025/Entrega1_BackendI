const ProductModel = require('../models/product.model');

class ProductDAO {
  async getAll(filter = {}, options = {}) {
    return ProductModel.paginate(filter, options);
  }

  async getById(id) {
    return ProductModel.findById(id);
  }

  async create(data) {
    return ProductModel.create(data);
  }

  async update(id, data) {
    return ProductModel.findByIdAndUpdate(id, data, { new: true });
  } 

  async delete(id) {
  return ProductModel.findByIdAndDelete(id);
}
}

module.exports = ProductDAO;
