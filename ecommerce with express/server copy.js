const express = require("express");
const session = require("express-session");
const fs = require("fs");
const multer  = require('multer');
const { forgetRouter } = require("./public/controller/forget/forget.router");
const upload = multer({ dest: 'uploads/' })
const app = express();
const { loginRouter } = require('./public/controller/login/login.router')
const { con } = require("./public/models/sql.model");


  con.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });

// mysql ends
// const appRoute = require("./public/routes/route.js");
const port = 4000;

// app.use("/api", appRoute);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(
  session({
    secret: "hello world",
    resave: false,
    saveUninitialized: true,
  })
);


app.use("/login",loginRouter)
app.use('/reset', forgetRouter)

app.get("/", (req, res) => {
  if (req.session.is_logged_in && req.session.role !='admin')
  {
    res.render(__dirname + "/public/home/index.ejs", { page: "5",  name: req.session.name});
  }
  else if (req.session.is_logged_in && req.session.role =='admin')
  {
    res.render(__dirname+'/public/home/admin.ejs');
    return;
  }
  else 
  res.render(__dirname + "/public/home/index.ejs", { page: "0", name: ''});
});

app.get("/dashboard", (req, res) => {
  if (req.session.is_logged_in && req.session.role !='admin')
  {
  res.render(__dirname + "/public/home/dashboard.ejs", {
    page: 5,
    name: req.session.name,
  });
}
else
{
  res.redirect('/');
}
});

// sql for signup starts

app
  .route("/signup")
  .get((req, res) => {
    if (req.session.is_logged_in && req.session.role !='admin') res.redirect("/");
    else
      res.render(__dirname + "/public/home/signup.ejs", { page: "3", err: 0 });
  })
  .post((req, res) => {
    fs.readFile("./data.txt", "utf-8", function (err, data) {
      let login;
      if (data.length === 0) {
        login = [];
      } else {
        login = JSON.parse(data);
      }
      if (!req.body.email || !req.body.password) {
        res.status("400");
        res.send("Invalid details!");
        return;
      }
      if (req.body.email.trim() === "" || req.body.password.trim() === "") {
        res.status("400");
        res.render(__dirname + "/public/home/signup.ejs", {
          page: "3",
          err: 1,
        });
        return;
      }
      let email = req.body.email;
      let check = login.filter((item) => {
        return item.email == email && item.varified == true;
      });

      // sql to check thatemail already exist starts
    let sql= `select * from data where email = '${email}';`;
    con.query(sql, (err, result)=>
    {
      if(err)
      throw err;
      if(result.length>0)
      {
        if(result[0].email == email)
        {
          res.render(__dirname + "/public/home/signup.ejs", {
            page: "3",
            err: 2,
          });
          return;
        }
      }
        else{
          var body = req.body;
        var id = Date.now();
        body.key = id;
        body.prodycts=[];
        body.varified = false;
        body.role= 'user';
        login.push(body);
        req.session.is_logged_in = false;
        req.session.name = req.body.email;
        // sql signup insert
        let sql= `insert into data (email, password, varified, role, keyss) values('${body.email}', '${body.password}', '${body.varified}', '${body.role}', '${body.key}');`;
        con.query(sql, (err, result)=>
        {
          if(err)
          throw err;
          res.send("<h5>Successfull login | go to mail and verify </h5> <br> <a href='/login'>Login</a>");
        })
        // mail
        {
          let userEmail = req.body.email;
          let config = {
            service: "gmail",
            auth: {
              user: EMAIL,
              pass: PASSWORD,
            },
          };
          let transporter = nodemailer.createTransport(config);
          let MailGenerator = new Mailgen({
            theme: "default",
            product: {
              name: "Travel Kro",
              link: "https://mailgen.js/",
            },
          });
          let response = {
            body: {
              name: "Dude",
              intro: "want to try Beaches 🏖️ and food 🐓 ",
              action: {
                instructions: "Thailand needs you, but first click here:",
                button: {
                  color: "#EA8F1C", // Optional action button color
                  // 💋
                  text: "Confirm your account ",
                  link: `http://127.0.0.1:4000/verify/${id}`,
                },
              },
              outro: "Enjoy Travelling with us ",
            },
          };
          let mail = MailGenerator.generate(response);
          let message = {
            from: EMAIL,
            to: userEmail,
            subject: "Get amazing deals",
            html: mail,
          };
          transporter.sendMail(message);
        }
        // mail
        // sql signup insert ends
        }
    })
    // sql to check thatemail already exist ends
    });
  });
  // sql for signup completely ends and closed

// varified connected with mysql starts
app.route("/verify/:verifiedId").get((req, res) => {
    const verifiedId = req.params.verifiedId;
    // sql
    let sql= `select * from data where keyss = '${verifiedId}';`;
    con.query(sql, (err, result)=>
    {
      if(err)
      throw err;
      let sqll= `update data set varified = 'true' where keyss=  '${verifiedId}';`;
      con.query(sqll, (err, res)=>
      {
        if(err)
        throw err;
      });
    })
    // sql ends
      res.send("success");
  });
// varified connected with mysql completed and closed




// get data from sql starts

app.get("/getdata", (req, res) => {
  if (req.session.is_logged_in && req.session.role =='admin')
  {
    res.render(__dirname+'/public/home/admin.ejs');
    return;
  }
  var iterate = Number(req.query.co);

    let recor=[];

    // sql
    let sql= `select * from items ;`;
    con.query(sql, (err, result)=>
    {
      if(err)
      throw err;
      console.log(result)
      for (var i = iterate - 5; i < iterate; i++) {
        if(result.length >0)
        recor.push(result[i]);
      }
      res.json(recor);
      return;
    });
    // sql ends
  
  });

// get data from sql completed and closed


// reset password with mysql starts  #without login
// forget varification
app.get("/reset", (req, res)=>
{
  if (!req.session.is_logged_in)
  {
    res.redirect("/");
  }
});

// reset password with mysql starts #without login

// 

// forget password ends

// change password with mysql starts #with login
// change password starts

app.get('/changePassword', (req, res)=>
{
  if (req.session.is_logged_in && req.session.role !='admin')
  {
    res.render(__dirname + "/public/home/changePassword.ejs", { err: 0})
  }
  else{
    res.redirect("/");
  }
});

// change password ends
app.post('/newPassword', (req, res)=>
{
    let nam= req.session.name;
    // sql starts
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
          res.render(__dirname + "/public/home/changePassword.ejs", {err: 1 });
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
  });
// change password with mysql ends #with login

// cart starts

  app.get('/cart', (req, res)=>
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
  });

  app.get('/getCart', (req, res)=>
  {
    if(!req.session.is_logged_in && req.session.role !='admin')
    {
      res.redirect("/login");
      return;
    }
    res.render(__dirname+"/public/home/cart.ejs", { page: "5",  name: req.session.name});
  });
// cart ends

// book flight by clicking

app.get("/book", (req, res) => {
  if(req.session.is_logged_in && req.session.role !='admin')
  {
          var id =req.query.ide;
          // data of user
          let LoggedPerson= req.session.name;
          // sql
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
        res.redirect("/login");
        res.end();
        return;
  });

// book flight by clicking ends

// delete item from cart starts
app.get('/deletefromcart', (req, res)=>
{
  if(!req.session.is_logged_in)
  {
    res.redirect('/');
    res.end();
    return;
  }
  let ids= req.query.num;

    sql= `delete from cart where email= '${req.session.name}' and prodId='${ids}';`;
    con.query(sql, (err, result)=>
    {
      if(err)
      throw err;
      console.log(result);
      res.end();
      return;
    });
  });
// delete item from cart ends

// increase item count from cart starts
app.get('/increaseltnumberCart', (req, res)=>
{
  if(!req.session.is_logged_in)
  {
    res.redirect('/');
    res.end();
    return;
  }
  let nam= req.session.name;
  let ids= req.query.num;
  console.log(nam, " ", ids);
  con.query(`select qty from cart where email= '${nam}' and prodId= '${ids}';`, (err, result)=>
  {
    if(err)
    throw err;
    con.query(`select qty, price from items where id= '${ids}';`, (err, resul)=>
    {
      if(result[0].qty < resul[0].qty)
      {
        let qty= (result[0].qty)+1;
        con.query(`update cart set qty= '${qty}' where prodId= '${ids}' and email= '${nam}';`,(err, resu)=>
        {
          if(err)
          throw err;
          console.log(resu);
          res.json({left: resul[0].qty, price: resul[0].price});
            res.end();
        })
      }
    });

  });
  });


// increase item count from cart ends


// decrease item count from cart starts
app.get('/decreaseltnumberCart', (req, res)=>
{
  if(!req.session.is_logged_in)
  {
    res.redirect('/');
    res.end();
    return;
  }
  let nam= req.session.name;
  let ids= req.query.num;
  console.log(nam, " ", ids);
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
          console.log(resu);
          res.json({left: resul[0].qty, price: resul[0].price});
            res.end();
          })
        }
      });
  
    });
    });

// decrease item count from cart ends


// adding data as admin with mysql starts
app.get('/admin', (req,res)=>
{
  if(req.session.is_logged_in && req.session.role =='admin')
  {
  res.render(__dirname+'/public/home/admin.ejs');
  res.end();
  }
  else{
    res.redirect("/");
    res.end();
    return;
  }
});

app.post('/addAdmin', upload.single('img'),(req, res)=>
{
      if (
        req.body.img == "" ||
        req.body.disc.trim() == "" ||
        req.body.left.trim() == "" ||
        req.body.price.trim() == "" ||
        req.body.name.trim() == ""
      ) {
        res.render(__dirname+"/public/home/admin.ejs");
        return;
      }
      let obj= req.body;
      obj.id = 'img'+Date.now();
      obj.img = req.file.filename;
      // sql
      let sql= `insert into items values('${obj.name}', '${obj.img}', '${obj.disc}', '${obj.id}', '${obj.left}', '${obj.price}');`;
      con.query(sql, (err, result)=>
      {
        if(err)
        throw err;
        res.render(__dirname+"/public/home/admin.ejs");
        res.end();
      });

      // sql ends
      
      
    
  });

// adding data to admin wiith mysql completed and colsed

// view data admin 

app.get('/viewDataAdmin',(req,res)=>
{
  if(req.session.is_logged_in && req.session.role =='admin')
  {
  res.render(__dirname+"/public/home/viewDataAdmin.ejs")
  res.end();
  return;
  }
    res.redirect("/");
    res.end();
    return;
});

// view data admin ends

app.get("/LoadingAdminData", (req, res) => {
  if (req.session.is_logged_in && req.session.role == 'admin')
  {
  var iterate = Number(req.query.co);
    let recor=[];
    // sql
    let sql= `select * from items;`;
    con.query(sql, (err, result)=>
    {
      if(err)
      throw err;
      for (var i = iterate - 5; i < iterate; i++) 
      {
        if(result.length >0)
        recor.push(result[i]);
      }
      res.json(recor);
      return;
    });
    // sql ends
  }
  });

// delete item from Admin cart starts
app.get('/deletefromAdmincart', (req, res)=>
{
  
  let ids= req.query.num;
  if(ids)
  {
    sql= `delete from cart where id='${ids}';`;
    con.query(sql, (err, result)=>
    {
      if(err)
      throw err;
      console.log(result);
      res.end();
      return;
    });
  }
  else{
    res.redirect('/');
  }
});
// delete item from Admin cart ends

// edit item from Admin cart starts
app.get('/editfromAdmincart', (req, res)=>
{
  if(req.session.is_logged_in && req.session.role =='admin')
  {
  let ids= req.query.num;
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
  else
  {
    res.redirect("/login");
    res.end();
    return;
  }
});

// update item from Admin cart ends

app.get('/updatefromAdmincart', (req, res)=>
{
  if(req.session.is_logged_in && req.session.role =='admin')
  {
  let obj= JSON.parse(req.query.obj);
  con.query(`update items set name= '${obj.name}', disc= '${obj.disc}', qty= '${obj.qty}', price ='${obj.price}' where id= '${obj.id}';`, (err, result)=>
  {
    if(err)
    throw err;
    con.query(`select img from items where id= '${obj.id}';`, (err, resp)=>
    {
      if(err)
      throw err;
      console.log(resp)
      res.json(resp[0].img);
      res.end();
    });
});
}
  else{
    res.redirect("/login");
    res.end();
    return;
  }
});

// update item from Admin cart ends



// logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect('/');
  return;
  // res.render(__dirname + "/public/home/index.ejs", { page: "0" });
});

// if nothing match
app.get("*",(req, res)=>
{
  res.render(__dirname+"/public/home/404.ejs");
})
// nothing match ends

app.listen(port, () => {
  console.log("server starts");
});
