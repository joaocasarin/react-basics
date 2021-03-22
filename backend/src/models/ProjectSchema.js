const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    techs: {
        type: Array,
        required: true
    },
    likes: {
        type: Number,
        required: true
    }
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;