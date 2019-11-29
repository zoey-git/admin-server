const mongoose = require('../db/mongo')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    updateTime: { type: Date },
    createTime: { type: Date },
    LoginTime: Date,
    lastLoginTime: Date
}, {
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})


const user = mongoose.model('User', UserSchema)

module.exports = user