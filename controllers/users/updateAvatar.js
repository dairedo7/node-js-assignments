const { User } = require("../../models");
const path = require("path");
const fs = require("fs").promises;
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, filename } = req.file;
  const { _id } = req.user;
  const [extention] = filename.split(".").reverse();
  const avatarName = `${_id}.${extention}`;

  const resultUpload = path.join(avatarsDir, avatarName);
  const avatarURL = path.join("avatars", resultUpload);
  try {
    await fs.rename(tempUpload, resultUpload);
    const file = await jimp.read(resultUpload);
    await file.resize(250, 250).write(resultUpload);

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
