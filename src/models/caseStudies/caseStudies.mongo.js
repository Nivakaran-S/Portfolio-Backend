const mongoose = require('mongoose');

const CaseStudySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    client: {
        type: String,
        required: true,
        trim: true
    },
    industry: {
        type: String,
        required: true,
        trim: true
    },
    services: {
        type: [String],
        required: true
    },
    challenge: {
        type: String,
        required: true,
        trim: true
    },
    solution: {
        type: String,
        required: true,
        trim: true
    },
    results: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: {
            imageUrl1: { type: String, required: true },
            imageUrl2: { type: String },
            imageUrl3: { type: String }
        },
        required: true
    },
    demoUrl: {
        type: String,
        required: true
    },
    githubUrl: {
        type: String,
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

CaseStudySchema.pre('save', function(next) {
    this.updatedTimestamp = Date.now();
    next();
});

module.exports = mongoose.model('CaseStudy', CaseStudySchema);