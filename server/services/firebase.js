const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require("./x-react-87a4d-firebase-adminsdk-uc02w-816ce718f1.json");

initializeApp({
  credential: cert(serviceAccount)
});

module.exports = getFirestore();
