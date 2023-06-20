const path = require("path");
const { EMAIL, PASSWORD } = require("../../env");
const { con } = require("../../models/sql.model");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
// signup starts

function getSignup(req, res) {
  if (req.session.is_logged_in && req.session.role != "admin")
    res.redirect("/");
  else
    res.render(path.join(__dirname,"..","..","home","signup.ejs"), {
      page: "3",
      err: 0,
    });
}
function postSignup(req, res) {
    if (!req.body.email || !req.body.password) {
      res.status("400");
      res.send("Invalid details!");
      return;
    }
    if (req.body.email.trim() === "" || req.body.password.trim() === "") {
      res.status("400");
      res.render(path.join(__dirname, "..","..","home","signup.ejs"), {
        page: "3",
        err: 1,
      });
      return;
    }
    let email = req.body.email;
    // sql to check thatemail already exist starts
    let sql = `select * from data where email = '${email}';`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        if (result[0].email == email) {
          res.render(path.join(__dirname, "..","..","home","signup.ejs"), {
            page: "3",
            err: 2,
          });
          return;
        }
      } else {
        var body = req.body;
        var id = Date.now();
        body.key = id;
        body.prodycts = [];
        body.varified = false;
        body.role = "user";
        req.session.is_logged_in = false;
        req.session.name = req.body.email;
        // sql signup insert
        let sql = `insert into data (email, password, varified, role, keyss) values('${body.email}', '${body.password}', '${body.varified}', '${body.role}', '${body.key}');`;
        con.query(sql, (err, result) => {
          if (err) throw err;
          res.send(
            "<h5>Successfull login | go to mail and verify </h5> <br> <a href='/login'>Login</a>"
          );
        });
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
                  link: `http://127.0.0.1:4000/signup/${id}`,
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
    });
    // sql to check thatemail already exist ends
}
// sql for signup completely ends and closed


// varified connected with mysql starts
function getSignupVarification(req, res)
 {
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
  }
// varified connected with mysql completed and closed



module.exports=
{
    getSignup,
    postSignup,
    getSignupVarification
}