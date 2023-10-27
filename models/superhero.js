const mongoose = require("mongoose");

const superheroSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  real_name: {
    type: String,
    required: true,
  },
  origin_description: {
    type: String,
    required: true,
  },
  superpowers: {
    type: [String],
    required: true,
  },
  catch_phrase: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    validate: {
      validator: function (value) {
        return value.every(url => {
          const urlRegex =
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
          return urlRegex.test(url);
        });
      },
      message: props => `${props.value} is not a valid URL`,
    },
  },
});

const Superhero = mongoose.model("Superhero", superheroSchema);

module.exports = Superhero;
