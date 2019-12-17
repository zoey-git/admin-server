const Router = require('koa-router')

const router = new Router()

const { login, register, getUserList, updateHead } = require('../controllers/user')

router
    .get('/', getUserList)
    .post('/register', register)
    .post('/login', login)
    .post('/updateHead', updateHead)


module.exports = router.routes()