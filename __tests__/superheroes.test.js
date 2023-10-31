const {
  newHero,
  getHero,
  updateHero,
  removeHero,
} = require("../controllers/superhero");

const Superhero = require("../models/superhero");

describe("Controllers Tests", () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should create a new superhero", async () => {
    req.body = {
      nickname: "TestHero",
      real_name: "Test Real Name",
      origin_description: "Test Origin",
      superpowers: ["power1", "power2"],
      catch_phrase: "Test Catch Phrase",
    };
    await newHero(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();

    const createdSuperhero = await Superhero.findOne({
      nickname: "TestHero",
    });
    expect(createdSuperhero).toBeDefined();
  });

  it("should get a superhero by ID", async () => {
    req.params = {
      id: "validsuperheroid",
    };
    await getHero(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("should handle non-existing superhero ID for GET", async () => {
    req.params = {
      id: "nonexistentid",
    };
    await getHero(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalled();
  });

  it("should update a superhero by ID", async () => {
    req.params = {
      id: "validsuperheroid",
    };
    req.body = {
      nickname: "UpdatedHero",
    };
    await updateHero(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();

    const updatedSuperhero = await Superhero.findOne({
      _id: "validsuperheroid",
    });
    expect(updatedSuperhero.nickname).toBe("UpdatedHero");
  });

  it("should handle non-existing superhero ID for UPDATE", async () => {
    req.params = {
      id: "nonexistentid",
    };
    await updateHero(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalled();
  });

  it("should delete a superhero by ID", async () => {
    req.params = {
      id: "validsuperheroid",
    };
    await removeHero(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();

    const deletedSuperhero = await Superhero.findOne({
      _id: "validsuperheroid",
    });
    expect(deletedSuperhero).toBeNull();
  });

  it("should handle non-existing superhero ID for DELETE", async () => {
    req.params = {
      id: "nonexistentid",
    };
    await removeHero(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalled();
  });
});
