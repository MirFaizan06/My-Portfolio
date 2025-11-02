import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Code, Award, Plus, Edit2, Trash2, X, Upload, FileText } from 'lucide-react';
import { resumeAPI, uploadAPI } from '../../utils/api';
import ConfirmDialog from '../ConfirmDialog';

const ResumeManagement = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState('experience');
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [currentItem, setCurrentItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dialog, setDialog] = useState({ isOpen: false, type: 'confirm', title: '', message: '', onConfirm: null });

  // Fetch all resume data
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [expRes, eduRes, skillsRes, certsRes] = await Promise.all([
        resumeAPI.getAllExperiences(),
        resumeAPI.getAllEducation(),
        resumeAPI.getAllSkills(),
        resumeAPI.getAllCertifications(),
      ]);

      setExperiences(expRes.data || []);
      setEducation(eduRes.data || []);
      setSkills(skillsRes.data || []);
      setCertifications(certsRes.data || []);
    } catch (error) {
      console.error('Error fetching resume data:', error);
      setDialog({
        isOpen: true,
        type: 'error',
        title: 'Failed to Load Data',
        message: 'Failed to fetch resume data. Please refresh the page.',
        onConfirm: null,
        showCancel: false
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setModalMode('create');
    setCurrentItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalMode('edit');
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleDelete = (type, id) => {
    setDialog({
      isOpen: true,
      type: 'confirm',
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      onConfirm: async () => {
        try {
          switch (type) {
            case 'experience':
              await resumeAPI.deleteExperience(id);
              setExperiences(experiences.filter(e => e.id !== id));
              break;
            case 'education':
              await resumeAPI.deleteEducation(id);
              setEducation(education.filter(e => e.id !== id));
              break;
            case 'skills':
              await resumeAPI.deleteSkill(id);
              setSkills(skills.filter(s => s.id !== id));
              break;
            case 'certifications':
              await resumeAPI.deleteCertification(id);
              setCertifications(certifications.filter(c => c.id !== id));
              break;
          }
          setDialog({
            isOpen: true,
            type: 'success',
            title: 'Deleted Successfully',
            message: 'The item has been deleted.',
            onConfirm: null,
            showCancel: false
          });
        } catch (error) {
          console.error('Error deleting:', error);
          setDialog({
            isOpen: true,
            type: 'error',
            title: 'Delete Failed',
            message: error.message || 'Failed to delete item. Please try again.',
            onConfirm: null,
            showCancel: false
          });
        }
      }
    });
  };

  const tabs = [
    { id: 'experience', label: 'Experience', icon: Briefcase, data: experiences },
    { id: 'education', label: 'Education', icon: GraduationCap, data: education },
    { id: 'skills', label: 'Skills', icon: Code, data: skills },
    { id: 'certifications', label: 'Certifications', icon: Award, data: certifications },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? isDark
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : isDark
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <tab.icon size={20} />
            {tab.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.id
                ? 'bg-white/20'
                : isDark
                ? 'bg-gray-700'
                : 'bg-gray-300'
            }`}>
              {tab.data.length}
            </span>
          </button>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={handleCreate}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
          isDark
            ? 'bg-cyan-500 text-white hover:bg-cyan-600'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        <Plus size={20} />
        Add {tabs.find(t => t.id === activeTab)?.label}
      </button>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          {activeTab === 'experience' && (
            <ExperienceList
              experiences={experiences}
              onEdit={handleEdit}
              onDelete={(id) => handleDelete('experience', id)}
              isDark={isDark}
            />
          )}
          {activeTab === 'education' && (
            <EducationList
              education={education}
              onEdit={handleEdit}
              onDelete={(id) => handleDelete('education', id)}
              isDark={isDark}
            />
          )}
          {activeTab === 'skills' && (
            <SkillsList
              skills={skills}
              onEdit={handleEdit}
              onDelete={(id) => handleDelete('skills', id)}
              isDark={isDark}
            />
          )}
          {activeTab === 'certifications' && (
            <CertificationsList
              certifications={certifications}
              onEdit={handleEdit}
              onDelete={(id) => handleDelete('certifications', id)}
              isDark={isDark}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      {showModal && (
        <ResumeModal
          type={activeTab}
          mode={modalMode}
          item={currentItem}
          onClose={() => {
            setShowModal(false);
            setCurrentItem(null);
          }}
          onSuccess={() => {
            fetchAllData();
            setShowModal(false);
            setCurrentItem(null);
          }}
          isDark={isDark}
          setDialog={setDialog}
        />
      )}

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

// Experience List Component
const ExperienceList = ({ experiences, onEdit, onDelete, isDark }) => {
  if (experiences.length === 0) {
    return (
      <div className={`text-center py-12 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <Briefcase size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No experience added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {experiences.map((exp) => (
        <div
          key={exp.id}
          className={`p-6 rounded-lg border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {exp.title}
              </h3>
              <p className={`text-lg ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                {exp.company}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {exp.period}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(exp)}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-700 text-cyan-400' : 'hover:bg-gray-100 text-blue-600'
                }`}
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(exp.id)}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-600'
                }`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {exp.description}
          </p>
          <ul className="space-y-1">
            {exp.achievements?.map((achievement, idx) => (
              <li key={idx} className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                ▹ {achievement}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Education List Component
const EducationList = ({ education, onEdit, onDelete, isDark }) => {
  if (education.length === 0) {
    return (
      <div className={`text-center py-12 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <GraduationCap size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No education added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <div
          key={edu.id}
          className={`p-6 rounded-lg border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {edu.degree}
              </h3>
              <p className={`text-lg ${isDark ? 'text-purple-400' : 'text-indigo-600'}`}>
                {edu.school}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {edu.period}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(edu)}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-700 text-cyan-400' : 'hover:bg-gray-100 text-blue-600'
                }`}
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(edu.id)}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-600'
                }`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <ul className="space-y-1">
            {edu.achievements?.map((achievement, idx) => (
              <li key={idx} className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                • {achievement}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Skills List Component
const SkillsList = ({ skills, onEdit, onDelete, isDark }) => {
  if (skills.length === 0) {
    return (
      <div className={`text-center py-12 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <Code size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No skills added yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {skills.map((skillCat) => (
        <div
          key={skillCat.id}
          className={`p-6 rounded-lg border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {skillCat.category}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(skillCat)}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-700 text-cyan-400' : 'hover:bg-gray-100 text-blue-600'
                }`}
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(skillCat.id)}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-600'
                }`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillCat.items?.map((skill, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 text-sm rounded-lg ${
                  isDark ? 'bg-gray-700 text-cyan-400' : 'bg-blue-100 text-blue-700'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Certifications List Component
const CertificationsList = ({ certifications, onEdit, onDelete, isDark }) => {
  if (certifications.length === 0) {
    return (
      <div className={`text-center py-12 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <Award size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No certifications added yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {certifications.map((cert) => (
        <div
          key={cert.id}
          className={`p-6 rounded-lg border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {cert.name}
              </h3>
              {cert.issuer && (
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {cert.issuer} {cert.date && `• ${cert.date}`}
                </p>
              )}
              {cert.pdfUrl && (
                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 text-sm mt-2 ${
                    isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  <FileText size={14} />
                  View PDF
                </a>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(cert)}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-700 text-cyan-400' : 'hover:bg-gray-100 text-blue-600'
                }`}
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(cert.id)}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-600'
                }`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Modal Component for Create/Edit
const ResumeModal = ({ type, mode, item, onClose, onSuccess, isDark, setDialog }) => {
  const [formData, setFormData] = useState(item || getEmptyFormData(type));
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  function getEmptyFormData(type) {
    switch (type) {
      case 'experience':
        return { title: '', company: '', period: '', description: '', achievements: [], order: 0 };
      case 'education':
        return { degree: '', school: '', period: '', achievements: [], order: 0 };
      case 'skills':
        return { category: '', items: [], order: 0 };
      case 'certifications':
        return { name: '', issuer: '', date: '', pdfUrl: '', order: 0 };
      default:
        return {};
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'create') {
        switch (type) {
          case 'experience':
            await resumeAPI.createExperience(formData);
            break;
          case 'education':
            await resumeAPI.createEducation(formData);
            break;
          case 'skills':
            await resumeAPI.createSkill(formData);
            break;
          case 'certifications':
            await resumeAPI.createCertification(formData);
            break;
        }
      } else {
        switch (type) {
          case 'experience':
            await resumeAPI.updateExperience(item.id, formData);
            break;
          case 'education':
            await resumeAPI.updateEducation(item.id, formData);
            break;
          case 'skills':
            await resumeAPI.updateSkill(item.id, formData);
            break;
          case 'certifications':
            await resumeAPI.updateCertification(item.id, formData);
            break;
        }
      }
      setDialog({
        isOpen: true,
        type: 'success',
        title: `${mode === 'create' ? 'Created' : 'Updated'} Successfully`,
        message: `The item has been ${mode === 'create' ? 'created' : 'updated'} successfully.`,
        onConfirm: null,
        showCancel: false
      });
      onSuccess();
    } catch (error) {
      console.error('Error saving:', error);
      setDialog({
        isOpen: true,
        type: 'error',
        title: 'Save Failed',
        message: error.message || 'Failed to save item. Please try again.',
        onConfirm: null,
        showCancel: false
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Only allow PDFs
    if (file.type !== 'application/pdf') {
      setDialog({
        isOpen: true,
        type: 'error',
        title: 'Invalid File Type',
        message: 'Please upload a PDF file only.',
        onConfirm: null,
        showCancel: false
      });
      return;
    }

    setUploading(true);
    try {
      const response = await uploadAPI.uploadFile(file);
      setFormData({ ...formData, pdfUrl: response.data.url });
      setDialog({
        isOpen: true,
        type: 'success',
        title: 'Upload Successful',
        message: 'PDF uploaded successfully!',
        onConfirm: null,
        showCancel: false
      });
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setDialog({
        isOpen: true,
        type: 'error',
        title: 'Upload Failed',
        message: error.message || 'Failed to upload PDF. Please try again.',
        onConfirm: null,
        showCancel: false
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl p-6 ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {mode === 'create' ? 'Add' : 'Edit'} {type.charAt(0).toUpperCase() + type.slice(1)}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'experience' && (
            <>
              <input
                type="text"
                placeholder="Job Title *"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                required
              />
              <input
                type="text"
                placeholder="Company *"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                required
              />
              <input
                type="text"
                placeholder="Period (e.g., 2022 - Present) *"
                value={formData.period || ''}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                required
              />
              <textarea
                placeholder="Description *"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                rows={3}
                required
              />
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Achievements (one per line)
                </label>
                <textarea
                  placeholder="Achievement 1&#10;Achievement 2&#10;Achievement 3"
                  value={formData.achievements?.join('\n') || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    achievements: e.target.value.split('\n').filter(a => a.trim())
                  })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  rows={5}
                />
              </div>
            </>
          )}

          {type === 'education' && (
            <>
              <input
                type="text"
                placeholder="Degree *"
                value={formData.degree || ''}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                required
              />
              <input
                type="text"
                placeholder="School/University *"
                value={formData.school || ''}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                required
              />
              <input
                type="text"
                placeholder="Period (e.g., 2015 - 2019) *"
                value={formData.period || ''}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                required
              />
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Achievements (one per line)
                </label>
                <textarea
                  placeholder="GPA: 3.8/4.0&#10;Dean's List&#10;Best Project Award"
                  value={formData.achievements?.join('\n') || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    achievements: e.target.value.split('\n').filter(a => a.trim())
                  })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  rows={4}
                />
              </div>
            </>
          )}

          {type === 'skills' && (
            <>
              <input
                type="text"
                placeholder="Category (e.g., Frontend, Backend) *"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                required
              />
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Skills (comma separated) *
                </label>
                <textarea
                  placeholder="React, Vue.js, TypeScript, TailwindCSS"
                  value={formData.items?.join(', ') || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    items: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                  })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  rows={3}
                  required
                />
              </div>
            </>
          )}

          {type === 'certifications' && (
            <>
              <input
                type="text"
                placeholder="Certification Name *"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                required
              />
              <input
                type="text"
                placeholder="Issuer (optional)"
                value={formData.issuer || ''}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
              <input
                type="text"
                placeholder="Date (optional)"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Certificate PDF (optional)
                </label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                  {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
                  {formData.pdfUrl && (
                    <p className="text-sm text-green-500">PDF uploaded successfully!</p>
                  )}
                </div>
              </div>
            </>
          )}

          <input
            type="number"
            placeholder="Display Order (0 = first)"
            value={formData.order || 0}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className={`w-full px-4 py-2 rounded-lg border ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-6 py-3 rounded-lg font-medium ${
                isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-6 py-3 rounded-lg font-medium text-white ${
                isDark
                  ? 'bg-cyan-500 hover:bg-cyan-600'
                  : 'bg-blue-600 hover:bg-blue-700'
              } disabled:opacity-50`}
            >
              {loading ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ResumeManagement;
