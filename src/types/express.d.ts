// src/types/express.d.ts
import { DecodedIdToken } from "firebase-admin/auth";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
        role: string;
        email: string;
      };
      firebaseUser?: DecodedIdToken;
    }
  }
}
