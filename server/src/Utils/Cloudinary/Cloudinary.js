import dotenv from 'dotenv';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

/**
 * Upload file buffer to Cloudinary
 * @param {Buffer} fileBuffer - Multer file buffer
 * @param {String} filename - Original filename
 */
export const uploadOnCloudinary = async (fileBuffer, filename = 'upload') => {
  try {
    if (!fileBuffer) return null;

    // Convert buffer to base64
    const base64String = `data:image/${filename.split('.').pop()};base64,${fileBuffer.toString('base64')}`;

    // Upload to cloudinary
    const response = await cloudinary.uploader.upload(base64String, {
      resource_type: 'auto',
      folder: 'urban-eats',
    });

    console.log('✅ Cloudinary upload success:', response.secure_url);
    return response;
  } catch (error) {
    console.error('❌ File upload Err!! coming from cloudinary', error);
    return null;
  }
};
