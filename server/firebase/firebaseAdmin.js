import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

// Initialize Firebase Admin
let firebaseApp;

try {
  // Try to load service account key file first
  const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');
  let serviceAccount;

  try {
    serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
    console.log('📄 Loaded service account key from file');
  } catch (fileError) {
    console.log('📝 Service account file not found, trying environment variables...');
  }

  if (serviceAccount) {
    // Initialize with service account file
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: serviceAccount.project_id + '.appspot.com',
    });
    console.log('✅ Firebase Admin initialized successfully with service account file');
  } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
    // Fallback to environment variables
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
    console.log('✅ Firebase Admin initialized successfully with environment variables');
  } else {
    console.log('⚠️  Firebase Admin not initialized - missing credentials');
  }
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
