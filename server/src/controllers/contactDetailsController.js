import { db } from '../config/firebase.js';
import admin from '../config/firebase.js';

const CONTACT_DOC_ID = 'details';

export const getContactDetails = async (req, res) => {
  try {
    const doc = await db.collection('contactDetails').doc(CONTACT_DOC_ID).get();

    if (!doc.exists) {
      // Initialize with default contact details if doesn't exist
      const defaultDetails = {
        email: 'mirfaizan8803@gmail.com',
        phone: '+91 XXX XXXXXXX',
        location: 'India',
        socialLinks: {
          github: 'https://github.com/mirfaizan8803',
          linkedin: '#',
          twitter: '#',
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      await db.collection('contactDetails').doc(CONTACT_DOC_ID).set(defaultDetails);
      return res.json({ success: true, data: defaultDetails });
    }

    res.json({ success: true, data: doc.data() });
  } catch (error) {
    console.error('Error fetching contact details:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch contact details' });
  }
};

export const updateContactDetails = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('contactDetails').doc(CONTACT_DOC_ID).set(updateData, { merge: true });

    res.json({ success: true, data: updateData });
  } catch (error) {
    console.error('Error updating contact details:', error);
    res.status(500).json({ success: false, error: 'Failed to update contact details' });
  }
};
