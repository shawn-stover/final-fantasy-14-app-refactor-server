const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    content: String,
    char_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Char'}],
    job_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job'}]
}, {
    timestamps: true
})

module.exports = NoteSchema