const ProjectRoutes = require('./ProjectRoutes');

module.exports = app => {
    app.use('/projects', ProjectRoutes);
}