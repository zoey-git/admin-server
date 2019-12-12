const mongoose = require('../db/mongo')
const Schema = mongoose.Schema


const RoleUserSchema = new Schema({
    roleId: { type: String, default: '5dee02f287cb615890e4d666' },
    userId: { type: String },
}, {
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})

module.exports = mongoose.model('RoleUser', RoleUserSchema)