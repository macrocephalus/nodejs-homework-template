const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const rewriteConstants = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data.toString());
};

const getContactById = async (contactId) => {
  if (!contactId) {
    return null;
  }

  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);

  if (!result) {
    return null;
  }

  return result;
};

const removeContact = async (contactId) => {
  if (!contactId) {
    return null;
  }

  const contacts = await listContacts();
  const indexContact = contacts.findIndex((item) => item.id === contactId);
  if (indexContact === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(indexContact, 1);
  await rewriteConstants(contacts);
  return removeContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await rewriteConstants(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: contactId,
    name,
    email,
    phone,
  };

  const indexContact = contacts.findIndex((item) => item.id === contactId);
  if (indexContact === -1) {
    return null;
  }
  contacts[indexContact] = newContact;
  await rewriteConstants(contacts);

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
