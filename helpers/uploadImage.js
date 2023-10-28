const { Dropbox } = require("dropbox");
const { BOX_ATOKEN } = process.env;

const dbx = new Dropbox({ accessToken: BOX_ATOKEN });

const uploadImage = async image => {
  try {
    const fileName = image.originalname;
    const [name, extension] = fileName.split(".");
    const isImage = ["png", "jpg", "jpeg", "webp"].includes(
      extension.toLowerCase()
    );
    if (!isImage) return new Error(`Not an image, ${error.message}`);
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
    return error;
  }
};

module.exports = uploadImage;
