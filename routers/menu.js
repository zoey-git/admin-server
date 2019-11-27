const Router = require('koa-router')
const router = new Router()

const { getMenuList, addMenu, changeMenu, delMenu } = require('../controllers/menu')


router
    .get('/', getMenuList)
    .post('/', addMenu)
    .put('/', changeMenu)
    .delete('/', delMenu)


module.exports = router.routes()