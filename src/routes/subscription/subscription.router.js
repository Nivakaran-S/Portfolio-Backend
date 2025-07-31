const express = require('express');
const { httpCreateSubscriptionController, httpGetSubscriptionByIdController, httpUpdateSubscriptionController, httpDeleteSubscriptionController, httpGetAllSubscriptionsController, httpSearchSubscriptionsController } = require('./subscription.controller');

const SubscriptionRouter = express.Router();

SubscriptionRouter.post('/', httpCreateSubscriptionController);
SubscriptionRouter.get('/:id', httpGetSubscriptionByIdController);
SubscriptionRouter.put('/:id', httpUpdateSubscriptionController);
SubscriptionRouter.delete('/:id', httpDeleteSubscriptionController);
SubscriptionRouter.get('/', httpGetAllSubscriptionsController);
SubscriptionRouter.get('/search', httpSearchSubscriptionsController);

module.exports = SubscriptionRouter;