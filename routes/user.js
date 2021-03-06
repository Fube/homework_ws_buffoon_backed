const { default: axios } = require('axios');
const { Router } = require('express');
const userService = require('../remoteservices/RemoteUserService');
const sessionService = require('../remoteservices/RemoteSessionService');
const ratingService = require('../remoteservices/RemoteRatingService');

const router = Router();

router.post('/signup', async (req, res) => {

    const { username, email, password } = req.body;

    if(!(username && email && password)) {
        return res.status(400).send('Malformed');
    }

    try{

        const user = await userService.createUser(req.body);
        return res.status(200).json(user);
    }
    catch(e) {
        
        if(axios.isAxiosError(e) && e.response) {
            
            const { response: { status, data }, message } = e;        
            return res.status(status).send(data);
        }
        return res.status(500).send(e.message);
    }
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    if(!(email && password)) {
        return res.status(400).send('Malformed');
    }

    try{

        const { match } = await userService.compare(req.body);
        if(!match) {
            return res.status(401).send('Invalid email/password combination');
        }

        const { _id, username } = await userService.getUserByEmail(email);
        const { token } = await sessionService.createSession(_id);

        return res.status(200).json({ token, username });
    }
    catch(e) {

        if(axios.isAxiosError(e) && e.response) {
            
            const { response: { status, data }, message } = e;        
            return res.status(status).send(data);
        }
        return res.status(500).send(e.message);
    }
});

router.get('/:token', async (req, res) => {

    const { token } = req.params;

    if(!token){
        return res.status(400).send('Missing token');
    }

    try{

        const { uuid } = await sessionService.getSessionByToken(token);
        const [
            user,
            ratings
        ] = await Promise.all([
            userService.getUser(uuid),
            ratingService.getAllRatingsForUser(uuid),
        ]);
        const { email, username } = user;
        
        return res.status(200).json({ username, email, ratings });
    }
    catch(e) {
        
        console.log(e);
        return res.status(500).send('Server error');
    }
});

module.exports = router;