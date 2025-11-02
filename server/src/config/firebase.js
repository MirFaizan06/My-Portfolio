import admin from './firebaseAdmin.js';

// Export Firestore database
export const db = admin.firestore();

// Export Firebase Auth
export const auth = admin.auth();

// Export Storage bucket
export const bucket = admin.storage().bucket();

export default admin;
