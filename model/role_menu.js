const mongoose = require('../db/mongo')
const Schema = mongoose.Schema


const RoleMenuSchema = new Schema({
    roleId: { type: String },
    menuId: { type: String },
}, {
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})

module.exports = mongoose.model('RoleMenu', RoleMenuSchema)