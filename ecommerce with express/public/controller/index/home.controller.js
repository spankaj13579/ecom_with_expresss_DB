const path= require('path')
function gethome(req, res){
    if (req.session.is_logged_in && req.session.role !='admin')
    {
      res.render(path.join(__dirname,"..","..","home","index.ejs"), { page: "5",  name: req.session.name});
    }
    else if (req.session.is_logged_in && req.session.role =='admin')
    {
      res.redirect('/admin');
      return;
    }
    else 
    res.render(path.join(__dirname,"..","..","home","index.ejs"), { page: "0", name: ''});
  }
  
  module.exports={
    gethome
  }