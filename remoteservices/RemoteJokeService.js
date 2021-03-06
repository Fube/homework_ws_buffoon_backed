const axios = require('axios');

const {
    JOKE_SERVICE_BASE,
} = process.env;

async function getJokePage(page=1, limit=10) {

    const { data } = await axios.get(`${JOKE_SERVICE_BASE}/api/jokes?page=${page}&limit=${limit}`);
    return data;
}

module.exports = {
    getJokePage,
};