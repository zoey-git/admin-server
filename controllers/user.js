const UserModel = require('../model/user')
const RoleUserModel = require('../model/role_user')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { TOKEN_KEY } = require('../config/index')

const login = async (ctx) => {
    let data = ctx.request.body
    await UserModel.find({
        userName: data.userName
    }, (err, res) => {
        if (err) {
            return ctx.body = {
                code: 300,
                msg: err
            }
        }
        if (res.length > 0) {
            let user = res[0]
            const confirmRes = bcrypt.compareSync(data.password, user.password)
            if (confirmRes) {
                const token = jsonwebtoken.sign({
                    userName: user.userName,
                    password: user.password
                }, TOKEN_KEY, { expiresIn: '1h' })
                return ctx.body = {
                    code: 200,
                    data: {
                        userName: user.userName,
                        userId: user._id,
                        token: token
                    },
                    msg: '登录成功'
                }
            } else {
                return ctx.body = {
                    code: 201,
                    msg: '密码错误'
                }
            }
        }
        return ctx.body = {
            code: 201,
            msg: '用户名不存在'
        }
    })
}

const register = async (ctx) => {
    let data = ctx.request.body
    let password = bcrypt.hashSync(data.password, 10)
    let user = new UserModel({
        userName: data.userName,
        password: password
    })
    await user.save().then(async (res) => {
        let roleUser = new RoleUserModel({
            roleId: data.roleId,
            userId: res._id
        })
        await roleUser.save().then(res => {
            ctx.body = {
                code: 200,
                data: '注册成功'
            }
        })
    }).catch((err) => {
        if(err.code === 11000) {
            ctx.body = {
                code: 300,
                msg: '用户名已存在'
            }
        }
    })
}

const getUserList = async (ctx) => {
    await UserModel.find({}, (err, res) => {
        if (err) {
            return ctx.body = {
                code: 201,
                msg: err
            }
        }
        ctx.body = {
            code: 200,
            data: res
        }
    })
}

module.exports = {
    login,
    register,
    getUserList
}