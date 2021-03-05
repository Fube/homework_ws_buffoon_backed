require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./routes/user');

const {
    PORT,
} = process.env;

(async () => {

    const app = express();
    app.use(bodyParser.json());

    app.use('/api/user', userController);
    
    app.listen(PORT||8080, () => console.log('LMG MOUNTED N LOADED'));
})();