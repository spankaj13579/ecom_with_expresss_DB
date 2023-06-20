
const express= require('express')
const { getBook } = require('./bookincart.controller')
getBookRouter= express.Router()

getBookRouter.get('/', getBook)

module.exports=
{
    getBookRouter
}