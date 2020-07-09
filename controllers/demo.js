const DemoModel = require('../model/demo')

const getDemoList = async (ctx) => {
    var { page, name = '', address = '' } = ctx.query
    page = JSON.parse(page)
    // let query = { name, address, page }
    // Object.keys(query).map(key => {
    //     if (!query[key]) {
    //         delete query[key]
    //     }
    // })
    
    let count = await DemoModel.count({
        $or: [
            { name: { '$regex': name, $options: '$i' } }
        ]
    })
    
    let res = await DemoModel.find({
        $or: [
            { name: { '$regex': name, $options: '$i' } }
        ]
    })
    .skip(((page.current - 1) * page.size))
    .limit(page.size)
    .exec()    
    
    return ctx.body = {
        code: 200,
        data: res,
        page: {
            total: count,
            current: page.current,
            size: page.size
        }
    }
}

const addDemo = async (ctx) => {
    let { name, address, birth, startTime, status } = ctx.request.body
    if (!name) {
        return ctx.body = {
            code: 301,
            data: '参数不全'
        }
    }
    let demo = new DemoModel({
        name: name,
        address: address,
        birth: birth,
        startTime: startTime,
        status: status
    })
    await demo.save()
    return ctx.body = {
        code: 200,
        data: '添加成功'
    }
}

const update = async (ctx) => {
    let { _id, name, address } = ctx.request.body
    if (!_id) {
        return ctx.body = {
            code: 301,
            data: '参数不全'
        }
    }
    let res = await DemoModel.updateOne({ _id: _id }, { ...ctx.request.body })
    if (res.ok) {
        return ctx.body = {
            code: 200,
            data: '修改成功'
        }
    } else {
        return ctx.body = {
            code: 301,
            data: '修改失败'
        }
    }
}

const del = async (ctx) => {
    let { _id } = ctx.request.body
    if (!_id) {
        return ctx.body = {
            code: 301,
            data: '参数不全'
        }
    }
    let res = await DemoModel.deleteOne({ _id: _id })
    if (res.ok) {
        return ctx.body = {
            code: 200,
            msg: '删除成功'
        }
    } else {
        return ctx.body = {
            code: 301,
            msg: '删除失败'
        }
    }
    
}


module.exports = {
    getDemoList,
    addDemo,
    update,
    del
}