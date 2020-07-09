const Router = require('koa-router')
const router = new Router()

const { getDemoList, addDemo, update, del } = require('../controllers/demo')


router
    .get('/', getDemoList)
    .post('/', addDemo)
    .post('/update', update)
    .post('/del', del)


module.exports = router.routes()