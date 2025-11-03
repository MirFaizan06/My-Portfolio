import { db } from '../config/firebase.js';
import admin from '../config/firebase.js';

const projectsCollection = db.collection('projects');

export const getAllProjects = async (req, res) => {
  try {
    const snapshot = await projectsCollection.orderBy('createdAt', 'desc').get();
    const projects = [];
    snapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    res.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch projects' });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const doc = await projectsCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch project' });
  }
};

export const createProject = async (req, res) => {
  try {
    const newProject = {
      ...req.body,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await projectsCollection.add(newProject);

    res.status(201).json({
      success: true,
      data: { id: docRef.id, ...newProject },
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ success: false, error: 'Failed to create project' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await projectsCollection.doc(req.params.id).update(updateData);

    res.json({
      success: true,
      data: { id: req.params.id, ...updateData },
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ success: false, error: 'Failed to update project' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await projectsCollection.doc(req.params.id).delete();
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ success: false, error: 'Failed to delete project' });
  }
};
