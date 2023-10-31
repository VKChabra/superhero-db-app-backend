const express = require("express");
const router = express.Router();
const validateBody = require("../middlewares/validateBody");
const superheroSchema = require("../schemas/superhero");
const {
  newHero,
  listHeroes,
  getHero,
  updateHero,
  removeHero,
} = require("../controllers/superhero");
const upload = require("../middlewares/upload");

router.post("/", upload, validateBody(superheroSchema), newHero);

router.get("/", listHeroes);

router.get("/:id", getHero);

router.put("/:id", upload, validateBody(superheroSchema), updateHero);

router.delete("/:id", removeHero);

module.exports = router;
