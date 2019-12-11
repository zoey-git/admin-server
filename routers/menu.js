const Router = require('koa-router')
const router = new Router()

const { getMenuList, addMenu, changeMenu, delMenu, getMenuListAll } = require('../controllers/menu')


router
    .get('/', getMenuList)
    .get('/getMenuListAll', getMenuListAll)
    .post('/', addMenu)
    .put('/', changeMenu)
    .delete('/', delMenu)


module.exports = router.routes()