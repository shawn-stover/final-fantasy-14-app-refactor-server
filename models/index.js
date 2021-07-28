// Require Mongoose
const mongoose = require('mongoose')
// Connection function for DB
const connect = () => {
    const MONGODB_URI = process.env.MONGODB_URI

    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

    const db = mongoose.connection

    db.once('open', () => {
        console.log(`MongoDB connection at ${db.host}:${db.port}`)
    })

    db.on('error', (err) => {
        console.log('Error in DB!')
        console.log(err)
    })
}

// Export the connection function and the models
module.exports = {
    connect,
    Char: mongoose.model('Char', require('./Char.js')),
    Job: mongoose.model('Job', require('./Job.js')),
    Note: mongoose.model('Note', require('./Note.js')),
    User: mongoose.model('User', require('./User.js'))
}