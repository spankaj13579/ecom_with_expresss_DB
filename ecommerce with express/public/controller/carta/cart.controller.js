
// cart starts

const { con } = require("../../models/sql.model");

function getCart(req, res)
{
  var cal = Number(req.query.cal);
  if(cal)
  {
  if(req.session.is_logged_in && req.session.role !='admin')
  { 
      let LoggedPerson= req.session.name;
      sql= `select i.name, i.img, i.disc, i.id, i.qty as lefts, i.price, c.qty as qty from items i join cart c on i.id= c.prodId where email= '${LoggedPerson}'`;
      con.query(sql, (err, result)=>
      {
        res.json(result);
        res.end();
        return;
      });
  }
}
  else
  res.redirect("/getCart");
}

module.exports=
{
    getCart
}