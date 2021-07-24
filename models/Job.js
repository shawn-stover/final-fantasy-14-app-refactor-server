const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    char_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'char'}],
    name: {},
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'note'}],
}, {
    timestamps: true
})

module.exports = JobSchema