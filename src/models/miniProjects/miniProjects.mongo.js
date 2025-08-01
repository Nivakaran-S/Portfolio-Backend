
const mongoose = require('mongoose')

const MiniProjectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required:true
    },
    imageUrl: {
        type: String,
        required:true
    },
    miniProjectCategory: {
        type: String,
        required:true
    },
    githubUrl: {
        type:String,
        required:true
    },
    demoURL: {
        type:String,
        required:true
    },
    createdTimestamp : {
        default:Date.now(),
        type: Date
    },
    updatedTimestamp: {
        default:Date.now(),
        type:Date
    }
})

module.exports = mongoose.model('MiniProject', MiniProjectSchema)