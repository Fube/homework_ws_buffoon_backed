const axios = require('axios');

const {
    USER_SERVICE_BASE,
} = process.env;

/**
 * @typedef {{ username:String, email:String, password:String }} User 
 */

/**
 * 
 * @param {User} user 
 */
async function createUser(user) {

    const { data } = await axios.post(`${USER_SERVICE_BASE}/api/user`, {
        ...user
    });

    return data;
}
/**
 * 
 * @param {String} uuid 
 */
 async function getUser(uuid) {
    
    const { data } = await axios.get(`${USER_SERVICE_BASE}/api/user/${uuid}`);
    return data;
}

/**
 * 
 * @param {{ email:String, password:String }} user 
 */
 async function compare({ email, password }) {

    const { data } = await axios.post(`${USER_SERVICE_BASE}/api/user/compare/${email}`, {
        password
    });

    return data;
}

module.exports = {
    createUser,
    getUser,
    compare,
};