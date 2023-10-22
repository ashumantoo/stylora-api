import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "ashumantoo",
  api_key: process.env.API_KEY || "536788645814533",
  api_secret: process.env.API_SECRET || "ky06JnOKmjwsYuduQEa1GDIkul0",
});

export const uploadImageToCloudinary = async (file: any, folderName: string) => {
  try {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: `flipkart-clone/${folderName}`,
      resource_type: "auto",
    });
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
}