const path= require('path')
// adding data as admin with mysql starts
function getAdmin(req,res)
{
  if(req.session.is_logged_in && req.session.role =='admin')
  {
    res.render(path.join(__dirname,"..","..","home","admin.ejs"));
    res.end();
  }
  else{
    res.redirect("/");
    res.end();
    return;
  }
}

module.exports=
{
    getAdmin
}