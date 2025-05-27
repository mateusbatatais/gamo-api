import admin, { ServiceAccount } from "firebase-admin";

let serviceAccount: ServiceAccount;

// Se você usou base64:
const raw = Buffer.from(
  process.env.FIREBASE_SERVICE_ACCOUNT!,
  "base64"
).toString();
serviceAccount = JSON.parse(raw);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firebaseAuth = admin.auth();
