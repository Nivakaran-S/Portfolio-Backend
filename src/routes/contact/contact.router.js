const express = require('express');
const { httpCreateContactController, httpGetContactByIdController, httpUpdateContactController, httpDeleteContactController, httpGetAllContactsController, httpSearchContactsController } = require('./contact.controller');

const ContactRouter = express.Router();

ContactRouter.post('/', httpCreateContactController);
ContactRouter.get('/:id', httpGetContactByIdController);
ContactRouter.put('/:id', httpUpdateContactController);
ContactRouter.delete('/:id', httpDeleteContactController);
ContactRouter.get('/', httpGetAllContactsController);
ContactRouter.get('/search', httpSearchContactsController);

module.exports = ContactRouter;