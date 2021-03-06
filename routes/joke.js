const { default: axios } = require('axios');
const { Router } = require('express');
const jokeService = require('../remoteservices/RemoteJokeService');

const router = Router();

router.get('/', async (req, res) => {

    const { page, limit } = req.query;

    try{
        const jokeData = await jokeService.getJokePage(page, limit);
        return res.status(200).json(jokeData);
    }
    catch(e) {

        if(axios.isAxiosError(e) && e.response) {
            
            const { response: { status, data }, message } = e;        
            return res.status(status).send(data);
        }
        return res.status(500).send(e.message);
    }
});
module.exports = router;