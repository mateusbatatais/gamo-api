import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
        email: string;
      } & Partial<JwtPayload>;
      firebaseUser?: import("firebase-admin/auth").DecodedIdToken;
    }
  }
}
