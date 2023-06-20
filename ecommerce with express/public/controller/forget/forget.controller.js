const { con } = require("../../models/sql.model");
const path= require('path');


function getchange(req, res)
{
  if (!req.session.is_logged_in)
  {
    res.redirect("/");
  }
}


function getChangePassword(req, res) {
    const verifiedId = req.params.verifiedId;
    // sql started
    let sql= `select * from data where keyss= '${verifiedId}'`;
    con.query(sql, (err, result)=>
    {
      if(err)
        throw err;
      if(result.length > 0)
      {
        res.render(path.join(__dirname, "..", "..","home","reset.ejs"), {
          err: ""
        });
      }
    });
    // sql ended
}
function postChangePassword(req, res) {
      const verifiedId = req.params.verifiedId;
      // sql started
    let sql= `select * from data where keyss= '${verifiedId}';`;
    con.query(sql, (err, result)=>
    {
      if(err)
      throw err;
      if(result.length > 0)
      {
        if (!req.body.newPassword) {
          res.status("400");
          res.render(path.join(__dirname, "..", "..", "public" ,"home","reset.ejs"), {
            err: 1
          });
          return;
        }
        if (req.body.newPassword.trim() === "") {
          res.status("400");
          res.render(path.join(__dirname, "..", "..", "public" ,"home","reset.ejs"), {
            err: 2
          });
          return;
        }
        let sqll= `update data set password = '${req.body.newPassword}' where keyss=  '${verifiedId}';`;
        con.query(sqll, (err, ress)=>
        {
          if(err)
          throw err;
          res.redirect("/");
          return;
        })
      }
    });
    // sql ended
    }

// forget varification ends
module.exports=
{
  getchange,
  getChangePassword,
  postChangePassword
}
