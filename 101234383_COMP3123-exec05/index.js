// Cung Minh Duc - 101234383

const express = require('express')
const app = express()

const router = express.Router()
const fs = require("fs")
const path = require("path")

let jsoninfo= fs.readFileSync(path.resolve(__dirname, "user.json"))
let userData= JSON.parse(jsoninfo)



router.get("/home", (req, res) => {
  res.sendFile("home.html", { root: __dirname });
});


router.get('/profile', (req,res) =>
{
  res.json(userData);
});


router.get('/login', (req,res) =>
{

  let user = req.query.username;
  let pass= req.query.password;

  let jsondata = fs.readFileSync(path.resolve(__dirname, "user.json"))
  let parseddata= JSON.parse(jsondata)

  let storeduser = parseddata.username;
  let storedpass = parseddata.password;

  if (storeduser === user && storedpass === pass)
  {
    res.json({status: true, message: "User is wrong",});
  }

  else if (storeduser !== user)
  {
    res.json({status: false, message: "User Name is wrong",});
  }

  else if (storedpass !== pass)
  {res.json({status: false, message: "Password is wrong",
  });
  }
});

router.get("/logout/:username", (req, res) =>
{
  res.setHeader("Content-type", "text/html");
  res.send(`<b>${req.params.username} has logged out.<b>`);
});


app.use("/", router);
app.listen(process.env.port || 8089);

console.log("The server is running " + (process.env.port || 8089));
