import { db } from '../config/firebase.js';

const servicesCollection = db.collection('services');

// Default services data
const defaultServices = [
  { service: 'Mobile App Development', priceUSD: 1500, turnaround: '3-4 weeks', isStartingPrice: true },
  { service: 'UI/UX Design', priceUSD: 300, turnaround: '3-5 days', isStartingPrice: false },
  { service: 'API Development', priceUSD: 500, turnaround: '1 week', isStartingPrice: false },
  { service: 'Database Design & Setup', priceUSD: 400, turnaround: '3-5 days', isStartingPrice: false },
  { service: 'E-commerce Integration', priceUSD: 800, turnaround: '1-2 weeks', isStartingPrice: false },
  { service: 'Performance Optimization', priceUSD: 350, turnaround: '2-3 days', isStartingPrice: false },
  { service: 'SEO & Analytics Setup', priceUSD: 250, turnaround: '2-3 days', isStartingPrice: false },
  { service: 'Monthly Maintenance', priceUSD: 200, turnaround: 'Ongoing', isMonthly: true },
];

export const getServices = async (req, res) => {
  try {
    const snapshot = await servicesCollection.get();

    if (snapshot.empty) {
      // Return default services if none exist in database
      return res.json({
        success: true,
        data: defaultServices,
      });
    }

    const services = [];
    snapshot.forEach((doc) => {
      services.push({ id: doc.id, ...doc.data() });
    });

    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch services',
    });
  }
};

export const createService = async (req, res) => {
  try {
    const { service, priceUSD, turnaround, isStartingPrice, isMonthly } = req.body;

    if (!service || !priceUSD || !turnaround) {
      return res.status(400).json({
        success: false,
        error: 'Service name, price, and turnaround are required',
      });
    }

    const newService = {
      service,
      priceUSD: parseFloat(priceUSD),
      turnaround,
      isStartingPrice: isStartingPrice || false,
      isMonthly: isMonthly || false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await servicesCollection.add(newService);

    res.status(201).json({
      success: true,
      data: { id: docRef.id, ...newService },
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create service',
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { service, priceUSD, turnaround, isStartingPrice, isMonthly } = req.body;

    const updateData = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    if (service) updateData.service = service;
    if (priceUSD) updateData.priceUSD = parseFloat(priceUSD);
    if (turnaround) updateData.turnaround = turnaround;
    if (typeof isStartingPrice !== 'undefined') updateData.isStartingPrice = isStartingPrice;
    if (typeof isMonthly !== 'undefined') updateData.isMonthly = isMonthly;

    await servicesCollection.doc(id).update(updateData);

    res.json({
      success: true,
      data: { id, ...updateData },
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update service',
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await servicesCollection.doc(id).delete();

    res.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete service',
    });
  }
};
