// caseStudy.model.js (Mongoose example)
const mongoose = require('mongoose');

const CaseStudySchema = new mongoose.Schema({
  imageUrl: {
    type: String,              // URL or path to the case study image
    required: true
  },
  overview: {
    type:String,
  },
  githubUrl: {
    type: String,              // URL or path to the case study image
    required: true
  },
  demoUrl: {
    type: String,              // URL for the demo of the case study
    required: true
  },
  title: {                     // Optional, a short title for the case study
    type: String,
    required: true
  },
  challenge: {                 // What problem or challenge you faced
    type: String,
    required: true
  },
  solution: {                  // How you solved the problem
    type: String,
    required: true
  },
  technologies: [{             // Array of technologies, libraries, or tools used
    type: String
  }],
  results: {                   // What was achieved after implementation
    type: String,
    required: true
  },
  learnings: {                 // What you learned from this project
    type: String
  },
  createdAt: {                 // Timestamp of creation
    type: Date,
    default: Date.now
  },
  updatedAt: {                 // Timestamp of last update
    type: Date,
    default: Date.now
  }
});

// Optional: auto-update `updatedAt` field on document update
CaseStudySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('CaseStudy', CaseStudySchema);
