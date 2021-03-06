const axios = require('axios');

const {
    USER_SERVICE_BASE,
} = process.env;

/**
 * 
 * @param {String} uuid 
 */
async function createSession(uuid) {

    const { data } = await axios.post(`${USER_SERVICE_BASE}/api/session`, { uuid });
    return data;
}

/**
 * 
 * @param {String} token 
 * @returns {Promise<{ token:String, uuid:String }>}
 */
async function getSessionByToken(token) {

    const { data } = await axios.get(`${USER_SERVICE_BASE}/api/session/${token}`);
    return data;
}

module.exports = {
    createSession,
    getSessionByToken,
};