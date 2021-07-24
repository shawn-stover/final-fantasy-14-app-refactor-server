const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    // Implement character owning later
    characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'char'}]
}, {
    timestamps: true
})

module.exports = UserSchema