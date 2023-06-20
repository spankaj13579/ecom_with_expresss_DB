const express= require('express');
const { getDashboard } = require("./dashboard.controller");
const dashboardRouter= express.Router();

dashboardRouter.get('/', getDashboard)

module.exports=
{
    dashboardRouter
}