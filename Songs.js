let express = require("express");
let app = express();
app.use(express.json());
let Joi = require("@hapi/joi");
let port = "4200";
let allSongs = [
  {
    id: 1,
    title: "Castle of Glass",
    author: "Linkin Park    ",
    genre: "Rock",
    publishDate: "2014"
  },
  {
    id: 2,
    title: "Rap God",
    author: "Eminem",
    genre: "hip hop",
    publishDate: "2015"
  },
  {
    id: 3,
    title: "Crown",
    author: "Neffex",
    genre: "Rock",
    publishDate: "2017"
  },
  {
    id: 4,
    title: "Stole the Show",
    author: "Kygo",
    genre: "Tropical House",
    publishDate: "2014"
  }
];

app.get("/api/AllAlbums/", (req, res) => {
  res.send(allSongs);
});

app.get("/api/AlbumsById/:id", (req, res) => {
  let albumId = allSongs.find(data => data.id == parseInt(req.params.id));
  if (!albumId) {
    return res.status(404).send({ message: "invalid name" });
  }
  res.send(albumId);
});
app.post("/api/AllAlbums/newAlbums/", (req, res) => {
  let schema = Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    publishDate: Joi.string().required()
  });
  let result = schema.validate(req.body);

  let data = {
    id: allSongs.length + 1,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    publishDate: req.body.publishDate
  };
  allSongs.push(data);
  res.send(allSongs);
});
app.listen(port, () => console.log(`my port is working on : ${port}`));
