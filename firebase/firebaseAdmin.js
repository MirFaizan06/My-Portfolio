import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config({ path: '../server/.env' });

// Initialize Firebase Admin
let firebaseApp;

try {
  // Initialize with environment variables
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });

    console.log('✅ Firebase Admin initialized successfully');
  } else {
    console.log('⚠️  Firebase Admin not initialized - missing environment variables');
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
