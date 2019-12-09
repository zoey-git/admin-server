const mongoose = require('../db/mongo')
const Schema = mongoose.Schema


const RoleSchema = new Schema({
    roleName: { type: String },
}, {
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})

module.exports = mongoose.model('Role', RoleSchema)