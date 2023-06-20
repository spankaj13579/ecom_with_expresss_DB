const path= require('path');

function getCartpage(req, res)
{
  if(!req.session.is_logged_in && req.session.role !='admin')
  {
    res.redirect("/login");
    return;
  }
  res.render(path.join(__dirname,"..","..","home","cart.ejs"), { page: "5",  name: req.session.name});
}
// cart ends
module.exports=
{
    getCartpage
}
