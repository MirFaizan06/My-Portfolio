// In-memory storage for now (replace with Firestore later)
let pricingPlans = [];
let nextId = 1;

export const getAllPricing = async (req, res) => {
  try {
    res.json({ success: true, data: pricingPlans });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPricingById = async (req, res) => {
  try {
    const plan = pricingPlans.find(p => p.id === parseInt(req.params.id));
    if (!plan) {
      return res.status(404).json({ success: false, error: 'Pricing plan not found' });
    }
    res.json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createPricing = async (req, res) => {
  try {
    const plan = {
      id: nextId++,
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    pricingPlans.push(plan);
    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updatePricing = async (req, res) => {
  try {
    const index = pricingPlans.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Pricing plan not found' });
    }
    pricingPlans[index] = {
      ...pricingPlans[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };
    res.json({ success: true, data: pricingPlans[index] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deletePricing = async (req, res) => {
  try {
    const index = pricingPlans.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Pricing plan not found' });
    }
    pricingPlans.splice(index, 1);
    res.json({ success: true, message: 'Pricing plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
