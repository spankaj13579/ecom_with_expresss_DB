
const express= require('express')
const { postChangePasswordLoggined } = require('./changepasswordloggined.controller')
postChangePasswordLogginedRouter= express.Router()

postChangePasswordLogginedRouter.post('/', postChangePasswordLoggined)

module.exports=
{
    postChangePasswordLogginedRouter
}