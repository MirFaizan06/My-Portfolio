const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token && !options.skipAuth) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Projects API
export const projectsAPI = {
  getAll: () => apiCall('/projects', { skipAuth: true }),
  getById: (id) => apiCall(`/projects/${id}`, { skipAuth: true }),
  create: (data) => apiCall('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/projects/${id}`, { method: 'DELETE' }),
};

// Pricing API
export const pricingAPI = {
  getAll: () => apiCall('/pricing', { skipAuth: true }),
  getById: (id) => apiCall(`/pricing/${id}`, { skipAuth: true }),
  create: (data) => apiCall('/pricing', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/pricing/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/pricing/${id}`, { method: 'DELETE' }),
};

// Auth API
export const authAPI = {
  googleLogin: (token) => apiCall('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ token }),
    skipAuth: true,
  }),
  verify: () => apiCall('/auth/verify'),
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};

// Upload API
export const uploadAPI = {
  uploadFile: async (file) => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Upload failed');
    }

    return data;
  },
  deleteFile: (filename) => apiCall(`/upload/${filename}`, { method: 'DELETE' }),
};

// Version API
export const versionAPI = {
  get: () => apiCall('/version', { skipAuth: true }),
  update: (version) => apiCall('/version', {
    method: 'POST',
    body: JSON.stringify({ version }),
  }),
};

// Services API
export const servicesAPI = {
  getAll: () => apiCall('/services', { skipAuth: true }),
  create: (data) => apiCall('/services', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/services/${id}`, { method: 'DELETE' }),
};

// Resume API
export const resumeAPI = {
  // Experience
  getAllExperiences: () => apiCall('/resume/experiences', { skipAuth: true }),
  getExperience: (id) => apiCall(`/resume/experiences/${id}`, { skipAuth: true }),
  createExperience: (data) => apiCall('/resume/experiences', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateExperience: (id, data) => apiCall(`/resume/experiences/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteExperience: (id) => apiCall(`/resume/experiences/${id}`, { method: 'DELETE' }),

  // Education
  getAllEducation: () => apiCall('/resume/education', { skipAuth: true }),
  createEducation: (data) => apiCall('/resume/education', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateEducation: (id, data) => apiCall(`/resume/education/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteEducation: (id) => apiCall(`/resume/education/${id}`, { method: 'DELETE' }),

  // Skills
  getAllSkills: () => apiCall('/resume/skills', { skipAuth: true }),
  createSkill: (data) => apiCall('/resume/skills', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateSkill: (id, data) => apiCall(`/resume/skills/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteSkill: (id) => apiCall(`/resume/skills/${id}`, { method: 'DELETE' }),

  // Certifications
  getAllCertifications: () => apiCall('/resume/certifications', { skipAuth: true }),
  createCertification: (data) => apiCall('/resume/certifications', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateCertification: (id, data) => apiCall(`/resume/certifications/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteCertification: (id) => apiCall(`/resume/certifications/${id}`, { method: 'DELETE' }),
};

// Contact API (placeholder for future email implementation)
export const contactAPI = {
  sendMessage: async (data) => {
    // TODO: Implement email sending endpoint
    console.log('Contact form data:', data);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Message sent successfully' });
      }, 1000);
    });
  },
};

export default {
  projects: projectsAPI,
  pricing: pricingAPI,
  auth: authAPI,
  upload: uploadAPI,
  version: versionAPI,
  contact: contactAPI,
  services: servicesAPI,
  resume: resumeAPI,
};
