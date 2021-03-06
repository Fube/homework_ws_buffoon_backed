const { default: axios } = require('axios');
const { Router } = require('express');
const ratingService = require('../remoteservices/RemoteRatingService');
const sessionService = require('../remoteservices/RemoteSessionService');

const router = Router();

router.post('/', async (req, res) => {

    const { jokeGUID, opinion, token } = req.body;

    try{
        
        const { uuid: userGUID } = await sessionService.getSessionByToken(token);
        const createdRating = await ratingService.createRating({ jokeGUID, opinion: opinion, userGUID })
        return res.status(200).json(createdRating);
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