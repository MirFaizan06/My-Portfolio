import { db } from '../config/firebase.js';
import admin from '../config/firebase.js';

const pricingCollection = db.collection('pricing');

export const getAllPricing = async (req, res) => {
  try {
    // Fetch all pricing plans and sort by price (low to high)
    const snapshot = await pricingCollection.get();
    const pricing = [];
    snapshot.forEach((doc) => {
      pricing.push({ id: doc.id, ...doc.data() });
    });

    // Sort by price in ascending order (low to high)
    pricing.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    res.json({ success: true, data: pricing });
  } catch (error) {
    console.error('Error fetching pricing:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch pricing plans' });
  }
};

export const getPricingById = async (req, res) => {
  try {
    const doc = await pricingCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'Pricing plan not found' });
    }
    res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error('Error fetching pricing:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch pricing plan' });
  }
};

export const createPricing = async (req, res) => {
  try {
    const newPricing = {
      ...req.body,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await pricingCollection.add(newPricing);

    res.status(201).json({
      success: true,
      data: { id: docRef.id, ...newPricing },
    });
  } catch (error) {
    console.error('Error creating pricing:', error);
    res.status(500).json({ success: false, error: 'Failed to create pricing plan' });
  }
};

export const updatePricing = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await pricingCollection.doc(req.params.id).update(updateData);

    res.json({
      success: true,
      data: { id: req.params.id, ...updateData },
    });
  } catch (error) {
    console.error('Error updating pricing:', error);
    res.status(500).json({ success: false, error: 'Failed to update pricing plan' });
  }
};

export const deletePricing = async (req, res) => {
  try {
    await pricingCollection.doc(req.params.id).delete();
    res.json({ success: true, message: 'Pricing plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting pricing:', error);
    res.status(500).json({ success: false, error: 'Failed to delete pricing plan' });
  }
};
