const RoleModel = require('../model/role')

const getRoleList = async (ctx) => {
    await RoleModel.find({}, (err, res) => {
        if (err) {
            return ctx.body = {
                code: 201,
                msg: err
            }
        }
        let data = res.map(item => {
            return {
                id: item._id,
                roleName: item.roleName
            }
        })
        return ctx.body = {
            code: 200,
            data: data
        }
    })
}

const addRole = async (ctx) => {
    const params = ctx.request.body
    const role = new RoleModel({
        roleName: params.roleName
    })
    await role.save().then(res => {
        return ctx.body = {
            code: 200,
            msg: '添加成功'
        }
    }).catch((err) => {
        return ctx.body = {
            code: 201,
            msg: err
        }
    })
}



module.exports = {
    getRoleList,
    addRole
}