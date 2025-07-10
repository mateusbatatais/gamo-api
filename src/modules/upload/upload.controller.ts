import { RequestHandler } from "express";
import multer from "multer";
import streamifier from "streamifier";
import { AppError } from "../../shared/errors";
import cloudinary, { CloudinaryUploadResponse } from "../../infra/cloudinary";

const upload = multer();

export const uploadProfileImage: RequestHandler[] = [
  upload.single("file"),
  async (req, res, next) => {
    try {
      if (!req.file) throw new AppError(400, "NO_FILE", "Nenhum arquivo enviado");

      // Verificar tipo MIME
      const validMimeTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validMimeTypes.includes(req.file.mimetype)) {
        throw new AppError(400, "INVALID_TYPE", "Tipo de arquivo inválido");
      }

      // Verificar tamanho
      if (req.file.size > 5 * 1024 * 1024) {
        throw new AppError(400, "FILE_TOO_LARGE", "Arquivo maior que 5MB");
      }

      const result = await new Promise<CloudinaryUploadResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "profiles",
            format: "jpg",
            transformation: [
              { width: 500, height: 500, crop: "limit" },
              { fetch_format: "auto", quality: "auto" },
            ],
          },
          (error, result) => (error ? reject(error) : resolve(result!)),
        );
        streamifier.createReadStream(req.file!.buffer).pipe(uploadStream);
      });

      res.json({
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (err) {
      next(err);
    }
  },
];

export const uploadCollectionImage: RequestHandler[] = [
  upload.single("file"),
  async (req, res, next) => {
    try {
      if (!req.file) throw new AppError(400, "NO_FILE", "Nenhum arquivo enviado");

      // Verificar tipo MIME
      const validMimeTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validMimeTypes.includes(req.file.mimetype)) {
        throw new AppError(400, "INVALID_TYPE", "Tipo de arquivo inválido");
      }

      // Verificar tamanho
      if (req.file.size > 5 * 1024 * 1024) {
        throw new AppError(400, "FILE_TOO_LARGE", "Arquivo maior que 5MB");
      }

      const result = await new Promise<CloudinaryUploadResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "collection",
            format: "jpg",
            transformation: [
              { width: 800, height: 800, crop: "limit" },
              { fetch_format: "auto", quality: "auto" },
            ],
          },
          (error, result) => (error ? reject(error) : resolve(result!)),
        );
        streamifier.createReadStream(req.file!.buffer).pipe(uploadStream);
      });

      res.json({
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (err) {
      next(err);
    }
  },
];
