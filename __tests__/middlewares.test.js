const validateBody = require("../middlewares/validateBody");
const Joi = require("joi");

describe("Middleware Tests", () => {
  describe("validateBody Middleware", () => {
    it("should pass the request to the next middleware with valid data", () => {
      const req = {
        body: {
          nickname: "Superhero",
          real_name: "John Doe",
          origin_description: "Origin",
          superpowers: ["power1", "power2"],
          catch_phrase: "Catch me if you can",
        },
      };
      const res = {};
      const next = jest.fn();
      validateBody(Joi.object())(req, res, next);
      expect(next).toHaveBeenCalledWith();
    });
  });
});
