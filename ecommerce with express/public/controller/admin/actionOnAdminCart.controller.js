const fs= require('fs');
const path= require('path')
const { con } = require("../../models/sql.model");

function getDeletefromAdmincart (req, res)
{
  
  let ids= req.query.num;

  if(ids)
  {
    con.query(`select img from items where id='${ids}'`, (err, resu)=>
    {
      if(err)
      throw err;
    fs.unlink(path.join(__dirname,"..","..","..","/uploads/"+resu[0].img),()=>{});
    sql= `delete from items where id='${ids}';`;
    con.query(sql, (err, result)=>
    {
      if(err)
      throw err;
      res.end();
      return;
    });
  });
}
  else{
    res.redirect('/');
  }
}
// delete item from Admin cart ends

// edit item from Admin cart starts
function getEditfromAdmincart(req, res)
{
  if(req.session.is_logged_in && req.session.role =='admin')
  {
  let ids= req.query.num;
  if(ids)
  {
  con.query(`select * from items where id= '${ids}';`, (err, result)=>
  {
    let recor= {};
    recor.name=result[0].name;
    recor.disc= result[0].disc;
    recor.qty= result[0].qty;
    recor.price= result[0].price;
    recor.id=result[0].id;

    res.json(recor);
    res.end();
  });
}
  }
  else
  {
    res.redirect("/login");
    res.end();
    return;
  }
}

// update item from Admin cart ends

function getUpdatefromAdmincart(req, res)
{
  if(req.session.is_logged_in && req.session.role =='admin')
  {
  let obj= JSON.parse(req.query.obj);
  if(ids)
  {
  con.query(`update items set name= '${obj.name}', disc= '${obj.disc}', qty= '${obj.qty}', price ='${obj.price}' where id= '${obj.id}';`, (err, result)=>
  {
    if(err)
    throw err;
    con.query(`select img from items where id= '${obj.id}';`, (err, resp)=>
    {
      if(err)
      throw err;
      res.json(resp[0].img);
      res.end();
      return;
    });
});
}}
  else{
    res.redirect("/login");
    res.end();
    return;
  }
}

// update item from Admin cart ends

module.exports=
{
    getDeletefromAdmincart,
    getEditfromAdmincart,
    getUpdatefromAdmincart
}