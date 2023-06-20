const express= require('express');
const { postChangePassword, getChangePassword, getchange } = require('./forget.controller');
const forgetRouter= express.Router();

forgetRouter.get("/", getchange)
forgetRouter.get("/:verifiedId", getChangePassword)
forgetRouter.post("/:verifiedId", postChangePassword)

module.exports={
    forgetRouter
}