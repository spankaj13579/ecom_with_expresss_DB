const path= require('path');
function getDashboard(req, res){
    if (req.session.is_logged_in && req.session.role !='admin')
    {
    res.render(path.join(__dirname, "..", "..","home","dashboard.ejs"), {
      page: 5,
      name: req.session.name,
    });
  }
  else
  {
    res.redirect('/');
  }
  }

  module.exports= {
    getDashboard
  }