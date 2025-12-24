const ProductDAO = require('../data-access-object/ProductDAO');

const productDAO = new ProductDAO();

class ProductService {
  static async getProducts(params = {}) {
    const {
      limit = 10,
      page = 1,
      sort,
      category
    } = params;

    const filter = {};

    if (category) {
      filter.category = category;
    }
    filter.status = true;

    const options = {
      limit: Number(limit),
      page: Number(page),
      lean: true
    };

    if (sort) {
      options.sort = { price: sort === 'asc' ? 1 : -1 };
    }

    return productDAO.getAll(filter, options);
  }

  static async getProductById(pid) {
    return productDAO.getById(pid);
  }

  static async createProduct(data) {
    return productDAO.create(data);
  }

  static async updateProduct(pid, data) {
    return productDAO.update(pid, data);
  }

  static async deleteProduct(pid) {
  return productDAO.delete(pid);
}

}

module.exports = ProductService;
