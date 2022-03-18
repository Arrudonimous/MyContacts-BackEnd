const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    // Obter UM registro
    const { id } = request.params;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      // 404: Not found
      return response.send(404).json({ error: 'User not found' });
    }

    response.json(contactExists);
  }

  async store(request, response) {
    // Criar um novo registro

    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Please, type a name' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    if (contact) {
      return response.send({ created: contact });
    }
  }

  async update(request, response) {
    // Editar um registro
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.send(404).json({ error: 'User not found!' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Please, type a name' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.update(id, { name, email, phone, category_id });

    response.json(contact);
  }

  async delete(request, response) {
    // Deletar um registro

    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not found
      return response.send(404).json({ error: 'User not found' });
    }

    await ContactsRepository.delete(id);

    // 204: No content
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
