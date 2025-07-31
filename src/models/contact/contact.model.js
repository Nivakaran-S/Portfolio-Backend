const Contact = require('./contact.mongo');

const createContact = async (data) => {
  try {
    const contact = await Contact.create({
      name: data.name,
      email: data.email,
      title: data.title,
      message: data.message,
      createdAt: new Date(),
    });
    return contact._id;
  } catch (err) {
    console.error('Error creating contact:', err);
    throw err;
  }
};

const getContactById = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const contact = await Contact.findById(cleanedId);
    return contact;
  } catch (err) {
    console.error('Error fetching contact by ID:', err);
    throw err;
  }
};

const updateContact = async (id, data) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const contact = await Contact.findByIdAndUpdate(
      cleanedId,
      {
        name: data.name,
        email: data.email,
        title: data.title,
        message: data.message,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );
    return contact;
  } catch (err) {
    console.error('Error updating contact:', err);
    throw err;
  }
};

const deleteContact = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    await Contact.findByIdAndDelete(cleanedId);
    return true;
  } catch (err) {
    console.error('Error deleting contact:', err);
    throw err;
  }
};

const getAllContacts = async () => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return contacts;
  } catch (err) {
    console.error('Error fetching all contacts:', err);
    throw err;
  }
};

const searchContacts = async (query) => {
  try {
    const contacts = await Contact.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } },
        { message: { $regex: query, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });
    return contacts;
  } catch (err) {
    console.error('Error searching contacts:', err);
    throw err;
  }
};

module.exports = {
  createContact,
  getContactById,
  updateContact,
  deleteContact,
  getAllContacts,
  searchContacts,
};