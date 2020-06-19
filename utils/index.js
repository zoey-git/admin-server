const jsonwebtoken = require('jsonwebtoken')
const os = require('os');

const checkToken = (tokenKey, ignoreRouters) => {
    return async (ctx, next) => {
        let url = ctx.request.url
        // 对安全路由不验证token
        if (ignoreRouters.includes(url) || ctx.request.url.includes('/head/excel/') || ctx.request.url.includes('/head/')) {
            return next()
        }       
        let token = ctx.request.headers.authorization || ''
        if (!token) {
            return ctx.body = {
                code: 302,
                msg: 'token is not'
            }
        }
        token = token.replace('Bearer ', '')
        let res = await jsonwebtoken.verify(token, tokenKey, (err, payload) => { 
            if (err) {
                return err
            }
        })
        if (res) {
            return ctx.body = {
                code: 302,
                msg: res
            }
        }        
        await next()
    }
}

const getIP = () => {
    let IP = ''
    let interfaces = os.networkInterfaces()
    Object.keys(interfaces).map(item => {
        interfaces[item].find(item => {
            if(item.family === 'IPv4' && item.address !== '127.0.0.1' && !item.internal){
                return IP = item.address;  
            }
        })
    })
    return IP
}


module.exports = {
    checkToken,
    getIP
}