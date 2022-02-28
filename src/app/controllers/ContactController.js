const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
  }

  async show(request, response) {
    // Obter UM registro
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not found
      return response.send(404).json({ error: 'User not found' });
    }

    response.json(contact);
  }

  store() {
    // Criar um novo registro
  }

  update() {
    // Editar um registro
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
