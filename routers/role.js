const Router = require('koa-router')
const router = new Router()

const { getRoleList, addRole } = require('../controllers/role')
const { addRoleMenu, getRoleMenu } = require('../controllers/roleMenu')


router
    .get('/', getRoleList)
    .post('/', addRole)
    .get('/roleMenu', getRoleMenu)
    .post('/roleMenu', addRoleMenu)

module.exports = router.routes()