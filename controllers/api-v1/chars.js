// Require needed dependencies
const router = require('express').Router()
const db = require('../../models')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute.js')

//get /chars == test api endpoint
router.get('/', (req, res) => {
    res.json({msg: 'hi! the chars endpoint is ok'})
})

router.post(`/results`, async (req, res) => {
    try{
        let charName = req.body.name
        let serverName = req.body.server
        const response = await axios.get(`https://xivapi.com/character/search?name=${charName}&server=${serverName}`)
        const charN = response.data.Results[0].Name
        const charId = response.data.Results[0].ID
        const charS = response.data.Results[0].Server
        const foundChar = await db.Char.findOne({id: charId})
        if(foundChar) {
            console.log('Character found!')
            const response2 = await axios.get(`https://xivapi.com/character/${charId}`)
            res.json(response2.data.Character.ClassJobs)
        }
        else {
            const createChar = new db.Char({
                name: charN,
                id: charId,
                server: charS
            })
            await createChar.save()
            console.log('Character saved!')
            const response2 = await axios.get(`https://xivapi.com/character/${charId}`)
            res.json(response2.data.Character.ClassJobs)
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({msg: 'Internal server error'})
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

