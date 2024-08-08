const Movie = require("../models/movie");
const movieController = require("../controllers/movieController");

jest.mock("../models/movie");

describe("Movie Controller", () => {
  // Test1
  describe("getAllMovies", () => {
    it("should return all movies", async () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const movies = [
        { title: "Movie 1", year: 2020 },
        { title: "Movie 2", year: 2021 },
      ];
      Movie.find.mockResolvedValue(movies);

      await movieController.getAllMovies(req, res);

      expect(res.json).toHaveBeenCalledWith(movies);
    });

    it("should handle errors", async () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const errorMessage = { message: "Error" };
      Movie.find.mockRejectedValue(errorMessage);

      await movieController.getAllMovies(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
  });

  // Test2
  describe("getMovie", () => {
    it("should return a single movie", async () => {
      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const movie = { title: "Movie 1", year: 2020 };
      Movie.findById.mockResolvedValue(movie);

      await movieController.getMovie(req, res);

      expect(res.json).toHaveBeenCalledWith(movie);
    });

    it("should handle movie not found", async () => {
      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Movie.findById.mockResolvedValue(null);

      await movieController.getMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Movie not found" });
    });

    it("should handle errors", async () => {
      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const errorMessage = { message: "Error" };
      Movie.findById.mockRejectedValue(errorMessage);

      await movieController.getMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
  });

  // Test3
  describe("createMovie", () => {
    it("should create a new movie", async () => {
      const req = { body: { title: "New Movie", year: 2022 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        redirect: jest.fn(),
        json: jest.fn(),
      };

      const movie = new Movie(req.body);
      Movie.prototype.save = jest.fn().mockResolvedValue(movie);

      await movieController.createMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.redirect).toHaveBeenCalledWith("/");
    });

    it("should handle errors", async () => {
      const req = { body: { title: "New Movie", year: 2022 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = { message: "Error" };
      Movie.prototype.save = jest.fn().mockRejectedValue(errorMessage);

      await movieController.createMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
  });

  // Test4
  describe("updateMovie", () => {
    it("should update an existing movie", async () => {
      const req = {
        params: { id: "1" },
        body: { title: "Updated Movie", year: 2023 },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const movie = {
        title: "Old Movie",
        year: 2020,
        save: jest
          .fn()
          .mockResolvedValue({ title: "Updated Movie", year: 2023 }),
      };
      Movie.findById.mockResolvedValue(movie);

      await movieController.updateMovie(req, res);

      expect(res.json).toHaveBeenCalledWith({
        title: "Updated Movie",
        year: 2023,
      });
    });

    it("should handle movie not found", async () => {
      const req = {
        params: { id: "1" },
        body: { title: "Updated Movie", year: 2023 },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Movie.findById.mockResolvedValue(null);

      await movieController.updateMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Movie not found" });
    });

    it("should handle errors", async () => {
      const req = {
        params: { id: "1" },
        body: { title: "Updated Movie", year: 2023 },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const errorMessage = { message: "Error" };
      Movie.findById.mockRejectedValue(errorMessage);

      await movieController.updateMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
  });

  // Test5
  describe("deleteMovie", () => {
    it("should delete an existing movie", async () => {
      const req = { params: { id: "1" } };
      const res = {
        redirect: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const movie = { title: "Movie to be deleted", year: 2020 };
      Movie.findByIdAndDelete.mockResolvedValue(movie);

      await movieController.deleteMovie(req, res);

      expect(res.redirect).toHaveBeenCalledWith("/");
    });

    it("should handle movie not found", async () => {
      const req = { params: { id: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Movie.findByIdAndDelete.mockResolvedValue(null);

      await movieController.deleteMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Movie not found" });
    });

    it("should handle errors", async () => {
      const req = { params: { id: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = { message: "Error" };
      Movie.findByIdAndDelete.mockRejectedValue(errorMessage);

      await movieController.deleteMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
  });
});
