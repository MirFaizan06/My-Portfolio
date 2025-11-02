import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let firebaseApp;

// Check if Firebase Admin is already initialized
if (admin.apps.length === 0) {
  try {
    // Try to use service account file if it exists
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

    if (serviceAccountPath) {
      console.log('📄 Attempting to load service account from file...');
      const serviceAccount = JSON.parse(
        readFileSync(join(__dirname, '../../..', serviceAccountPath), 'utf8')
      );

      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });

      console.log('✅ Firebase Admin initialized with service account file');
    } else {
      // Use environment variables
      console.log('🔧 Initializing Firebase Admin with environment variables...');

      let privateKey = process.env.FIREBASE_PRIVATE_KEY;

      if (!privateKey || !process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL) {
        throw new Error(
          'Missing Firebase Admin credentials. Please set FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID, and FIREBASE_CLIENT_EMAIL in .env'
        );
      }

      // Handle different private key formats
      // Remove quotes if the key is wrapped in quotes
      privateKey = privateKey.replace(/^["']|["']$/g, '');
      // Replace literal \n with actual newlines
      privateKey = privateKey.replace(/\\n/g, '\n');

      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });

      console.log('✅ Firebase Admin initialized with environment variables');
    }

    console.log('📍 Project ID:', admin.app().options.credential.projectId);
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin:', error.message);
    console.error('💡 Make sure your .env file has the correct Firebase Admin credentials');
    process.exit(1);
  }
} else {
  console.log('ℹ️  Firebase Admin already initialized');
  firebaseApp = admin.app();
}

// Storage bucket reference
export const bucket = () => {
  return admin.storage().bucket();
};

export default admin;
