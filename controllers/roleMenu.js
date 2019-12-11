const RoleMenuModel = require('../model/role_menu')

const addRoleMenu = async (ctx) => {
    let data = ctx.request.body
    if (!data.roleId || !data.menuId) {
        return ctx.body = {
            code: 202,
            msg: '参数不全'
        }
    }
    let res = await RoleMenuModel.findOne({roleId: data.roleId}, (err, res) => {
        if (err) {
            return ctx.body = {
                code: 201,
                msg: err
            }
        }
    })
    
    if (res && res.roleId) {
        await RoleMenuModel.update({ roleId: data.roleId }, { menuId: data.menuId }, (err, res) => {
            if (err) {
                return ctx.body = {
                    code: 201,
                    msg: err
                }
            }
            return ctx.body = {
                code: 200,
                msg: '更新成功'
            }
        })
    } else {
        const roleMenu = new RoleMenuModel({
            roleId: data.roleId,
            menuId: data.menuId
        })
        await roleMenu.save().then(res => {
            if (res) {
                ctx.body = {
                    code: 200,
                    msg: '添加成功'
                }
            }
        }).catch(err => {
            ctx.body = {
                code: 201,
                msg: err
            }
        })
    }
}

getRoleMenu = async (ctx) => {
    let query = ctx.query
    if (!query.roleId) {
        return ctx.body = {
            code: 202,
            msg: '参数不全'
        }
    }
    await RoleMenuModel.findOne({ roleId: query.roleId }, (err, res) => {
        if(err) {
            return ctx.body = {
                code: 201,
                msg: err
            }
        }
        ctx.body = {
            code: 200,
            data: {
                menuId: res ? res.menuId : ''
            }
        }

    })
}

module.exports = {
    addRoleMenu,
    getRoleMenu
}