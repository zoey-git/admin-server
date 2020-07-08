const Router = require('koa-router')

const router = new Router()

const { login, register, getUserList, updateHead, captcha, userChange } = require('../controllers/user')

router
    .get('/', getUserList)
    .post('/register', register)
    .post('/login', login)
    .post('/updateHead', updateHead)
    .post('/captcha', captcha)
    .post('/userChange', userChange)


module.exports = router.routes()