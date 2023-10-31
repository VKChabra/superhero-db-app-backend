require("dotenv").config();
const mongoose = require("mongoose");
const { DB_HOST } = process.env;

beforeAll(async () => {
  await mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Mongoose connection success", () => {
  test("mongoose connection should be successful", () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});
