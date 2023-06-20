const express= require('express')
const { getAdmin } = require('./Admin.cotroller')

getAdminRouter= express.Router()

getAdminRouter.get('/', getAdmin)

module.exports=
{
    getAdminRouter
}