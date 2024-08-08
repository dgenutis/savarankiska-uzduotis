const Movie = require('../models/movie')

// GET all
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//GET single

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// POST
exports.createMovie = async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    year: req.body.year,
  });
  try {
    await movie.save();
    res.status(201).redirect("/");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


//PUT update 
exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        movie.title = req.body.title || movie.title;
        movie.year = req.body.year || movie.year;

        const updatedMovie = await movie.save();
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}



// Delete
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        res.redirect("/");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
