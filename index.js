require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./routes/user');
const jokeController = require('./routes/joke');
const ratingController = require('./routes/rating');

const {
    PORT,
} = process.env;

(async () => {

    const app = express();
    app.use(bodyParser.json());

    app.use('/api/user', userController);
    app.use('/api/joke', jokeController);
    app.use('/api/rating', ratingController);
    
    app.listen(PORT||8080, () => console.log('LMG MOUNTED N LOADED'));
})();