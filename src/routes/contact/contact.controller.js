const { createContact, getContactById, updateContact, deleteContact, getAllContacts, searchContacts } = require('../../models/contact/contact.model');

const httpCreateContactController = async (req, res) => {
  try {
    const { name, email, title, message } = req.body;
    if (!name || !email || !title || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const contactId = await createContact({ name, email, title, message });
    return res.status(201).json({ message: 'Contact created successfully', id: contactId });
  } catch (err) {
    console.error('Error creating contact:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpGetContactByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    return res.status(200).json(contact);
  } catch (err) {
    console.error('Error fetching contact:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpUpdateContactController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, title, message } = req.body;
    if (!name || !email || !title || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const contact = await updateContact(id, { name, email, title, message });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    return res.status(200).json({ message: 'Contact updated successfully', contact });
  } catch (err) {
    console.error('Error updating contact:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpDeleteContactController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteContact(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    return res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpGetAllContactsController = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    return res.status(200).json(contacts);
  } catch (err) {
    console.error('Error fetching all contacts:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpSearchContactsController = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const contacts = await searchContacts(query);
    return res.status(200).json(contacts);
  } catch (err) {
    console.error('Error searching contacts:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  httpCreateContactController,
  httpGetContactByIdController,
  httpUpdateContactController,
  httpDeleteContactController,
  httpGetAllContactsController,
  httpSearchContactsController,
};