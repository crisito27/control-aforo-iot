import admin from "firebase-admin";

function getCredential() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON no configurado");
  const serviceAccount = JSON.parse(raw);
  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
  }
  return admin.credential.cert(serviceAccount);
}

export function getAdminDb() {
  if (!admin.apps.length) {
    admin.initializeApp({ credential: getCredential() });
  }
  return admin.firestore();
}
