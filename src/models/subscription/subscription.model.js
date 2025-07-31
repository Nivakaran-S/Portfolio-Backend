const Subscription = require('./subscription.mongo')

const createSubscription = async (data) => {
    try {
        const subscription = await Subscription.create({
            email: data.email
        });

        return subscription._id
    } catch(err) {
        console.error('Error creating subscription: ', err)
    }
}

const getSubscriptionById = async (id) => {
    try {
        const cleanedId = id.replace(/^:/, '');
        const subscription = await Subscription.findById(cleanedId);

        return subscription
    } catch(err) {
        console.error('Error fetching subscription by ID: ', err)
    }
}

module.exports = {
    createSubscription,
    getSubscriptionById

}