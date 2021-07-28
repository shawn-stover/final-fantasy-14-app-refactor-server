const mongoose = require('mongoose')

const CharSchema = new mongoose.Schema({
    name: String,
    id: String,
    server: String,
    user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    job_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job'}],
    note_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note'}], 
}, {
    timestamps: true
})

module.exports = CharSchema