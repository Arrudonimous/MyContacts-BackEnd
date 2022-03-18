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

    res.json({ created: category });
  }

  async index(req, res) {
    const { orderBy } = req.query;

    const categories = await CategoriesRepository.findAll(orderBy);

    res.json(categories);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await CategoriesRepository.update(id, { name });

    res.json(updatedCategory);
  }

  async delete(req, res) {
    const { id } = req.params;

    await CategoriesRepository.delete(id);

    res.sendStatus(204);
  }

  async show(req, res) {
    const { id } = req.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      res.send(404).json({ error: 'No category found' });
    }

    res.json(category);
  }
}

module.exports = new CategoryController();
