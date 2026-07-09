import createHttpError from "http-errors";
import { saveFileToCloudinary } from "../../utils/saveFileToCloudinary.js";
import { User } from "../../models/user.js";

// export const updateUserAvatar = async(req, res) => {
//   if(!req.file) {
//     throw createHttpError(400, 'No file');
//   };

//   const result = await saveFileToCloudinary(req.file.buffer, req.user._id);

//   const updatedUser = await User.findOneAndUpdate(
//     {_id: req.user._id},
//     {avatar: result.secure_url},
//     {returnDocument: 'after'}
//   );

//   res.status(200).json({ url: updatedUser.avatar});
// };

export const updateUserAvatar = async (req, res) => {
  try {
    console.log("===== UPDATE AVATAR =====");
    console.log("req.user:", req.user);
    console.log("req.file:", req.file);

    if (!req.file) {
      throw createHttpError(400, "No file");
    }

    console.log("Uploading to Cloudinary...");

    const result = await saveFileToCloudinary(req.file.buffer);

    console.log("Cloudinary result:", result);

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { avatar: result.secure_url },
      { returnDocument: "after" }
    );

    console.log("Updated user:", updatedUser);

    res.status(200).json({
      url: updatedUser.avatar,
    });
  } catch (err) {
    console.error("UPDATE AVATAR ERROR:");
    console.error(err);
    throw err;
  }
};
