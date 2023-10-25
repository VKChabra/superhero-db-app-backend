const { body, validationResult } = require("express-validator");

const validateSuperhero = [
  body("nickname").notEmpty().trim().escape(),
  body("real_name").notEmpty().trim().escape(),
  body("origin_description").notEmpty().trim().escape(),
  body("superpowers").isArray(),
  body("catch_phrase").notEmpty().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateSuperhero;
