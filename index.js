let express = require("express");
let app = express();
app.use(express.json());
let Joi = require("@hapi/joi");
let port = "4500";
let users = [
  {
    id: 1,
    name: "Angular"
  },
  {
    id: 2,
    name: "Javascript"
  },
  {
    id: 3,
    name: "Node"
  },
  {
    id: 4,
    name: "Express"
  }
];

app.get("/api/users/:id", (req, res) => {
  let userId = users.find(data => data.id == parseInt(req.params.id));
  if (!userId) {
    return res.status(404).send({ message: "invalid user" });
  }
  res.send(userId);
});

app.post("/api/users/newusers/", (req, res) => {
  let schema = Joi.object().keys({
    name: Joi.string()
      .min(4)
      .max(10)
      .required()
  });
  let result = schema.validate(req.body);

  let data = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(data);
  res.send(users);
});

// app.get("/api/users", (req, res) => {
//   res.send("hue hue hue");
// });
app.listen(port, () => console.log(`my port is working on : ${port}`));
