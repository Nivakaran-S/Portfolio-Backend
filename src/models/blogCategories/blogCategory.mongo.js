
const mongoose = require('mongoose')

const BlogCategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type:Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('BlogCategory', BlogCategorySchema)