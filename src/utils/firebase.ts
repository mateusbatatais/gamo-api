// src/utils/firebase.ts
import admin, { ServiceAccount } from "firebase-admin";
import { readFileSync } from "fs";
import { join } from "path";

// Carrega o JSON da chave
const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, "../../firebase-key.json"), "utf8")
) as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firebaseAuth = admin.auth();
