const axios = require('axios').default

const api = axios.create({
    baseURL: process.env.REACT_APP_HOST_API
})

export default api