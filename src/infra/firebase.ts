import admin, { ServiceAccount } from "firebase-admin";
import path from "path";
import fs from "fs";

let serviceAccount: ServiceAccount;

const envVar = process.env.FIREBASE_SERVICE_ACCOUNT;

if (envVar) {
  try {
    // Tenta parsear JSON direto
    serviceAccount = JSON.parse(envVar);
  } catch {
    // Se falhar, assume que é base64
    const json = Buffer.from(envVar, "base64").toString("utf-8");
    serviceAccount = JSON.parse(json);
  }
} else {
  // Fallback para ambiente local: lê o arquivo
  const filePath = path.resolve(process.cwd(), "firebase-key.json");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  serviceAccount = JSON.parse(fileContents);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firebaseAuth = admin.auth();
