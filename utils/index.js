const jsonwebtoken = require('jsonwebtoken')


const checkToken = (tokenKey, ignoreRouters) => {
    return async (ctx, next) => {
        let url = ctx.request.url
        // 对安全路由不验证token
        if (ignoreRouters.includes(url)) {
            return next()
        }
        let token = ctx.request.headers.authorization || ''
        if (!token) {
            return ctx.body = {
                code: 400,
                msg: 'token is not'
            }
        }
        token = token.replace('Bearer ', '')
        await jsonwebtoken.verify(token, tokenKey, (err, payload) => {
            if (err) {
                return ctx.body = {
                    code: '400',
                    msg: err
                }
            }
        })
        await next()
    }
}

module.exports = {
    checkToken
}