
const express= require('express')
const { getCartpage } = require('./getcart.controller')
getCartpageRouter= express.Router()

getCartpageRouter.get('/', getCartpage)

module.exports=
{
    getCartpageRouter
}