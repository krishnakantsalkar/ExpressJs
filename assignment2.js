let express = require("express");
let app = express();
const router = express.Router();
let port = "4200";
let bcrypt = require("bcrypt");
app.use = express.json();

let UserReg = require("../ExpressJs/userRegisterSchema");

router.post("/userRegister", async (req, res) => {
  try {
    let { error } = UserReg.ValidationError(req.body);
    if (error) {
      return res.status(403).send(error.details[0].message);
    }
    let user = await UserReg.findOne({
      "userLogin.mobileNo": req.body.mobileNo
    });
    if (user) {
      return res.status(402).send({ message: "user already exists" });
    }
    let data = new UserReg({
      firsname: req.body.firstname,
      lastname: req.body.lastname,
      address: {
        city: req.body.city,
        state: req.body.state,
        country: req.body.country
      },
      userLogin: {
        mobileNo: req.body.mobileNo,
        password: req.body.password
      }
    });
    let salt = await bcrypt.genSalt(10);
    data.userLogin.password = await bcrypt.hash(data.userLogin.password, salt);
    let result = data.save();
    res.send({ message: "Your data is now stored!", data: result });
  } catch (ex) {
    res.send(ex.message);
  }
});
app.listen(port, () => console.log(`my port is working on : ${port}`));

module.exports = router;
