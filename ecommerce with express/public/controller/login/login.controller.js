// login with mysql server started
const path = require('path');
const { con } = require('../../models/sql.model');
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { EMAIL, PASSWORD } = require("../../env");

function getLogin(req, res){
    if (req.session.is_logged_in && req.session.role !='admin')
    res.redirect('/dashboard')
    else res.render(path.join(__dirname, "..","..","home", "login.ejs"), { page: "1" });
  }
function postLogin(req, res){
      
      let email = req.body.email;
      let password = req.body.password;
      // sql
      let sql= `select * from data where email= '${email}' and password= '${password}';`;
      con.query(sql, (err, result)=>
      {
        if(err)
        throw err;
        
        if(result.length <=0)
        {
          res.write(
            "<h1>Either Worng password or wrong email or <br>confirm that email is verified</h1><a href='/login'>login</a>"
          );
          res.end();
        }
        else if(result[0].varified== 'true')
        {
          req.session.is_logged_in = true;
          req.session.name = result[0].email;
          req.session.role= result[0].role;
          if(result[0].role== 'admin')
          {
            res.redirect('/admin');
            return;
          }
          res.redirect('/dashboard')
          return;
        }
        else 
        {
          res.write(
            "<h1>Either Worng password or wrong email or <br>confirm that email is verified</h1><a href='/login'>login</a>"
          );
          res.end();
        }
      })  
    }
      // sql ends
      // login with mysql server completed and closed

      
// forget password with mysql starts

// submit form
function getForgetPassword(req, res){
    res.render(path.join(__dirname, "..","..","home", "forgetPassword.ejs"), {
      page: 0,
      err: "",
    });
  }
  function postForgetPassword(req, res){
      let email = req.body.email;
      // sql
      let sql= `select * from data where email= '${email}';`;
      con.query(sql, (err, result)=>
      {
        if(err)
        throw err;
        if(result.length <1)
        {
          res.render(path.join(__dirname, "..","..","home", "forgetPassword.ejs"), {
            page: 0,
            err: 1,
          });
        }
        if(result.length > 0)
        {
        if(result[0].varified === 'true')
        {
          // mail
          let id = result[0].keyss;
          let userEmail = email;
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
              name: "Travel kro",
              link: "https://mailgen.js/",
            },
          });
  
          let response = {
            body: {
              name: "Dude",
              intro: "want to Reset password",
              action: {
                instructions: "No worries we are here for you",
                button: {
                  color: "#EA8F1C", // Optional action button color
                  // 💋
                  text: "Reset password ",
                  link: `http://127.0.0.1:4000/reset/${id}`,
                },
              },
              outro: "Enjoy Travelling with us ",
            },
          };
  
          let mail = MailGenerator.generate(response);
          let message = {
            from: EMAIL,
            to: userEmail,
            subject: "Reset Travel kro",
            html: mail,
          };
          transporter.sendMail(message);
          // mail
          res.render(path.join(__dirname, "..","..","home", "forgetPassword.ejs"), {
            page: 0,
            err: 99,
          });
          return;
        }
        else if(result[0].varified== 'false'){
          res.render(path.join(__dirname, "..","..","home", "forgetPassword.ejs"), {
            page: 0,
            err: 2,
          });
        }
      }
      });
      // mail
  }
  // forget password with mysql ends and completed




module.exports = {
    getLogin,
    postLogin,
    getForgetPassword,
    postForgetPassword
}