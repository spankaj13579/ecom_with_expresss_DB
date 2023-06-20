const multer  = require('multer');
const path= require('path')
const upload = multer({ dest: path.join(__dirname,"..","..","..","uploads") })
const express= require('express');
const { postAddAdmin, getViewDataAdmin, getLoadingAdminData } = require('./addingadmindata.controller');
postAddAdminRouter=express.Router()

postAddAdminRouter.post('/', upload.single('img'), postAddAdmin)
postAddAdminRouter.get('/loadDataAdmin', getLoadingAdminData)
postAddAdminRouter.get('/viewDataAdmin', getViewDataAdmin)


module.exports=
{
    postAddAdminRouter
}

