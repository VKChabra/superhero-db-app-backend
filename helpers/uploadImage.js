const { Dropbox } = require("dropbox");
const { BOX_ATOKEN } = process.env;

const dbx = new Dropbox({ accessToken: BOX_ATOKEN });

const uploadImage = async image => {
  try {
    const fileName = image.originalname;
    const [name, extension] = fileName.split(".");
    const isImage = ["png", "jpg", "jpeg"].includes(extension.toLowerCase());
    if (!isImage) return new Error(400, "not an image");
    const uniqueName = `${name}_${Date.now()}.${extension}`;
    const imgPath = "/" + uniqueName;
    const response = await dbx.filesUpload({
      path: imgPath,
      contents: image.buffer,
    });
    const createLink = await dbx.sharingCreateSharedLinkWithSettings({
      path: response.result.id,
    });
    const link = createLink.result.url;
    return link;
  } catch (error) {
    return new Error(error);
  }
};

module.exports = uploadImage;
