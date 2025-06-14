// src/controllers/uploadController.ts
import { RequestHandler } from "express";
import multer from "multer";
import cloudinary, { CloudinaryUploadResponse } from "../infra/cloudinary";
import { AppError } from "../shared/errors";
import streamifier from "streamifier";

const upload = multer(); // armazenagem em memória
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Handler de upload
const handleUpload: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError(400, "NO_FILE_UPLOADED", "Nenhum arquivo foi enviado");
    }
    if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype)) {
      throw new AppError(400, "INVALID_FILE_TYPE", "Tipo de arquivo não suportado");
    }
    if (req.file.size > MAX_FILE_SIZE) {
      throw new AppError(400, "FILE_TOO_LARGE", "Arquivo excede o tamanho máximo de 5MB");
    }

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
            if (error) return reject(error);
            resolve(result!);
          },
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err: unknown) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ code: err.code, message: err.message });
      return;
    }
    next(err);
  }
};

export const uploadProfileImage = [upload.single("file"), handleUpload];
