const { createSubscription, getSubscriptionById, updateSubscription, deleteSubscription, getAllSubscriptions, searchSubscriptions } = require('../../models/subscription/subscription.model');

const httpCreateSubscriptionController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const subscriptionId = await createSubscription({ email });
    return res.status(201).json({ message: 'Subscription created successfully', id: subscriptionId });
  } catch (err) {
    console.error('Error creating subscription:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpGetSubscriptionByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await getSubscriptionById(id);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    return res.status(200).json(subscription);
  } catch (err) {
    console.error('Error fetching subscription:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpUpdateSubscriptionController = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const subscription = await updateSubscription(id, { email });
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    return res.status(200).json({ message: 'Subscription updated successfully', subscription });
  } catch (err) {
    console.error('Error updating subscription:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpDeleteSubscriptionController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteSubscription(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    return res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (err) {
    console.error('Error deleting subscription:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpGetAllSubscriptionsController = async (req, res) => {
  try {
    const subscriptions = await getAllSubscriptions();
    return res.status(200).json(subscriptions);
  } catch (err) {
    console.error('Error fetching all subscriptions:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpSearchSubscriptionsController = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const subscriptions = await searchSubscriptions(query);
    return res.status(200).json(subscriptions);
  } catch (err) {
    console.error('Error searching subscriptions:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  httpCreateSubscriptionController,
  httpGetSubscriptionByIdController,
  httpUpdateSubscriptionController,
  httpDeleteSubscriptionController,
  httpGetAllSubscriptionsController,
  httpSearchSubscriptionsController,
};