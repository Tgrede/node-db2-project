const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const id = req.params.id
    const car = await Cars.getById(id)
    if(!car){
      res.status(404).json({message: `car with ${id} is not found`})
    } else {
      next()
    }
  }catch(err){
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin, make, model, mileage} = req.body

  if(!vin){
    res.status(400).json({message: `vin is missing`})
  } else if(!make) {
    res.status(400).json({message: `make is missing`})
  } else if(!model) {
    res.status(400).json({message: `model is missing`})
  } else if(!mileage) {
    res.status(400).json({message: `mileage is missing`})
  } else {
    next()
  }
}
 
const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const vinToCheck = req.body.vin
  const isVinValid = vinValidator.validate(vinToCheck)
  if(isVinValid){
    next()
  }else{
    res.status(400).json({message:`vin ${vinToCheck} is invalid`})
  }
} 

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const vinToCheck = req.body.vin
  const allCars = await Cars.getAll()
  const vinNumbers = allCars.map((car) => {
    return car.vin
  })
  const vinMatch = vinNumbers.filter(vin => {
    return vin === vinToCheck
  })
  if (vinMatch.length === 0) {
    next()
  } else {
    res.status(400).json({message: `vin ${vinToCheck} already exists`})
  }
  
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}
