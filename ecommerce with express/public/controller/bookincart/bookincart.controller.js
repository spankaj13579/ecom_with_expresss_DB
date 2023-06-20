// book flight by clicking

const { con } = require("../../models/sql.model");

function getBook(req, res)
 {
    if(req.session.is_logged_in && req.session.role !='admin')
    {
            var id =req.query.ide;
            // data of user
            let LoggedPerson= req.session.name;
            // sql
            if(id)
            {
            con.query(`select * from items where id= '${id}';`, (erro, respond)=>
            {
              if(respond[0].qty >0)
              {
            let sqll= `select * from cart where email= '${LoggedPerson}' and prodId= '${id}';`;
            con.query(sqll, (err, response)=>
            {
              if(response.length < 1)
              {
                let sql= `insert into cart values('${LoggedPerson}', '${id}', '1');`;
                con.query(sql, (err, result)=>
                {
                  if(err)
                  throw err;
                });
              }
              if(response.length > 0)
              {
                
                let qty= Number(response[0].qty);
                if(qty < respond[0].qty)
                {
                  qty++;
                  con.query(`update cart set qty='${qty}' where email= '${LoggedPerson}' and prodId= '${id}'` ,(err, resp)=>
                  {
                    if(err)
                    throw err;
                  });
                }
              }
            });
            // sql
      // data of user ends
          }
          });
        }
        }
          res.redirect("/login");
          res.end();
          return;
    }
  
  // book flight by clicking ends
  
  module.exports=
  {
    getBook
  }