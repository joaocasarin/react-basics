const mongoose = require('mongoose');
const app = require('./src/app');
require('dotenv').config();
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`)
        });
    });