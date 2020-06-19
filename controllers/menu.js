const menuModel = require('../model/menu')
const roleUser = require('../model/role_user')
const roleMenuModel = require('../model/role_menu')

const getMenuList = async (ctx) => {
    let user = ctx.query
    if (!user.userId) {
        return ctx.body = {
            code: 202,
            msg: '参数不全'
        }
    }
    let res = await roleUser.findOne({userId: user.userId}, (err, res) => {
        return res
    })
    // let roleMenu = await roleMenuModel.findOne({ roleId: res.roleId })
    
    // await menuModel.find({ _id: roleMenu.menuId.split(',') }, (err, res) => {
    await menuModel.find({ }, (err, res) => {
        let data = res.map(item => {
            return {
                id: item._id,
                title: item.title,
                icon: item.icon,
                parentId: item.parentId,
                url: item.url,
                order: item.order
            }
        })
        return ctx.body = {
            code: 200,
            data: data
        }
    })
}

const getMenuListAll = async (ctx)=> {
    await menuModel.find({}, (err, res) => {
        let data = res.map(item => {
            return {
                id: item._id,
                title: item.title,
                icon: item.icon,
                parentId: item.parentId,
                url: item.url,
                order: item.order
            }
        })
        return ctx.body = {
            code: 200,
            data: data
        }
    })
}

const addMenu = async (ctx) => {
    let {title, url, icon, parentId, order} = ctx.request.body
    if (!title) {
        ctx.body = { code: 201, msg: '参数title不能为空' }
    }
    debugger
    if (parentId !== -1 && !url) {
        ctx.body = { code: 201, msg: '参数url不能为空' }
    }
    const menu = new menuModel({ title, url, icon, parentId, order })
    await menu.save().then(res => {
        return ctx.body = {
            code: 200,
            msg: '添加成功'
        }
    }).catch((err) => {
        ctx.body = {
            code: 201,
            msg: err
        }
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
    console.log(data);
    
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
    getMenuListAll,
    addMenu,
    changeMenu,
    delMenu
}