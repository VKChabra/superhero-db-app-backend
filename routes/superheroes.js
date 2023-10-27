const express = require("express");
const router = express.Router();
const multer = require("multer");
const validateBody = require("../middlewares/validateBody");
const superheroSchema = require("../schemas/superhero");
const {
  newHero,
  listHeroes,
  getHero,
  updateHero,
  removeHero,
} = require("../controllers/superhero");
const { uploadHeroImage } = require("../controllers/image");

const upload = multer();

router.post("/", validateBody(superheroSchema), newHero);

router.post("/upload", upload.single("image"), uploadHeroImage);

router.get("/", listHeroes);

router.get("/:id", getHero);

router.put("/:id", validateBody(superheroSchema), updateHero);

router.delete("/:id", removeHero);

module.exports = router;
