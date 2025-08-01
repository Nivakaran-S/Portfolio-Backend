
const mongoose = require('mongoose')

const ProjectCategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type:Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('MiniProjectCategory', ProjectCategorySchema)