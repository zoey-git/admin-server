const Router = require('koa-router')

const router = new Router()

const { login, register, getUserList } = require('../controllers/user')

router
    .get('/', getUserList)
    .post('/register', register)
    .post('/login', login)


module.exports = router.routes()