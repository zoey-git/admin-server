const UserModel = require('../model/user')
const RoleUserModel = require('../model/role_user')
const bcrypt = require('bcrypt')
const svgCaptcha = require('svg-captcha')
const jsonwebtoken = require('jsonwebtoken')
const { TOKEN_KEY } = require('../config/index')
const { IP, HOST } = require('../config/index')

const login = async (ctx) => {
    let data = ctx.request.body
    if (!data.captcha) {
        return ctx.body = {
            code: 201,
            msg: '参数错误'
        }
    }
    if ((data.captcha !== ctx.session.captcha)) {
        return ctx.body = {
            code: 201,
            msg: '验证码错误'
        }
    }
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
            // const confirmRes = bcrypt.compareSync(data.password, user.password)
            const confirmRes = true
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
                        token: token,
                        head: `http://${IP}:${HOST}${user.head}`
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

const userChange = async (ctx) => {
    let data = ctx.request.body
    if (!data._id) {
        return ctx.body = {
            code: 201,
            msg: '参数错误'
        }
    }
    try {
        let user = await UserModel.findById(data._id)
        let res = await UserModel.updateOne({_id: user._id}, { ...data })
        if (res.ok) {
            return ctx.body = {
                code: 200,
                msg: '修改成功'
            }
        }
    } catch (error) {
        return ctx.body = {
            code: 301,
            msg: error
        }
    } 
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

const updateHead = async (ctx) => {
    let { userId, headUrl } = ctx.request.body
    if (!userId || !headUrl) {
        return ctx.body = {
            code: 201,
            msg: '参数不全'
        }
    }
    await UserModel.findByIdAndUpdate(userId, { head: headUrl.match(/\/head\/.*/)[0]}, (err, res) => {
        if (err) {
            return ctx.body = {
                code: 201,
                msg: err
            }
        }
        let user = res
        return ctx.body = {
            code: 200,
            data: {
                userName: user.userName,
                userId: user._id,
                head: `http://${IP}:${HOST}${user.head}`
            }
        }
    })
}

const captcha = async (ctx) => {
    let captcha = svgCaptcha.create({
        inverse: false,
        fontSize: 48,
        width: 100,
        height: 40,
        size: 6
    })
    ctx.session.captcha = captcha.text.toLowerCase();
    return ctx.body = {
        code: 200,
        data: {
            url: captcha.data
        }
    }
}

module.exports = {
    login,
    register,
    getUserList,
    updateHead,
    captcha,
    userChange
}