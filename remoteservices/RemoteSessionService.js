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

module.exports = {
    createSession,
};