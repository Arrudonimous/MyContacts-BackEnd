const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Diego',
    email: 'diego@gmail.com',
    phone: '123123123123',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Rebeca',
    email: 'rebeca@gmail.com',
    phone: '123123123123',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'João',
    email: 'joão@gmail.com',
    phone: '123123123123',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    // Listar todos os contatos
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    ));
  }

  create({ name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(), name, email, phone, category_id,
      };

      contacts.unshift(newContact);
      resolve();
    });
  }
}

module.exports = new ContactsRepository();
