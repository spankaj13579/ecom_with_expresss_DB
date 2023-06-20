const express= require('express')
const { gethome } = require('./home.controller')

homeRouter= express.Router()

homeRouter.get('/', gethome)

module.exports=
{
    homeRouter
}