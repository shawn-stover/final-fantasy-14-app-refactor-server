const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    char_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Char'}],
    // TODO: create dropdown functionality for results page
    job_id: { type: Array },
    note_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note'}],
}, {
    timestamps: true
})

module.exports = JobSchema