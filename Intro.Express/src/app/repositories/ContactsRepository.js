const { v4 } = require('uuid');
const db = require('../../database') // index

let contacts = [
  {
    id: v4(),
    name: 'Sindoval',
    email: 'sindoval@email.com',
    phone: '123456789',
    category_id: v4(),
  }, {
    id: v4(),
    name: 'Jose',
    email: 'Jose@email.com',
    phone: '123456789',
    category_id: v4(),
  }, {}, {}]

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id))
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email))
    });
  }

  async create({ name, email, phone, category_id }) {
    //sql Injection
    const [row] = await db.query(`INSERT INTO contacts(name, email, phone, category_id) VALUES($1, $2, $3, $4) RETURNING *`, [name, email, phone, category_id]);

    return row;
  }

  async update(id, { name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }
}

module.exports = new ContactsRepository();
