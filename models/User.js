const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    // Implement character owning later
    char_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Char'}]
}, {
    timestamps: true
})

module.exports = UserSchema