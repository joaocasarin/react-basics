const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*',
    methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/index')(app);

module.exports = app;