const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    projectOverview: {
        type: String,
        required: true,
        trim: true
    },
    projectCategory: {
        type: String,
        required: true
    },
    images: {
        type: {
            imageUrl1: { type: String, required: true },
            imageUrl2: { type: String, required: true },
            imageUrl3: { type: String, required: true },
            imageUrl4: { type: String, required: true },
            imageUrl5: { type: String, required: true },
            imageUrl6: { type: String, required: true }
        },
        required: true
    },
    problem: {
        type: String,
        required: true,
        trim: true
    },
    solution: {
        type: String,
        required: true,
        trim: true
    },
    techStack: {
        type: [String],
        required: true
    },
    createdTimestamp: {
        type: Date,
        default: Date.now
    },
    updatedTimestamp: {
        type: Date,
        default: Date.now
    }
});

ProjectSchema.pre('save', function(next) {
    this.updatedTimestamp = Date.now();
    next();
});

module.exports = mongoose.model('Project', ProjectSchema);