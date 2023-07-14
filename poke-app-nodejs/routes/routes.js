const express = require('express');
const Pokemon = require('../models/pokemon');
const router = express.Router()

module.exports = router;

//Post Method
router.post('/pokemon', async (req, res) => {
    const data = new Pokemon({
        name: req.body.name,
        type: req.body.type,
        move: req.body.move
    })

    try {
        const dataToSave = await data.save()
        res.status(200).json(dataToSave)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/pokemon', async (req, res) => {
    try {
        var nameQuery = req.query.filter_name || ''
        const sortArray = req.query.sort_field.split('_')
        const sortField = sortArray[0]
        const sortDir = sortArray[1]
        const { page = 1 } = req.query;
        const pokemon = await Pokemon.find({'name': {'$regex': nameQuery, '$options': 'i'}})
                                  .sort({[sortField]: sortDir})
                                  .limit(12)
                                  .skip((page - 1) * 12);

        
        const count = await Pokemon.count({'name': {'$regex': nameQuery, '$options': 'i'}});
                                
        res.json({
            total: count,
            data: pokemon
        })
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/pokemon/:id', async (req, res) => {
    try {
        const data = await Pokemon.findById(req.params.id)
        res.json(data)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

//Update by ID Method
router.put('/pokemon/:id', async (req, res) => {
     try {
        const id = req.params.id
        const updatedData = req.body
        const options = {new: true}

        const result = await Pokemon.findByIdAndUpdate(id, updatedData, options)

        res.send(result)
     } catch(error) {
        res.status(400).json({ message: error.message })
     }
})

//Delete by ID Method
router.delete('/pokemon/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await Pokemon.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted`)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})