const request = require("supertest");
const app = require("../index");
const fs = require("fs");
const path = require("path");
const Superhero = require("../models/superhero");

describe("Superheroes Endpoint Tests", () => {
  let superheroId;

  it("should create a new superhero", async () => {
    const imagePath = path.join(__dirname, "test-image.jpg");
    const image = fs.createReadStream(imagePath);

    const formData = new FormData();
    formData.append("nickname", "TestHero");
    formData.append("real_name", "Test Real Name");
    formData.append("origin_description", "Test Origin");
    formData.append("superpowers", JSON.stringify(["power1", "power2"]));
    formData.append("catch_phrase", "Test Catch Phrase");
    formData.append("image", image);

    const response = await request(app)
      .post("/superheroes")
      .set("Content-Type", "multipart/form-data")
      .send(formData)
      .expect(201);

    const superheroId = response.body._id;
    expect(superheroId).toBeDefined();
  });

  it("should get the list of superheroes", async () => {
    const response = await request(app).get("/superheroes").expect(200);

    const superheroes = response.body.superheroes;
    expect(superheroes).toEqual([]) ||
      expect(superheroes.length).toBeGreaterThan(0);
  });

  it("should get a superhero by ID", async () => {
    await request(app)
      .get(`/superheroes/${superheroId}`)
      .expect(200)
      .then(response => {
        const superhero = response.body;
        expect(superhero._id).toBe(superheroId);
      });
  });

  it("should update a superhero by ID", async () => {
    await request(app)
      .put(`/superheroes/${superheroId}`)
      .send({ nickname: "UpdatedHero" })
      .expect(200)
      .then(response => {
        const updatedSuperhero = response.body;
        expect(updatedSuperhero.nickname).toBe("UpdatedHero");
      });
  });

  it("should delete a superhero by ID", async () => {
    await request(app).delete(`/superheroes/${superheroId}`).expect(200);

    const deletedSuperhero = await Superhero.findById(superheroId);
    expect(deletedSuperhero).toBeNull();
  });

  it("should handle non-existing superhero ID for GET", async () => {
    await request(app).get(`/superheroes/nonexistentid`).expect(404);
  });

  it("should handle non-existing superhero ID for DELETE", async () => {
    await request(app).delete(`/superheroes/nonexistentid`).expect(404);
  });
});
