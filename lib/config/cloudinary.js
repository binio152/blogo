import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 * @param {Buffer} buffer - Image buffer
 * @param {string} folder - Cloudinary folder name (e.g., "blog-images", "author-avatars")
 * @param {string} publicId - Optional custom filename
 * @returns {Promise<string>} - Cloudinary image URL
 */
export async function uploadToCloudinary(
  buffer,
  folder = "blog-uploads",
  publicId
) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        public_id: publicId,
        resource_type: "auto",
        // Image optimization
        transformation: [
          { width: 1200, height: 630, crop: "limit" }, // Max dimensions
          { quality: "auto" }, // Auto quality
          { fetch_format: "auto" }, // Auto format (WebP for modern browsers)
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    // Write buffer to stream
    uploadStream.end(buffer);
  });
}

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<void>}
 */
export async function deleteFromCloudinary(publicId) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
}

export default cloudinary;
