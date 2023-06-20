
const express= require('express')
const { getDecreaseltnumberCart } = require('./decreaseCountcart.controller')
getDecreaseltnumberCartRouter= express.Router()

getDecreaseltnumberCartRouter.get('/', getDecreaseltnumberCart)


module.exports=
{
    getDecreaseltnumberCartRouter
}