// Require needed dependencies
const router = require('express').Router()
const db = require('../../models')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute.js')

router.get('/', async (req, res) => {
    try {
        const chars = await db.Char.find()
        res.json(chars)
    }catch(err) {
        console.log('falied to find characters', err)
        res.status(500).json({ msg: 'Failed to find characters, server error'})
    }    
})

router.get(':id', async (req, res) => {
    try {
        const char = await db.Char.findById(req.params.id).populate('user_id')
        res.json(char)
    }catch(err) {
        console.log('Failed to find char', err)
        res.status(500).json({ msg: 'Failed to find char, server error'})
    }
})

module.exports = router

