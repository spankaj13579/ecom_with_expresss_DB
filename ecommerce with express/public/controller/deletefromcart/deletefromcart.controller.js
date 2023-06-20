const { con } = require("../../models/sql.model");

// delete item from cart starts
function getDeleteFromCart(req, res)
{
  if(!req.session.is_logged_in)
  {
    res.redirect('/');
    res.end();
    return;
  }
  let ids= req.query.num;
  if(ids)
  {
    sql= `delete from cart where email= '${req.session.name}' and prodId='${ids}';`;
    con.query(sql, (err, result)=>
    {
      if(err)
      throw err;

      res.end();
      return;
    });
  }
  }
// delete item from cart ends
module.exports=
{
    getDeleteFromCart
}