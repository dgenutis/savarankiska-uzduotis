const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/add", (req, res) => {
  res.render("addMovie");
});

router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovie);
router.post("/", movieController.createMovie);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
