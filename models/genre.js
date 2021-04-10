const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = {
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
};

const Genre = mongoose.model("Genre", new mongoose.Schema(genreSchema));

function validateGenre(genre) {
  return Joi.object({
    name: Joi.string().min(3).required(),
  }).validate(genre);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
