// src/utils/firebase.ts
import admin, { ServiceAccount } from "firebase-admin";
import { readFileSync } from "fs";
import { join } from "path";

// Carrega o JSON da chave
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT!
) as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firebaseAuth = admin.auth();
