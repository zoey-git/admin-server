const Router = require('koa-router')
const router = new Router()

const { getRoleList,addRole } = require('../controllers/role')


router
    .get('/', getRoleList)
    .post('/', addRole)

module.exports = router.routes()