const { con } = require("../../models/sql.model");

// get data from sql starts
function getGetData(req, res)
{
    if (req.session.is_logged_in && req.session.role =='admin')
    {
      res.redirect('/admin');
      return;
    }
    var iterate = Number(req.query.co);
      let recor=[];
      // sql
      if(iterate)
      {
      let sql= `select * from items ;`;
      con.query(sql, (err, result)=>
      {
        if(err)
        throw err;
        
        for (var i = iterate - 5; i < iterate; i++) {
          if(result.length >0 && result[i]!= null) 
          {
          recor.push(result[i]);
          }
        }
        res.json(recor);
        return;
      });
      // sql ends
    }
    }
  // get data from sql completed and closed

  module.exports=
  {
    getGetData
  }