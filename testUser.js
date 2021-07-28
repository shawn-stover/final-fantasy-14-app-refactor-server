require('dotenv').config()
const db = require('./models')

db.connect()

const dbTest = async () => {
    try {
    const newUser = new db.User({
        name: 'Saulchar',
        password: 'Test',
        email: 's@d.com'
    })

    await newUser.save()
    console.log('new user:', newUser)

    const foundUser = await db.User.findOne({
        name: 'Saulchar'
    })

    console.log('found user:', foundUser)
    } catch (error) {
        console.log(error)
    }
}

dbTest()