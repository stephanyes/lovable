const admin = require("firebase-admin");
const serviceAccount = require("../services/config.json");
const service = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lovable-qr.firebaseio.com"
});
const settings = { timestampsInSnapshots: true };
const firestore = admin.firestore().settings(settings);
exports.firestore = firestore;
exports.admin = service;
