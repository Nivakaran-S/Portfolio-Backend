const Subscription = require('./subscription.mongo');

const createSubscription = async (data) => {
  try {
    const subscription = await Subscription.create({
      email: data.email,
      createdAt: new Date(),
    });
    return subscription._id;
  } catch (err) {
    console.error('Error creating subscription:', err);
    throw err;
  }
};

const getSubscriptionById = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const subscription = await Subscription.findById(cleanedId);
    return subscription;
  } catch (err) {
    console.error('Error fetching subscription by ID:', err);
    throw err;
  }
};

const updateSubscription = async (id, data) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const subscription = await Subscription.findByIdAndUpdate(
      cleanedId,
      {
        email: data.email,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );
    return subscription;
  } catch (err) {
    console.error('Error updating subscription:', err);
    throw err;
  }
};

const deleteSubscription = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    await Subscription.findByIdAndDelete(cleanedId);
    return true;
  } catch (err) {
    console.error('Error deleting subscription:', err);
    throw err;
  }
};

const getAllSubscriptions = async () => {
  try {
    const subscriptions = await Subscription.find({}).sort({ createdAt: -1 });
    return subscriptions;
  } catch (err) {
    console.error('Error fetching all subscriptions:', err);
    throw err;
  }
};

const searchSubscriptions = async (query) => {
  try {
    const subscriptions = await Subscription.find({
      email: { $regex: query, $options: 'i' },
    }).sort({ createdAt: -1 });
    return subscriptions;
  } catch (err) {
    console.error('Error searching subscriptions:', err);
    throw err;
  }
};

module.exports = {
  createSubscription,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  getAllSubscriptions,
  searchSubscriptions,
};