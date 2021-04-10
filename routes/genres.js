const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  var genresId = req.params.id;
  if (mongoose.Types.ObjectId.isValid(genresId)) {
    const genre = await Genre.findByIdAndRemove(genresId);
    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");
    res.send(genre);
  } else {
    return res.status(404).send("Not a valid ID");
  }
});

router.get("/:id", async (req, res) => {
  var genresId = req.params.id;
  // genresId = mongoose.Types.ObjectId(genresId);
  if (mongoose.Types.ObjectId.isValid(genresId)) {
    const genre = await Genre.findByIdAndRemove(genresId);
    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");
    res.send(genre);
  } else {
    return res.status(404).send("Not a valid ID");
  }

  // res.send(genre);
});

module.exports = router;
