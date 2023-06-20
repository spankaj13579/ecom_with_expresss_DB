'/deletefromAdmincart'
'/editfromAdmincart'
'/updatefromAdmincart'
const express= require('express')
const { getDeletefromAdmincart, getEditfromAdmincart, getUpdatefromAdmincart } = require('./actionOnAdminCart.controller')
actionOnAdminCartRouter= express.Router()

actionOnAdminCartRouter.get('/deletefromAdmincart', getDeletefromAdmincart)
actionOnAdminCartRouter.get('/editfromAdmincart', getEditfromAdmincart)
actionOnAdminCartRouter.get('/updatefromAdmincart/', getUpdatefromAdmincart)

module.exports=
{
    actionOnAdminCartRouter
}