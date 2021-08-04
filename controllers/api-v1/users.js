const router = require('express').Router()
const db = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute.js')

//get /users == test api endpoint
router.get('/', (req, res) => {
    res.json({msg: 'hi! the user endpoint is ok'})
})

// post /users == create a new user
router.post('/register', async (req, res) => {
    try{
        //check if user already exists
        const findUser = await db.User.findOne({
            email: req.body.email
        })
        //if the user is found, don't let them register
        if(findUser) return res.status(400).json({ msg: 'User already exists in the DB'})
        //hash password from req.body
        const password = req.body.password
        const salt = 12
        const hashedPassword = await bcrypt.hash(password, salt)
        // create our new user
        const newUser = db.User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        await newUser.save()

        //create the jwt payload
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        }

        //sign the jwt and send a response
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60 * 60})
        res.json({token})
    }catch(error) {
        res.status(500).json({msg: 'Internal server error'})
    }
})
//post /user/login -- validate login creds
router.post('/login', async (req, res) => {
    try{
        // try to find the user in the db from the req.body.email
        const findUser = await db.User.findOne({
            email: req.body.email
        })

        const validationFailedMessage = 'Incorrect Information'
        // if the user is not found -- return immediately
        if(!findUser) return res.status(400).json({msg: validationFailedMessage})

        // check the users password against what is in the req.body
        const matchPassword = await bcrypt.compare(req.body.password, findUser.password)

        // if the password doesnt match -- return immediately
        if(!matchPassword) return res.status(400).json({msg: validationFailedMessage})
        
        // create the jwt payload
        const payload = {
            name: findUser.name,
            email: findUser.email,
            id: findUser._id
        }

        //sign the jwt and send it back
        const token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: 60 * 60})
        res.json({ token })
    }catch (err) {
        res.status(500).json({msg: 'internal server error'})
    }
})

// get /auth-locked -- will redirect if a bad (or no) jwt is found
router.get('/auth-locked', authLockedRoute, (req, res) => {
    // send private data back
    res.json({ msg: 'Please select or search a character to begin!'})
})

module.exports = router