const Contact = require('./contact.mongo')

const createContact = async (data) => {
    try {
        const contact = await Contact.create({
            name: data.name,
            email: data.email,
            title: data.title,
            message: data.message
        });

        return contact._id
    } catch(err) {
        console.error('Error creating blog: ', err)
    }
}

const getContactById = async (id) => {
    try {
        const cleanedId = id.replace(/^:/, '');
        const contact = await Contact.findById(cleanedId);

        return contact
    } catch(err) {
        console.error('Error fetching blog by ID: ', err)
    }
}

module.exports = {
    createContact,
    getContactById

}