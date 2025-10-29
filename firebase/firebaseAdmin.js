import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Firebase Admin
let firebaseApp;

try {
  // Load service account key from file
  // TODO: Replace with your actual service account key path
  // const serviceAccount = JSON.parse(
  //   readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8')
  // );

  // For now, initialize without credentials (you'll need to add your Firebase project config)
  // firebaseApp = admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  //   storageBucket: 'your-project-id.appspot.com',
  // });

  console.log('⚠️  Firebase Admin not initialized. Please add your service account key.');
  console.log('📝 Instructions:');
  console.log('1. Go to Firebase Console > Project Settings > Service Accounts');
  console.log('2. Click "Generate New Private Key"');
  console.log('3. Save the JSON file as "serviceAccountKey.json" in the firebase folder');
  console.log('4. Uncomment the initialization code above');

} catch (error) {
  console.error('❌ Error initializing Firebase Admin:', error.message);
}

// Storage bucket reference
export const bucket = () => {
  if (!firebaseApp) {
    throw new Error('Firebase Admin is not initialized');
  }
  return admin.storage().bucket();
};

// Firestore reference
export const db = () => {
  if (!firebaseApp) {
    throw new Error('Firebase Admin is not initialized');
  }
  return admin.firestore();
};

// Auth reference
export const auth = () => {
  if (!firebaseApp) {
    throw new Error('Firebase Admin is not initialized');
  }
  return admin.auth();
};

export default admin;
