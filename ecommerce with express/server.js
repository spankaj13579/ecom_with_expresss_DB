const express = require("express");
const session = require("express-session");
const fs = require("fs");
const { actionOnAdminCartRouter } = require("./public/controller/admin/actionOnAdminCart.router");

const { postAddAdminRouter } = require("./public/controller/admin/addingadmindata.router");
const { getAdminRouter } = require("./public/controller/admin/Admin.router");
const { getBookRouter } = require("./public/controller/bookincart/book.cart.router");
const { getCartRouter } = require("./public/controller/carta/cart.router");
const { getCartpageRouter } = require("./public/controller/carta/getcart.router");
const { postChangePasswordLogginedRouter } = require("./public/controller/changePasswordloginned/changepasswordloggined.router");
const { dashboardRouter } = require("./public/controller/dashboard/dashboard.router");
const { getDecreaseltnumberCartRouter } = require("./public/controller/decreaseCountCart/decreaseCountcart.router");
const { getDeleteFromCartRouter } = require("./public/controller/deletefromcart/deletefromcart.router");
const { forgetRouter } = require("./public/controller/forget/forget.router");
const { getGetDataRouter } = require("./public/controller/getdata/getdata.router");
const { getIncreaseltnumberCartRouter } = require("./public/controller/increaseCountinCart/increasecountincart.router");
const { homeRouter } = require("./public/controller/index/home.router");
const { loginRouter } = require('./public/controller/login/login.router');
const { signupRouter } = require("./public/controller/signup/signup.router");
const { con } = require("./public/models/sql.model");
const app = express();

con.connect(function(err) {
  if (err) 
  {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

const port = 4000;
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

app.use('/', homeRouter);
app.use("/login",loginRouter)
app.use('/reset', forgetRouter)
app.use('/dashboard', dashboardRouter)
app.use('/signup', signupRouter)
app.use('/getdata', getGetDataRouter)
app.use('/newPassword', postChangePasswordLogginedRouter)
app.use('/getCart', getCartpageRouter)
app.use('/cart', getCartRouter)
app.use('/book', getBookRouter)
app.use('/deletefromcart', getDeleteFromCartRouter)
app.use('/increaseltnumberCart',getIncreaseltnumberCartRouter)//not completed
app.use('/decreaseltnumberCart',getDecreaseltnumberCartRouter)//not completed
app.use('/admin', getAdminRouter)
app.use('/addAdmin',postAddAdminRouter)
app.use('/actiononadmincart', actionOnAdminCartRouter)
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

// logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect('/');
  return;
});
// if nothing match
app.get("*",(req, res)=>
{
  res.render(__dirname+"/public/home/404.ejs");
})
// nothing match ends

app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
