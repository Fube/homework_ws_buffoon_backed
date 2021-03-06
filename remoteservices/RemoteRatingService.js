const axios = require('axios');

const {
    RATING_SERVICE_BASE,
} = process.env;

/**@typedef {{ jokesGUID:String, userGUID:String, guid:String, opinion:Boolean }} Rating */

/**
 * 
 * @param {String} uuid 
 * @returns {Promise<Array<Rating>>}
 */
async function getAllRatingsForUser(uuid) {

    const { data } = await axios.get(`${RATING_SERVICE_BASE}/api/ratings/user/${uuid}`);
    return data;
}

/**
 * 
 * @param {{ jokeGUID:String, userGUID:String, opinion:Boolean }} rating
 * @returns {Promise<Rating>}
 */
async function createRating(rating) {

    const { data } = await axios.post(`${RATING_SERVICE_BASE}/api/ratings`, { ...rating });
    return data;
}

module.exports = {
    getAllRatingsForUser,
    createRating,
};
