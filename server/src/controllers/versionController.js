import { db } from '../config/firebase.js';
import admin from '../config/firebase.js';

const VERSION_DOC_ID = 'current';

export const getVersion = async (req, res) => {
  try {
    const doc = await db.collection('version').doc(VERSION_DOC_ID).get();

    if (!doc.exists) {
      // Initialize with default version if doesn't exist
      const defaultVersion = {
        version: '1.0.0',
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      };
      await db.collection('version').doc(VERSION_DOC_ID).set(defaultVersion);
      return res.json({ success: true, data: { version: '1.0.0', lastUpdated: new Date().toISOString() } });
    }

    res.json({ success: true, data: doc.data() });
  } catch (error) {
    console.error('Error fetching version:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch version' });
  }
};

export const updateVersion = async (req, res) => {
  try {
    const { version } = req.body;

    if (!version) {
      return res.status(400).json({ success: false, error: 'Version is required' });
    }

    const versionData = {
      version,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('version').doc(VERSION_DOC_ID).set(versionData);

    res.json({ success: true, data: { version, lastUpdated: new Date().toISOString() } });
  } catch (error) {
    console.error('Error updating version:', error);
    res.status(500).json({ success: false, error: 'Failed to update version' });
  }
};
