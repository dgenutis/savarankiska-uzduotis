const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
const path = require("path");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/views/styles", express.static(path.join(__dirname, "views", "styles")));

// registruojame view engine
app.set("view engine", "ejs");

// Mongo DB
const dbURI =
  "mongodb+srv://dgenutis001:9ce1yA2pESbm1rfR@cluster0.l3xiku5.mongodb.net/savUzduotis";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Importuojame Movie modelį
const Movie = require("./models/movie");

// Routes
const moviesRoutes = require("./routes/movieRoutes");
app.use("/movies", moviesRoutes);

// views
app.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.render("index", { movies });
});


