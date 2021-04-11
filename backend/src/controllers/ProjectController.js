const Project = require("../models/ProjectSchema");
const { v4: uuidv4 } = require('uuid');

module.exports = class ProjectController {
    async createProject(req, res) {
        try {
            const { title, url, techs } = req.body;

            if(await Project.findOne({ title: title })) return res.send({ status: 0, message: 'Project already exists.' });

            const project = {
                id: uuidv4(),
                title: title,
                url: url,
                techs: techs,
                likes: 0
            };

            await Project.create(project);

            return res.send({ status: 1, project });
        } catch(e) {
            console.log(e);
            return res.send({ error: e.message });
        }
    }

    async listProjects(req, res) {
        try {
            const { page = 1, order_key = 'title', order = 'asc', limit = 3} = req.query;
            const projects = await Project.find({}).select('-_id -__v').sort({ [order_key]: order }).skip(parseInt((page - 1) * limit)).limit(parseInt(limit));
            return res.send({ status: 1, projects });
        } catch(e) {
            console.log(e);
            return res.send({ error: e.message });
        }
    }

    async updateProject(req, res) {
        try {
            const { title, url, techs } = req.body;
            const { id } = req.params;

            const project = await Project.findOneAndUpdate({ id: id }, { title: title, url: url, techs: techs }, { new: true }).select('-_id -__v');

            if(!project) return res.status(400).send({ status: 0, message: 'Project not found.' });

            return res.send({ status: 1, project });
        } catch(e) {
            return res.send({ error: e.message });
        }
    }

    async deleteProject(req, res) {
        try {
            const { id } = req.params;
            const project = await Project.findOneAndDelete({ id: id }).select('-_id -__v');

            if(!project) return res.status(400).send({ status: 0, message: 'Project not found.' });

            return res.status(204).send();
        } catch(e) {
            return res.send({ error: e.message });
        }
    }

    async likeProject(req, res) {
        try {
            const { id } = req.params;
            const project = await Project.findOne({ id: id });

            if(!project) return res.status(400).send({ status: 0, message: 'Project not found.' });

            const { likes } = project;

            const updatedProject = await Project.findOneAndUpdate({ id: id }, { likes: likes + 1}, { new: true, fields: { 'id': 1, 'title': 1, 'url': 1, 'techs': 1, 'likes': 1, '_id': 0 } });
            return res.send({ status: 1, updatedProject });
        } catch(e) {
            return res.send({ error: e.message });
        }
    }
}