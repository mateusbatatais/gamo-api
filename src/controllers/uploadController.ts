// src/controllers/uploadController.ts
import { RequestHandler } from "express";
import multer from "multer";
import cloudinary, { CloudinaryUploadResponse } from "../utils/cloudinary";
import { AppError } from "../utils/errors";
import streamifier from "streamifier";

const upload = multer(); // armazenagem em memória

// Handler de upload
const handleUpload: RequestHandler = async (req, res, next) => {
  console.log("🔔 [uploadController] ENV:", {
    cloud: process.env.CLOUDINARY_CLOUD_NAME,
    key: !!process.env.CLOUDINARY_API_KEY,
  });
  console.log("🔔 [uploadController] req.file:", req.file);

  try {
    if (!req.file) {
      console.error("❌ [uploadController] No file in request");
      throw new AppError(400, "NO_FILE_UPLOADED", "Nenhum arquivo foi enviado");
    }

    const buffer = req.file.buffer;
    console.log(`🔔 [uploadController] Uploading buffer of length ${buffer.length}`);

    const streamUpload = (fileBuffer: Buffer): Promise<CloudinaryUploadResponse> => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "profiles",
            format: "jpg",
            transformation: [
              { width: 500, height: 500, crop: "limit" },
              { fetch_format: "auto", quality: "auto" },
            ],
          },
          (error, result) => {
            if (error) {
              console.error("❌ [uploadController] Cloudinary error:", error);
              return reject(error);
            }
            console.log("✅ [uploadController] Cloudinary upload result:", result);
            resolve(result!);
          },
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    };

    const result = await streamUpload(buffer);

    console.log("🔔 [uploadController] Responding with URL:", result.secure_url);
    res.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err: unknown) {
    console.error("❌ [uploadController] Unexpected error:", err);
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ code: err.code, message: err.message });
      return;
    }
    next(err);
  }
};

export const uploadProfileImage = [upload.single("file"), handleUpload];
