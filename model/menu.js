const mongoose = require('../db/mongo')

const Schema = mongoose.Schema

const menuSchema = new Schema({
    title: { type: String, required: true, trim:true },
    icon: String,
    url: String,
    parentId: { type: String, required: true, default: -1 },
    updated: {type: Date, default: Date.now}
})


const menu = mongoose.model('Menu', menuSchema)

module.exports = menu