import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const uploadToCloudinary = async (
  file,
  folder,
  resourceType = "auto"
) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const fileExtension = file.originalname
    .split(".")
    .pop()
    .toLowerCase();

  const detectedType =
    fileExtension === "pdf" ? "raw" : resourceType;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: detectedType,
        timeout: 60000,
        use_filename: true,
        unique_filename: false,
        filename_override: file.originalname,
      },
      (error, result) => {
        console.log("CLOUDINARY RESULT:", result);

        if (error) {
          reject(new Error(error.message));
        } else {
          resolve(result.secure_url);
        }
      }
    );

    streamifier
      .createReadStream(file.buffer)
      .pipe(uploadStream);
  });
};