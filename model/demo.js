const mongoose = require('../db/mongo')

const Schema = mongoose.Schema

const DemoSchema = new Schema({
    name: { type: String, unique: true, required: true },
    birth: { type: Number },
    startTime: { type: Number },
    address: { type: String },
    status: { type: Number },
    updateTime: { type: Date },
    createTime: { type: Date },
    LoginTime: Date,
    lastLoginTime: Date
}, {
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})


const demo = mongoose.model('Demo', DemoSchema)

module.exports = demo