import fs from "fs";
import cloudinary from "../lib/cloudinary.js";

export const uploadToCloudinary = async (localFilePath: string) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    fs.unlinkSync(localFilePath);
    return response.secure_url;
  } catch (err) {
    console.log("Error while uploading image to cloudinary...", err);
    fs.unlinkSync(localFilePath);
  }
};

export const deleteFromCloudinary = async (imageUrl: string) => {
  try {
    const publicId = imageUrl.split("/").pop()?.split(".")[0] as string;
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    return response;
  } catch (err) {
    console.log("Error while deleting image from Cloudinary...", err);
    return null;
  }
};
