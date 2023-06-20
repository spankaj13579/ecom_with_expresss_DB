
const express= require('express')
const { getCart } = require('./cart.controller')
getCartRouter= express.Router()

getCartRouter.get('/', getCart)

module.exports=
{
    getCartRouter
}