const mongoose = require('../db/mongo')
const Schema = mongoose.Schema


const RoleUserSchema = new Schema({
    roleId: { type: String },
    userId: { type: String },
}, {
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})

module.exports = mongoose.model('RoleUser', RoleUserSchema)