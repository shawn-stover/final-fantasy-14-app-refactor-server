const mongoose = require('mongoose')

const CharSchema = new mongoose.Schema({
    name: String,
    id: String,
    server: String,
}, {
    timestamps: true
})

module.exports = CharSchema