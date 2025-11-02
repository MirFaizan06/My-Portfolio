import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  X,
  Save,
  Image as ImageIcon,
  Calendar,
  TrendingUp,
  ExternalLink,
  Github,
  CheckCircle2,
  Briefcase,
} from 'lucide-react';
import { projectsAPI, pricingAPI, uploadAPI } from '../../utils/api';
import Modal from '../../components/Modal';
import Notification from '../../components/Notification';
import ResumeManagement from '../../components/admin/ResumeManagement';
import ConfirmDialog from '../../components/ConfirmDialog';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingPricing, setEditingPricing] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [dialog, setDialog] = useState({ isOpen: false, type: 'confirm', title: '', message: '', onConfirm: null });
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    category: 'personal',
  });
  const [pricingForm, setPricingForm] = useState({
    name: '',
    price: '',
    period: 'project',
    description: '',
    features: '',
  });

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
      showNotification('Error fetching data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 4000);
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
      showNotification(`File uploaded successfully! URL: ${response.data.url}`, 'success');
    } catch (error) {
      showNotification(`Upload failed: ${error.message}`, 'error');
    } finally {
      setUploadProgress(false);
    }
  };

  const handleDeleteProject = (id) => {
    setDialog({
      isOpen: true,
      type: 'confirm',
      title: 'Delete Project',
      message: 'Are you sure you want to delete this project? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await projectsAPI.delete(id);
          setProjects(projects.filter((p) => p.id !== id));
          showNotification('Project deleted successfully!', 'success');
        } catch (error) {
          showNotification(`Delete failed: ${error.message}`, 'error');
        }
      }
    });
  };

  const handleDeletePricing = (id) => {
    setDialog({
      isOpen: true,
      type: 'confirm',
      title: 'Delete Pricing Plan',
      message: 'Are you sure you want to delete this pricing plan? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await pricingAPI.delete(id);
          setPricing(pricing.filter((p) => p.id !== id));
          showNotification('Pricing plan deleted successfully!', 'success');
        } catch (error) {
          showNotification(`Delete failed: ${error.message}`, 'error');
        }
      }
    });
  };

  const openProjectModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        title: project.title || '',
        description: project.description || '',
        image: project.image || '',
        technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        category: project.category || 'personal',
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        description: '',
        image: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
        category: 'personal',
      });
    }
    setShowProjectModal(true);
  };

  const openPricingModal = (plan = null) => {
    if (plan) {
      setEditingPricing(plan);
      setPricingForm({
        name: plan.name || '',
        price: plan.price || '',
        period: plan.period || 'project',
        description: plan.description || '',
        features: Array.isArray(plan.features) ? plan.features.join('\n') : '',
      });
    } else {
      setEditingPricing(null);
      setPricingForm({
        name: '',
        price: '',
        period: 'project',
        description: '',
        features: '',
      });
    }
    setShowPricingModal(true);
  };

  const handleSaveProject = async () => {
    try {
      const projectData = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (editingProject) {
        await projectsAPI.update(editingProject.id, projectData);
        showNotification('Project updated successfully!', 'success');
      } else {
        await projectsAPI.create(projectData);
        showNotification('Project created successfully!', 'success');
      }

      setShowProjectModal(false);
      fetchData();
    } catch (error) {
      showNotification(`Failed to save project: ${error.message}`, 'error');
    }
  };

  const handleSavePricing = async () => {
    try {
      const pricingData = {
        ...pricingForm,
        features: pricingForm.features.split('\n').map(f => f.trim()).filter(Boolean),
      };

      if (editingPricing) {
        await pricingAPI.update(editingPricing.id, pricingData);
        showNotification('Pricing plan updated successfully!', 'success');
      } else {
        await pricingAPI.create(pricingData);
        showNotification('Pricing plan created successfully!', 'success');
      }

      setShowPricingModal(false);
      fetchData();
    } catch (error) {
      showNotification(`Failed to save pricing plan: ${error.message}`, 'error');
    }
  };

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'projects', icon: FolderGit2, label: 'Projects' },
    { id: 'pricing', icon: DollarSign, label: 'Pricing' },
    { id: 'resume', icon: Briefcase, label: 'Resume' },
    { id: 'files', icon: FileText, label: 'Files' },
  ];

  const StatCard = ({ title, value, icon: Icon, color, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`p-6 rounded-2xl shadow-lg ${
        isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-white border border-gray-100'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
      <p className={`text-4xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {value}
      </p>
    </motion.div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Notification */}
      <Notification
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ show: false, message: '', type: '' })}
      />

      {/* Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md ${
          isDark ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
        } border-b shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <LayoutDashboard className="text-cyan-500" size={28} />
              </motion.div>
              <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {user?.email}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  isDark
                    ? 'bg-gradient-to-r from-red-900/30 to-red-800/30 text-red-400 hover:from-red-900/50 hover:to-red-800/50 border border-red-700'
                    : 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 hover:from-red-100 hover:to-red-200 border border-red-200'
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
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all shadow-md ${
                activeTab === tab.id
                  ? isDark
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Total Projects"
                  value={projects.length}
                  icon={FolderGit2}
                  color="from-cyan-500 to-blue-600"
                  delay={0}
                />
                <StatCard
                  title="Pricing Plans"
                  value={pricing.length}
                  icon={DollarSign}
                  color="from-purple-500 to-pink-600"
                  delay={0.1}
                />
                <StatCard
                  title="Status"
                  value="Active"
                  icon={TrendingUp}
                  color="from-green-500 to-emerald-600"
                  delay={0.2}
                />
              </div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openProjectModal()}
                    className={`flex items-center gap-3 p-4 rounded-xl font-medium transition-all ${
                      isDark
                        ? 'bg-gradient-to-br from-cyan-900/30 to-blue-900/30 hover:from-cyan-900/50 hover:to-blue-900/50 text-cyan-400 border border-cyan-700'
                        : 'bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 text-blue-700 border border-blue-200'
                    } shadow-md`}
                  >
                    <Plus size={24} />
                    <span>Add New Project</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openPricingModal()}
                    className={`flex items-center gap-3 p-4 rounded-xl font-medium transition-all ${
                      isDark
                        ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 hover:from-purple-900/50 hover:to-pink-900/50 text-purple-400 border border-purple-700'
                        : 'bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-700 border border-purple-200'
                    } shadow-md`}
                  >
                    <Plus size={24} />
                    <span>Add Pricing Plan</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('files')}
                    className={`flex items-center gap-3 p-4 rounded-xl font-medium transition-all ${
                      isDark
                        ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 hover:from-green-900/50 hover:to-emerald-900/50 text-green-400 border border-green-700'
                        : 'bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-700 border border-green-200'
                    } shadow-md`}
                  >
                    <Upload size={24} />
                    <span>Upload Files</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Manage Projects
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openProjectModal()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow-lg ${
                    isDark
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/25'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/25'
                  }`}
                >
                  <Plus size={20} />
                  Add Project
                </motion.button>
              </div>

              {loading ? (
                <div className="grid gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-32 rounded-xl animate-pulse ${
                        isDark ? 'bg-gray-800' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              ) : projects.length === 0 ? (
                <div
                  className={`text-center py-12 rounded-xl ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <FolderGit2
                    className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
                    size={48}
                  />
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    No projects yet. Add your first project!
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -2 }}
                      className={`p-6 rounded-xl shadow-md ${
                        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-2">
                            {project.image && (
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <h3
                                className={`text-lg font-bold mb-1 ${
                                  isDark ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {project.title}
                              </h3>
                              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                                {project.description}
                              </p>
                              {project.technologies && (
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.map((tech, i) => (
                                    <span
                                      key={i}
                                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                        isDark
                                          ? 'bg-cyan-900/30 text-cyan-400'
                                          : 'bg-blue-100 text-blue-700'
                                      }`}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`p-2 rounded-lg transition-colors ${
                                isDark
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              <Github size={18} />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`p-2 rounded-lg transition-colors ${
                                isDark
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                          <button
                            onClick={() => openProjectModal(project)}
                            className={`p-2 rounded-lg transition-colors ${
                              isDark
                                ? 'bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50'
                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                            }`}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              isDark
                                ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                                : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Manage Pricing
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openPricingModal()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow-lg ${
                    isDark
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-purple-500/25'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/25'
                  }`}
                >
                  <Plus size={20} />
                  Add Plan
                </motion.button>
              </div>

              {loading ? (
                <div className="grid gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-32 rounded-xl animate-pulse ${
                        isDark ? 'bg-gray-800' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              ) : pricing.length === 0 ? (
                <div
                  className={`text-center py-12 rounded-xl ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <DollarSign
                    className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
                    size={48}
                  />
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    No pricing plans yet. Add your first plan!
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {pricing.map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -2 }}
                      className={`p-6 rounded-xl shadow-md ${
                        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3
                            className={`text-xl font-bold mb-2 ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {plan.name}
                          </h3>
                          <p
                            className={`text-2xl font-bold mb-2 ${
                              isDark ? 'text-purple-400' : 'text-indigo-600'
                            }`}
                          >
                            ${plan.price}
                            <span className={`text-sm font-normal ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              /{plan.period}
                            </span>
                          </p>
                          <p className={`mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {plan.description}
                          </p>
                          {plan.features && plan.features.length > 0 && (
                            <div className="space-y-2">
                              {plan.features.slice(0, 3).map((feature, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <CheckCircle2
                                    className={isDark ? 'text-cyan-400' : 'text-blue-600'}
                                    size={16}
                                  />
                                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {feature}
                                  </span>
                                </div>
                              ))}
                              {plan.features.length > 3 && (
                                <p className={`text-sm italic ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                  + {plan.features.length - 3} more features
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openPricingModal(plan)}
                            className={`p-2 rounded-lg transition-colors ${
                              isDark
                                ? 'bg-purple-900/30 text-purple-400 hover:bg-purple-900/50'
                                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                            }`}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeletePricing(plan.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              isDark
                                ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                                : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'resume' && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Manage Resume
              </h2>
              <ResumeManagement isDark={isDark} />
            </motion.div>
          )}

          {activeTab === 'files' && (
            <motion.div
              key="files"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                File Upload
              </h2>

              <div
                className={`p-12 rounded-2xl border-2 border-dashed text-center transition-all ${
                  isDark
                    ? 'border-gray-700 bg-gray-800/50 hover:border-cyan-500 hover:bg-gray-800'
                    : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/50'
                }`}
              >
                <Upload
                  className={`mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                  size={64}
                />
                <p className={`mb-2 text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  Upload images, PDFs, or other files
                </p>
                <p className={`mb-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Drag and drop or click to select files
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
                  className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl cursor-pointer font-medium transition-all shadow-lg ${
                    uploadProgress
                      ? isDark
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : isDark
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-cyan-500/25'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25'
                  }`}
                >
                  <ImageIcon size={20} />
                  {uploadProgress ? 'Uploading...' : 'Choose File'}
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project Modal */}
      <Modal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        title={editingProject ? 'Edit Project' : 'Add New Project'}
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Project Title *
            </label>
            <input
              type="text"
              value={projectForm.title}
              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                isDark ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
              }`}
              placeholder="My Awesome Project"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Description *
            </label>
            <textarea
              value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              rows={3}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                isDark ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
              }`}
              placeholder="A brief description of the project"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Image URL
            </label>
            <input
              type="text"
              value={projectForm.image}
              onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                isDark ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
              }`}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              value={projectForm.technologies}
              onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                isDark ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
              }`}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                GitHub URL
              </label>
              <input
                type="text"
                value={projectForm.githubUrl}
                onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  isDark ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
                }`}
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Live URL
              </label>
              <input
                type="text"
                value={projectForm.liveUrl}
                onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  isDark ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
                }`}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Category
            </label>
            <select
              value={projectForm.category}
              onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                isDark ? 'focus:ring-cyan-500' : 'focus:ring-blue-500'
              }`}
            >
              <option value="personal">Personal</option>
              <option value="client">Client</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveProject}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium ${
                isDark
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
              } shadow-lg`}
            >
              <Save size={20} />
              Save Project
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowProjectModal(false)}
              className={`px-6 py-3 rounded-xl font-medium ${
                isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Pricing Modal */}
      <Modal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        title={editingPricing ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Plan Name *
            </label>
            <input
              type="text"
              value={pricingForm.name}
              onChange={(e) => setPricingForm({ ...pricingForm, name: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                isDark ? 'focus:ring-purple-500' : 'focus:ring-indigo-500'
              }`}
              placeholder="Professional"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Price (USD) *
              </label>
              <input
                type="number"
                value={pricingForm.price}
                onChange={(e) => setPricingForm({ ...pricingForm, price: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  isDark ? 'focus:ring-purple-500' : 'focus:ring-indigo-500'
                }`}
                placeholder="999"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Period
              </label>
              <select
                value={pricingForm.period}
                onChange={(e) => setPricingForm({ ...pricingForm, period: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  isDark ? 'focus:ring-purple-500' : 'focus:ring-indigo-500'
                }`}
              >
                <option value="project">Per Project</option>
                <option value="month">Per Month</option>
                <option value="year">Per Year</option>
              </select>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Description *
            </label>
            <textarea
              value={pricingForm.description}
              onChange={(e) => setPricingForm({ ...pricingForm, description: e.target.value })}
              rows={2}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                isDark ? 'focus:ring-purple-500' : 'focus:ring-indigo-500'
              }`}
              placeholder="Perfect for business websites and web apps"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Features (one per line) *
            </label>
            <textarea
              value={pricingForm.features}
              onChange={(e) => setPricingForm({ ...pricingForm, features: e.target.value })}
              rows={6}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                isDark ? 'focus:ring-purple-500' : 'focus:ring-indigo-500'
              }`}
              placeholder="Multi-Page Application&#10;Custom Design & Animation&#10;Advanced SEO & Analytics"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSavePricing}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium ${
                isDark
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
              } shadow-lg`}
            >
              <Save size={20} />
              Save Plan
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPricingModal(false)}
              className={`px-6 py-3 rounded-xl font-medium ${
                isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={dialog.isOpen}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
        onConfirm={dialog.onConfirm}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
        confirmText={dialog.type === 'success' || dialog.type === 'error' || dialog.type === 'info' ? 'OK' : 'Confirm'}
        showCancel={dialog.showCancel !== false}
      />
    </div>
  );
};

export default AdminDashboard;
