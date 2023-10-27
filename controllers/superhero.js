const Superhero = require("../models/superhero");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const newHero = async (req, res) => {
  const superhero = new Superhero({
    ...req.body,
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
  res.json(superheroes);
};

const getHero = async (req, res) => {
  const superhero = await Superhero.findById(req.params.id);
  if (!superhero) {
    return res.status(404).json({ error: "Superhero not found" });
  }
  res.json(superhero);
};

const updateHero = async (req, res) => {
  const superhero = await Superhero.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true }
  );
  if (!superhero) {
    return res.status(404).json({ error: "Superhero not found" });
  }
  res.json(superhero);
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
