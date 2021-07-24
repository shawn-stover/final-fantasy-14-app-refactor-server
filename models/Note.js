const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    content: String,
    char_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'char'}],
    job: [{ type: mongoose.Schema.Types.ObjectId, ref: 'job'}]
}, {
    timestamps: true
})

module.exports = NoteSchema