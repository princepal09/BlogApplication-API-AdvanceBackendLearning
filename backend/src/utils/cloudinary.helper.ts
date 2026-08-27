import fs from "fs";
import cloudinary from "../lib/cloudinary.js";

export const uploadToCloudinary = async (localFilePath: string) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    return response.secure_url;
    fs.unlinkSync(localFilePath);
  } catch (err) {
    console.log("Error while uploading image to cloudinary...", err);
    fs.unlinkSync(localFilePath);
  }
};
