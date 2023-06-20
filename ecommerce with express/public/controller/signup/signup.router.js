const express= require('express')
const { getSignup, postSignup, getSignupVarification } = require('./signup.controller')
const signupRouter= express.Router()

signupRouter.get('/', getSignup)
signupRouter.post('/', postSignup)
signupRouter.get("/:verifiedId", getSignupVarification)

module.exports=
{
    signupRouter
}