const UserModel = require('../model/user')
const Base64 = require('js-base64').Base64;
const fs = require('fs')
const path = require('path')
const { IP, HOST} = require('../config/index')
const head = async (ctx) => {
    const file = ctx.request.files.file
    if (!file.path) {
        return ctx.body = {
            code: 201,
            msg: '文件不能为空'
        }
    }
    const name = file.name
    const render = fs.createReadStream(file.path)
    const fileDir = path.join(__dirname, '../', 'public/head/')
    if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true }, err => {
            console.log('fileDirerr', err);
        })
    }
    let filePath = path.join(__dirname, '../', 'public/head/', name)
    const upStream = fs.createWriteStream(filePath)
    render.pipe(upStream)
    ctx.body = {
        code: 200,
        data: {
            url: `http://${IP}:${HOST}/head/${name}`
        }
    }
}
const excel = async (ctx) => {
    const file = ctx.request.files.file
    if (!file.path) {
        return ctx.body = {
            code: 201,
            msg: '文件不能为空'
        }
    }
    const name = file.name
    const render = fs.createReadStream(file.path)
    const fileDir = path.join(__dirname, '../', 'public/excel/')
    if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true }, err => {
            console.log('fileDirerr', err);
        })
    }
    let filePath = path.join(__dirname, '../', 'public/excel/', name)
    const upStream = fs.createWriteStream(filePath)
    render.pipe(upStream)
    ctx.body = {
        code: 200,
        data: {
            url: `http://${IP}:${HOST}/excel/${name}`
        }
    }
}

const orderExcel = async (ctx) => {
    const file = ctx.request.files.file
    if (!file.path) {
        return ctx.body = {
            code: 201,
            msg: '文件不能为空'
        }
    }
    const extname = path.extname(file["name"])
    const name = Base64.encodeURI(file["name"] + new Date().getTime()) + extname
    const render = fs.createReadStream(file.path)
    const fileDir = path.join(__dirname, '../', 'public/orderExcel/')
    if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true }, err => {
            console.log('fileDirerr', err);
        })
    }
    let filePath = path.join(__dirname, '../', 'public/orderExcel/', name)
    const upStream = fs.createWriteStream(filePath)
    render.pipe(upStream)
    ctx.body = {
        code: 200,
        data: {
            url: `http://${IP}:${HOST}/orderExcel/${name}`,
            fileName: name
        }
    }
}

module.exports = {
    head,
    excel,
    orderExcel
}