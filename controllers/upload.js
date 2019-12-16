
const fs = require('fs')
const path = require('path')
const head = async (ctx) => {
    const file = ctx.request.files.file
    const name = file.name
    const render = fs.createReadStream(file.path)
    const fileDir = path.join(__dirname, '../', 'public/head/')
    if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true }, err => {
            console.log('fileDirerr', err);
        })
    }
    let filePath = path.join(__dirname, '../', 'public/head/', name)
    console.log(filePath);
    const upStream = fs.createWriteStream(filePath)
    render.pipe(upStream)
    ctx.body = {
        code: 200,
        data: {
            url: 'http://localhost:3000/public/head/123.png'
        }
    }
}

module.exports = {
    head
}