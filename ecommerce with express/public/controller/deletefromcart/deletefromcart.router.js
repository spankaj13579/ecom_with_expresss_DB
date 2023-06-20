
const express= require('express')
const { getDeleteFromCart } = require('./deletefromcart.controller')
getDeleteFromCartRouter= express.Router()

getDeleteFromCartRouter.get('/', getDeleteFromCart)

module.exports=
{
    getDeleteFromCartRouter
}