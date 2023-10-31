const Superhero = require("../models/superhero");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const newHero = async (req, res) => {
  const fileLinks = req.files.map(file => `/${file.filename}`);
  const superhero = new Superhero({
    ...req.body,
    images: fileLinks,
  });

  await superhero.save();
  res.status(201).json(superhero);
};

const listHeroes = async (req, res) => {
  const page = req.query.page || 1;
  const perPage = 5;
  const superheroes = await Superhero.find()
    .select("nickname images")
    .skip((page - 1) * perPage)
    .limit(perPage);
  const totalItems = await Superhero.countDocuments();
  res.json({
    superheroes,
    totalItems,
  });
};

const getHero = async (req, res) => {
  const superhero = await Superhero.findById(req.params.id);
  if (!superhero) {
    return res.status(404).json({ error: "Superhero not found" });
  }
  res.json(superhero);
};

const updateHero = async (req, res) => {
  const oldFileLinks = req.body.images;
  const newFileLinks = req.files.map(file => `/${file.filename}`);
  let images;

  if (oldFileLinks && oldFileLinks.length > 0) {
    images = [oldFileLinks, ...newFileLinks].flat();
  } else {
    images = newFileLinks;
  }

  const superhero = await Superhero.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      images: images,
    },
    { new: true }
  );

  if (!superhero) {
    return res.status(404).json({ error: "Superhero not found" });
  }

  res.status(200).json(superhero);
};

const removeHero = async (req, res) => {
  const superhero = await Superhero.findByIdAndDelete(req.params.id);
  if (!superhero) {
    return res.status(404).json({ error: "Superhero not found" });
  }
  res.json({ message: "Superhero deleted successfully" });
};

module.exports = {
  newHero: ctrlWrapper(newHero),
  listHeroes: ctrlWrapper(listHeroes),
  getHero: ctrlWrapper(getHero),
  updateHero: ctrlWrapper(updateHero),
  removeHero: ctrlWrapper(removeHero),
};
