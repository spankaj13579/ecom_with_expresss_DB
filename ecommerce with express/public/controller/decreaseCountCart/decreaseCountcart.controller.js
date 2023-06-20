const { con } = require("../../models/sql.model");

// decrease item count from cart starts
function getDecreaseltnumberCart(req, res)
{
  if(!req.session.is_logged_in)
  {
    res.redirect('/');
    res.end();
    return;
  }
  let nam= req.session.name;
  let ids= req.query.num;

  if(ids)
  {
  con.query(`select qty from cart where email= '${nam}' and prodId= '${ids}';`, (err, result)=>
  {
    if(err)
    throw err;
    con.query(`select qty, price from items where id= '${ids}';`, (err, resul)=>
    {
      if(result[0].qty > 1)
      {
        let qty= (result[0].qty)-1;
        con.query(`update cart set qty= '${qty}' where prodId= '${ids}' and email= '${nam}';`,(err, resu)=>
        {
          if(err)
          throw err;

          res.json({left: resul[0].qty, price: resul[0].price});
            res.end();
          })
        }
      });
  
    });
  }
    }

// decrease item count from cart ends
module.exports=
{
    getDecreaseltnumberCart
}