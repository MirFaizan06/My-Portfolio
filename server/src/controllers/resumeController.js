import { db } from '../config/firebase.js';

// Get all resume experiences
export const getAllExperiences = async (req, res) => {
  try {
    const snapshot = await db.collection('resume_experiences')
      .orderBy('order', 'asc')
      .get();

    const experiences = [];
    snapshot.forEach(doc => {
      experiences.push({ id: doc.id, ...doc.data() });
    });

    res.json({ success: true, data: experiences });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch experiences', error: error.message });
  }
};

// Get single experience
export const getExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('resume_experiences').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }

    res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch experience', error: error.message });
  }
};

// Create new experience
export const createExperience = async (req, res) => {
  try {
    const { title, company, period, description, achievements, order } = req.body;

    // Validation
    if (!title || !company || !period || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, company, period, and description are required'
      });
    }

    const experienceData = {
      title,
      company,
      period,
      description,
      achievements: achievements || [],
      order: order || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await db.collection('resume_experiences').add(experienceData);

    res.status(201).json({
      success: true,
      message: 'Experience created successfully',
      data: { id: docRef.id, ...experienceData }
    });
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({ success: false, message: 'Failed to create experience', error: error.message });
  }
};

// Update experience
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, company, period, description, achievements, order } = req.body;

    const experienceRef = db.collection('resume_experiences').doc(id);
    const doc = await experienceRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }

    const updateData = {
      ...(title && { title }),
      ...(company && { company }),
      ...(period && { period }),
      ...(description && { description }),
      ...(achievements !== undefined && { achievements }),
      ...(order !== undefined && { order }),
      updatedAt: new Date().toISOString()
    };

    await experienceRef.update(updateData);

    res.json({
      success: true,
      message: 'Experience updated successfully',
      data: { id, ...doc.data(), ...updateData }
    });
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ success: false, message: 'Failed to update experience', error: error.message });
  }
};

// Delete experience
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experienceRef = db.collection('resume_experiences').doc(id);
    const doc = await experienceRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }

    await experienceRef.delete();

    res.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ success: false, message: 'Failed to delete experience', error: error.message });
  }
};

// ========== EDUCATION ==========

// Get all education
export const getAllEducation = async (req, res) => {
  try {
    const snapshot = await db.collection('resume_education')
      .orderBy('order', 'asc')
      .get();

    const education = [];
    snapshot.forEach(doc => {
      education.push({ id: doc.id, ...doc.data() });
    });

    res.json({ success: true, data: education });
  } catch (error) {
    console.error('Error fetching education:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch education', error: error.message });
  }
};

// Create education
export const createEducation = async (req, res) => {
  try {
    const { degree, school, period, achievements, order } = req.body;

    if (!degree || !school || !period) {
      return res.status(400).json({
        success: false,
        message: 'Degree, school, and period are required'
      });
    }

    const educationData = {
      degree,
      school,
      period,
      achievements: achievements || [],
      order: order || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await db.collection('resume_education').add(educationData);

    res.status(201).json({
      success: true,
      message: 'Education created successfully',
      data: { id: docRef.id, ...educationData }
    });
  } catch (error) {
    console.error('Error creating education:', error);
    res.status(500).json({ success: false, message: 'Failed to create education', error: error.message });
  }
};

// Update education
export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { degree, school, period, achievements, order } = req.body;

    const educationRef = db.collection('resume_education').doc(id);
    const doc = await educationRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }

    const updateData = {
      ...(degree && { degree }),
      ...(school && { school }),
      ...(period && { period }),
      ...(achievements !== undefined && { achievements }),
      ...(order !== undefined && { order }),
      updatedAt: new Date().toISOString()
    };

    await educationRef.update(updateData);

    res.json({
      success: true,
      message: 'Education updated successfully',
      data: { id, ...doc.data(), ...updateData }
    });
  } catch (error) {
    console.error('Error updating education:', error);
    res.status(500).json({ success: false, message: 'Failed to update education', error: error.message });
  }
};

// Delete education
export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const educationRef = db.collection('resume_education').doc(id);
    const doc = await educationRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }

    await educationRef.delete();

    res.json({ success: true, message: 'Education deleted successfully' });
  } catch (error) {
    console.error('Error deleting education:', error);
    res.status(500).json({ success: false, message: 'Failed to delete education', error: error.message });
  }
};

// ========== SKILLS ==========

// Get all skills
export const getAllSkills = async (req, res) => {
  try {
    const snapshot = await db.collection('resume_skills')
      .orderBy('order', 'asc')
      .get();

    const skills = [];
    snapshot.forEach(doc => {
      skills.push({ id: doc.id, ...doc.data() });
    });

    res.json({ success: true, data: skills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch skills', error: error.message });
  }
};

// Create skill category
export const createSkill = async (req, res) => {
  try {
    const { category, items, order } = req.body;

    if (!category || !items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Category and items array are required'
      });
    }

    const skillData = {
      category,
      items,
      order: order || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await db.collection('resume_skills').add(skillData);

    res.status(201).json({
      success: true,
      message: 'Skill category created successfully',
      data: { id: docRef.id, ...skillData }
    });
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({ success: false, message: 'Failed to create skill', error: error.message });
  }
};

// Update skill category
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, items, order } = req.body;

    const skillRef = db.collection('resume_skills').doc(id);
    const doc = await skillRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    const updateData = {
      ...(category && { category }),
      ...(items && { items }),
      ...(order !== undefined && { order }),
      updatedAt: new Date().toISOString()
    };

    await skillRef.update(updateData);

    res.json({
      success: true,
      message: 'Skill updated successfully',
      data: { id, ...doc.data(), ...updateData }
    });
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ success: false, message: 'Failed to update skill', error: error.message });
  }
};

// Delete skill category
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skillRef = db.collection('resume_skills').doc(id);
    const doc = await skillRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    await skillRef.delete();

    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ success: false, message: 'Failed to delete skill', error: error.message });
  }
};

// ========== CERTIFICATIONS ==========

// Get all certifications
export const getAllCertifications = async (req, res) => {
  try {
    const snapshot = await db.collection('resume_certifications')
      .orderBy('order', 'asc')
      .get();

    const certifications = [];
    snapshot.forEach(doc => {
      certifications.push({ id: doc.id, ...doc.data() });
    });

    res.json({ success: true, data: certifications });
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch certifications', error: error.message });
  }
};

// Create certification
export const createCertification = async (req, res) => {
  try {
    const { name, issuer, date, pdfUrl, order } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Certification name is required'
      });
    }

    const certificationData = {
      name,
      issuer: issuer || '',
      date: date || '',
      pdfUrl: pdfUrl || '',
      order: order || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await db.collection('resume_certifications').add(certificationData);

    res.status(201).json({
      success: true,
      message: 'Certification created successfully',
      data: { id: docRef.id, ...certificationData }
    });
  } catch (error) {
    console.error('Error creating certification:', error);
    res.status(500).json({ success: false, message: 'Failed to create certification', error: error.message });
  }
};

// Update certification
export const updateCertification = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, issuer, date, pdfUrl, order } = req.body;

    const certificationRef = db.collection('resume_certifications').doc(id);
    const doc = await certificationRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }

    const updateData = {
      ...(name && { name }),
      ...(issuer !== undefined && { issuer }),
      ...(date !== undefined && { date }),
      ...(pdfUrl !== undefined && { pdfUrl }),
      ...(order !== undefined && { order }),
      updatedAt: new Date().toISOString()
    };

    await certificationRef.update(updateData);

    res.json({
      success: true,
      message: 'Certification updated successfully',
      data: { id, ...doc.data(), ...updateData }
    });
  } catch (error) {
    console.error('Error updating certification:', error);
    res.status(500).json({ success: false, message: 'Failed to update certification', error: error.message });
  }
};

// Delete certification
export const deleteCertification = async (req, res) => {
  try {
    const { id } = req.params;

    const certificationRef = db.collection('resume_certifications').doc(id);
    const doc = await certificationRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }

    await certificationRef.delete();

    res.json({ success: true, message: 'Certification deleted successfully' });
  } catch (error) {
    console.error('Error deleting certification:', error);
    res.status(500).json({ success: false, message: 'Failed to delete certification', error: error.message });
  }
};
