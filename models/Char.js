const mongoose = require('mongoose')

const CharSchema = new mongoose.Schema({
    name: String,
    id: String,
    server: String,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'job'}],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'note'}], 
}, {
    timestamps: true
})

module.exports = CharSchema