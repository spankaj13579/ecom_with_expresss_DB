const express = require('express')
const { getLogin, postLogin, getForgetPassword, postForgetPassword } = require('./login.controller')

const loginRouter = express.Router()

loginRouter.get("/",getLogin)
loginRouter.post("/",postLogin)
loginRouter.get('/forgetPassword', getForgetPassword)
loginRouter.post('/forgetPassword', postForgetPassword)


module.exports = {
    loginRouter,
}