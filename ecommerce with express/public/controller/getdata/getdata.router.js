const express= require('express');
const { getGetData } = require('./getdata.controller');
getGetDataRouter= express.Router();

getGetDataRouter.get('/', getGetData)

module.exports=
{
    getGetDataRouter
}