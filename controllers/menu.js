const menuModel = require('../model/menu')

const getMenuList = async (ctx) => {
    await menuModel.find({}, (err, res) => {
        let data = res.map(item => {
            return {
                id: item._id,
                title: item.title,
                icon: item.icon,
                parentId: item.parentId,
                url: item.url
            }
        })
        ctx.body = {
            code: 200,
            data: data
        }
    })
}

const addMenu = async (ctx) => {
    const menu = new menuModel(ctx.request.body)
    await menu.save().then(res => {
        ctx.body = {
            code: 200,
            msg: '添加成功'
        }
    }).catch((err) => {
        console.log(err);
    })
}

const changeMenu = async (ctx) => {
    let data = ctx.request.body
    await menuModel.updateOne({ _id: data.id }, { ...data }, (err, res) => {
        if (err) {
            return ctx.body = {
                code: 300,
                msg: err
            }
        }
        ctx.body = {
            code: 200,
            msg: '更新成功'
        }
    })
}

const delMenu = async (ctx) => {
    let data = ctx.request.body
    await menuModel.deleteOne({ _id: data.id }, (err, res) => {
        if (err) {
            return ctx.body = {
                code: 300,
                msg: err
            }
        }
        ctx.body = {
            code: 200,
            msg: '删除成功'
        }
    })
}


module.exports = {
    getMenuList,
    addMenu,
    changeMenu,
    delMenu
}