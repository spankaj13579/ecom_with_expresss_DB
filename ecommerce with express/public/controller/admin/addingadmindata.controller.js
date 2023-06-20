const { con } = require("../../models/sql.model")
const path= require("path")

function postAddAdmin(req, res)
{
      if (
        req.body.img == "" ||
        req.body.disc.trim() == "" ||
        req.body.left.trim() == "" ||
        req.body.price.trim() == "" ||
        req.body.name.trim() == ""
      ) {
        res.redirect('/admin');
        return;
      }
      let obj= req.body;
      if(obj)
      {
      obj.id = 'img'+Date.now();
      obj.img = req.file.filename;
      // sql
      let sql= `insert into items values('${obj.name}', '${obj.img}', '${obj.disc}', '${obj.id}', '${obj.left}', '${obj.price}');`;
      con.query(sql, (err, result)=>
      {
        if(err)
        throw err;
        res.redirect('/admin');
        res.end();
      });
    }
      // sql ends
  }

// adding data to admin wiith mysql completed and colsed


// view data admin 

function getViewDataAdmin(req,res)
{
  if(req.session.is_logged_in && req.session.role =='admin')
  {
  res.render(path.join(__dirname,"..","..","home","viewDataAdmin.ejs"))
  res.end();
  return;
  }
    res.redirect("/");
    res.end();
    return;
}

// view data admin ends

// loading admin cart
function getLoadingAdminData(req, res)
 {
    if (req.session.is_logged_in && req.session.role == 'admin')
    {
    var iterate = Number(req.query.co);
    if(iterate)
    {
      let recor=[];
      // sql
      let sql= `select * from items;`;
      con.query(sql, (err, result)=>
      {
        if(err)
        throw err;
        for (var i = iterate - 5; i < iterate; i++) 
        {
          if(result.length >0 && result[i]!= null) 
          recor.push(result[i]);
        }
        res.json(recor);
        return;
      });
      // sql ends
    }}
    }
  
  // delete item from Admin cart starts



module.exports=
{
    postAddAdmin,
    getViewDataAdmin,
    getLoadingAdminData
}