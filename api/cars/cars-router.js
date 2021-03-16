// DO YOUR MAGIC
const express = require('express')
const Cars = require('./cars-model')
const {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid} = require('./cars-middleware')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try{
    const data = await Cars.getAll()
    res.json(data)
  }catch(err){
    next(err)
  }
})

router.get('/:id', checkCarId, async (req, res, next) => {
  try{
    const {id} = req.params
    const data = await Cars.getById(id)
    res.json(data)
  }catch(err){
    next(err)
  }
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
  try{
    const newData = await Cars.create(req.body)
    res.json(newData)
  }catch(err){
    next(err)
  }
})
 
module.exports = router