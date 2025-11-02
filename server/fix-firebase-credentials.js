/**
 * Firebase Credentials Fix Script
 * This script helps you validate and format your Firebase credentials correctly
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

console.log('\n🔍 Firebase Credentials Validator\n');
console.log('='.repeat(60));

// Check if serviceAccountKey.json exists
const serviceAccountPath = join(__dirname, 'src', 'config', 'serviceAccountKey.json');
let serviceAccount = null;

try {
  const fileContent = readFileSync(serviceAccountPath, 'utf8');
  serviceAccount = JSON.parse(fileContent);
  console.log('✅ Found serviceAccountKey.json file');
} catch (error) {
  console.log('❌ serviceAccountKey.json not found');
  console.log('📥 Please download it from:');
  console.log('   Firebase Console → Project Settings → Service Accounts → Generate New Private Key\n');
}

// Check environment variables
console.log('\n📋 Environment Variables Check:\n');

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

console.log(`FIREBASE_PROJECT_ID: ${projectId ? '✅ SET' : '❌ MISSING'}`);
if (projectId) console.log(`   Value: ${projectId}`);

console.log(`\nFIREBASE_CLIENT_EMAIL: ${clientEmail ? '✅ SET' : '❌ MISSING'}`);
if (clientEmail) console.log(`   Value: ${clientEmail}`);

console.log(`\nFIREBASE_PRIVATE_KEY: ${privateKey ? '✅ SET' : '❌ MISSING'}`);
if (privateKey) {
  console.log(`   Length: ${privateKey.length} characters`);

  // Check format
  const hasBegin = privateKey.includes('BEGIN PRIVATE KEY');
  const hasEnd = privateKey.includes('END PRIVATE KEY');
  const hasNewlines = privateKey.includes('\\n');
  const hasQuotes = privateKey.startsWith('"') || privateKey.startsWith("'");

  console.log(`   Has BEGIN marker: ${hasBegin ? '✅' : '❌'}`);
  console.log(`   Has END marker: ${hasEnd ? '✅' : '❌'}`);
  console.log(`   Has \\n newlines: ${hasNewlines ? '✅' : '❌'}`);
  console.log(`   Wrapped in quotes: ${hasQuotes ? '⚠️  (may cause issues)' : '✅'}`);

  // Try to parse it
  try {
    const cleanKey = privateKey.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');
    if (cleanKey.includes('-----BEGIN PRIVATE KEY-----') && cleanKey.includes('-----END PRIVATE KEY-----')) {
      console.log(`   Format: ✅ Valid`);
    } else {
      console.log(`   Format: ❌ Invalid - missing markers`);
    }
  } catch (error) {
    console.log(`   Format: ❌ Invalid - ${error.message}`);
  }
}

// If serviceAccount exists, show correct format
if (serviceAccount) {
  console.log('\n' + '='.repeat(60));
  console.log('\n✨ CORRECT FORMAT for your .env file:\n');
  console.log('Copy these lines to your server/.env file:\n');
  console.log('# Firebase Admin SDK');
  console.log(`FIREBASE_PROJECT_ID=${serviceAccount.project_id}`);
  console.log(`FIREBASE_CLIENT_EMAIL=${serviceAccount.client_email}`);

  // Format the private key correctly
  const privateKeyFormatted = serviceAccount.private_key
    .replace(/\n/g, '\\n'); // Replace actual newlines with \n

  console.log(`FIREBASE_PRIVATE_KEY="${privateKeyFormatted}"`);
  console.log('\n⚠️  IMPORTANT: Copy the ENTIRE line including quotes!');
  console.log('⚠️  The private key should be ONE line with \\n (not actual line breaks)');
}

console.log('\n' + '='.repeat(60));
console.log('\n🔧 Recommendations:\n');

if (!serviceAccount) {
  console.log('1. Download serviceAccountKey.json from Firebase Console');
  console.log('2. Place it in: server/src/config/serviceAccountKey.json');
  console.log('3. Run this script again to get the correct format');
} else if (!privateKey || !projectId || !clientEmail) {
  console.log('1. Copy the CORRECT FORMAT shown above');
  console.log('2. Paste it into your server/.env file');
  console.log('3. Restart your server');
} else {
  console.log('1. Your credentials are set, but may have formatting issues');
  console.log('2. Compare your .env with the CORRECT FORMAT above');
  console.log('3. Make sure the private key is wrapped in double quotes');
  console.log('4. Make sure \\n are literal backslash-n (not actual newlines)');
  console.log('5. Restart your server after fixing');
}

console.log('\n' + '='.repeat(60));

// Test Firebase Admin initialization
console.log('\n🧪 Testing Firebase Admin Initialization...\n');

try {
  const admin = await import('firebase-admin');

  if (admin.default.apps.length > 0) {
    console.log('✅ Firebase Admin is already initialized');
  } else {
    console.log('⚠️  Firebase Admin not initialized yet');
  }
} catch (error) {
  console.log('❌ Error testing Firebase Admin:', error.message);
}

console.log('\n✅ Validation complete!\n');
