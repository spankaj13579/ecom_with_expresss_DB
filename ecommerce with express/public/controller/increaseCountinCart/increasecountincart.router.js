
const express= require('express')
const { getIncreaseltnumberCart } = require('./increasecountincart.controller')
getIncreaseltnumberCartRouter= express.Router()

getIncreaseltnumberCartRouter.get('/', getIncreaseltnumberCart)

module.exports=
{
  getIncreaseltnumberCartRouter
}