const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    char_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Char'}],
    job_id: { type: Array },
    note_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note'}],
}, {
    timestamps: true
})

module.exports = JobSchema