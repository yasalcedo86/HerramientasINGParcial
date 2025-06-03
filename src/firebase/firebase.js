const admin = require("firebase-admin");
const serviceAccount = require("./testpca-3e7ab-firebase-adminsdk-fbsvc-15a61324e9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const database = admin.firestore();

module.exports = database;