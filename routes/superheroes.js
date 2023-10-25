// routes/superheroes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const Superhero = require("../models/superhero");
const validateSuperhero = require("../validators/superhero");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/superheroes",
  validateSuperhero,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const {
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
      } = req.body;
      const images = req.files.map(file => file.path);
      const superhero = new Superhero({
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        images,
      });
      await superhero.save();
      res.status(201).json(superhero);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = 5;
    const superheroes = await Superhero.find()
      .select("nickname images")
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.json(superheroes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);
    if (!superhero) {
      return res.status(404).json({ error: "Superhero not found" });
    }
    res.json(superhero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put(
  "/:id",
  validateSuperhero,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const {
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
      } = req.body;
      const images = req.files.map(file => file.path);
      const superhero = await Superhero.findByIdAndUpdate(
        req.params.id,
        {
          nickname,
          real_name,
          origin_description,
          superpowers,
          catch_phrase,
          images,
        },
        { new: true }
      );
      if (!superhero) {
        return res.status(404).json({ error: "Superhero not found" });
      }
      res.json(superhero);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const superhero = await Superhero.findByIdAndDelete(req.params.id);
    if (!superhero) {
      return res.status(404).json({ error: "Superhero not found" });
    }
    res.json({ message: "Superhero deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
