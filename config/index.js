const { getIP } = require('../utils/index')


const IGNORE_ROUTERS = ['/user/login', '/user/register']

const TOKEN_KEY = 'myToken'

const HOST = '3000'

const IP = getIP()

module.exports = {
    IGNORE_ROUTERS,
    TOKEN_KEY,
    IP,
    HOST
}