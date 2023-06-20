const { con } = require("../../models/sql.model");
const path= require('path')

// change password ends
function postChangePasswordLoggined(req, res)
{
    let nam= req.session.name;
    // sql starts
    if(nam)
    {
    let sql= `select * from data where email= '${nam}';`;
    con.query(sql, (err, result)=>
    {
      if(err)
      throw err;
      if(result.length >0)
      {
        if (!req.body.newPassword) {
          res.status("400");
          res.send("Invalid details!");
          return;
        }
        if (req.body.newPassword.trim() === "") {
          res.status("400");
          res.render(path.join(__dirname,"..","..","home","changePassword.ejs"), {err: 1 });
          return;
        }
        let sqll= `update data set password = '${req.body.newPassword}' where email=  '${nam}';`;
        con.query(sqll, (err, ress)=>
        {
          if(err)
          throw err;
          res.send("<h5>Successfully changed </h5> <br> <a href='/login'>Login</a>");
          return;
        })
      }
    });
    // sql ends;
  }}
// change password with mysql ends #with login
module.exports=
{
  postChangePasswordLoggined
}