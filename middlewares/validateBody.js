const validateBody = schema => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);

    error ? next(new Error(error.message)) : next();
  };
};

module.exports = validateBody;
