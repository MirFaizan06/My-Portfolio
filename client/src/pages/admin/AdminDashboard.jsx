import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  DollarSign,
  FileText,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Upload,
} from 'lucide-react';
import { projectsAPI, pricingAPI, uploadAPI } from '../../utils/api';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsRes, pricingRes] = await Promise.all([
        projectsAPI.getAll(),
        pricingAPI.getAll(),
      ]);
      setProjects(projectsRes.data || []);
      setPricing(pricingRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadProgress(true);
    try {
      const response = await uploadAPI.uploadFile(file);
      alert(`File uploaded successfully! URL: ${response.data.url}`);
    } catch (error) {
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploadProgress(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAPI.delete(id);
      setProjects(projects.filter((p) => p.id !== id));
      alert('Project deleted successfully!');
    } catch (error) {
      alert(`Delete failed: ${error.message}`);
    }
  };

  const handleDeletePricing = async (id) => {
    if (!confirm('Are you sure you want to delete this pricing plan?')) return;

    try {
      await pricingAPI.delete(id);
      setPricing(pricing.filter((p) => p.id !== id));
      alert('Pricing plan deleted successfully!');
    } catch (error) {
      alert(`Delete failed: ${error.message}`);
    }
  };

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'projects', icon: FolderGit2, label: 'Projects' },
    { id: 'pricing', icon: DollarSign, label: 'Pricing' },
    { id: 'files', icon: FileText, label: 'Files' },
  ];

  return (
    <div
      className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      {/* Header */}
      <header
        className={`${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1
                className={`text-2xl font-bold gradient-text`}
              >
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {user?.email}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                <LogOut size={18} />
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? isDark
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <div>
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-xl ${
                  isDark ? 'glass-dark' : 'glass-light'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-lg font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Projects
                  </h3>
                  <FolderGit2
                    className={isDark ? 'text-cyan-400' : 'text-blue-600'}
                    size={24}
                  />
                </div>
                <p
                  className={`text-4xl font-bold ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`}
                >
                  {projects.length}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-6 rounded-xl ${
                  isDark ? 'glass-dark' : 'glass-light'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-lg font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Pricing Plans
                  </h3>
                  <DollarSign
                    className={isDark ? 'text-purple-400' : 'text-indigo-600'}
                    size={24}
                  />
                </div>
                <p
                  className={`text-4xl font-bold ${
                    isDark ? 'text-purple-400' : 'text-indigo-600'
                  }`}
                >
                  {pricing.length}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-6 rounded-xl ${
                  isDark ? 'glass-dark' : 'glass-light'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-lg font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Status
                  </h3>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isDark ? 'bg-green-400' : 'bg-green-500'
                    }`}
                  />
                </div>
                <p
                  className={`text-lg ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  All systems operational
                </p>
              </motion.div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Manage Projects
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isDark
                      ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Plus size={20} />
                  Add Project
                </motion.button>
              </div>

              {projects.length === 0 ? (
                <div
                  className={`text-center py-12 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  No projects yet. Add your first project!
                </div>
              ) : (
                <div className="grid gap-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`p-6 rounded-xl ${
                        isDark ? 'glass-dark' : 'glass-light'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3
                            className={`text-lg font-bold mb-2 ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {project.title}
                          </h3>
                          <p
                            className={`${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            {project.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className={`p-2 rounded-lg ${
                              isDark
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className={`p-2 rounded-lg ${
                              isDark
                                ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                                : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Manage Pricing
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isDark
                      ? 'bg-purple-500 text-white hover:bg-purple-600'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  <Plus size={20} />
                  Add Plan
                </motion.button>
              </div>

              {pricing.length === 0 ? (
                <div
                  className={`text-center py-12 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  No pricing plans yet. Add your first plan!
                </div>
              ) : (
                <div className="grid gap-4">
                  {pricing.map((plan) => (
                    <div
                      key={plan.id}
                      className={`p-6 rounded-xl ${
                        isDark ? 'glass-dark' : 'glass-light'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3
                            className={`text-lg font-bold mb-2 ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {plan.name} - ${plan.price}
                          </h3>
                          <p
                            className={`${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            {plan.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className={`p-2 rounded-lg ${
                              isDark
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeletePricing(plan.id)}
                            className={`p-2 rounded-lg ${
                              isDark
                                ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                                : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Files Tab */}
          {activeTab === 'files' && (
            <div>
              <h2
                className={`text-2xl font-bold mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                File Upload
              </h2>

              <div
                className={`p-8 rounded-xl border-2 border-dashed text-center ${
                  isDark
                    ? 'border-gray-700 bg-gray-800/50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <Upload
                  className={`mx-auto mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                  size={48}
                />
                <p
                  className={`mb-4 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Upload images, PDFs, or other files
                </p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  disabled={uploadProgress}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg cursor-pointer ${
                    uploadProgress
                      ? isDark
                        ? 'bg-gray-700 text-gray-500'
                        : 'bg-gray-300 text-gray-500'
                      : isDark
                      ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {uploadProgress ? 'Uploading...' : 'Choose File'}
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
