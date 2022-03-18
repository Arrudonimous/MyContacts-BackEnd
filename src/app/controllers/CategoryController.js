const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.send(400).json({ error: 'Please enter a name' });
    }

    const nameExists = await CategoriesRepository.findByName(name);

    if (nameExists) {
      return res.status(404).json({ error: 'Name is not available' });
    }

    const category = await CategoriesRepository.create({ name });

    res.json({ category });
  }

  async index(req, res) {
    const categories = await CategoriesRepository.findAll();

    res.json({ categories });
  }

  update(req, res) {

  }

  delete(req, res) {

  }

  show(req, res) {

  }
}

module.exports = new CategoryController();
