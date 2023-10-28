const uploadImage = require("../helpers/uploadImage");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const uploadHeroImage = async (req, res) => {
  const image = req.file;
  if (!image) return res.status(400).json("Image required");
  const link = await uploadImage(image);
  if (link.error) return res.status(link.status).json(link.error.error_summary);
  res.status(200).json(link);
};

module.exports = {
  uploadHeroImage: ctrlWrapper(uploadHeroImage),
};
