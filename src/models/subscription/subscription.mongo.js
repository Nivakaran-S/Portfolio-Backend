
const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    createdTimestamp: {
        default: Date.now(),
        type: Date
    }
})

module.exports = mongoose.model('Subscription', SubscriptionSchema)