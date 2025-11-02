import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  Download,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Database,
  Layers,
  Terminal,
} from 'lucide-react';
import { resumeAPI } from '../utils/api';
import ConfirmDialog from '../components/ConfirmDialog';

const Resume = () => {
  const { isDark } = useTheme();
  const [downloading, setDownloading] = useState(false);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState({ isOpen: false, type: 'info', title: '', message: '', onConfirm: null });

  // Fetch all resume data from API
  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        setLoading(true);
        const [expRes, eduRes, skillsRes, certsRes] = await Promise.all([
          resumeAPI.getAllExperiences(),
          resumeAPI.getAllEducation(),
          resumeAPI.getAllSkills(),
          resumeAPI.getAllCertifications(),
        ]);

        setExperience(expRes.data || []);
        setEducation(eduRes.data || []);
        setSkills(skillsRes.data || []);
        setCertifications(certsRes.data || []);
      } catch (error) {
        console.error('Error fetching resume data:', error);
        setExperience([]);
        setEducation([]);
        setSkills([]);
        setCertifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // TODO: Replace with actual Firebase Storage URL
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // window.open(downloadUrl, '_blank');
      setDialog({
        isOpen: true,
        type: 'info',
        title: 'Coming Soon',
        message: 'CV download will be available soon!',
        onConfirm: null,
        showCancel: false
      });
    } catch (error) {
      setDialog({
        isOpen: true,
        type: 'error',
        title: 'Download Failed',
        message: 'Failed to download CV. Please try again.',
        onConfirm: null,
        showCancel: false
      });
    } finally {
      setDownloading(false);
    }
  };


  return (
    <div
      className={`min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            My <span className="gradient-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Resume</span>
          </h1>
          <p
            className={`text-lg mb-8 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Download my full resume or explore my experience below
          </p>

          {/* Download Button */}
          <motion.button
            onClick={handleDownload}
            disabled={downloading}
            whileHover={{ scale: downloading ? 1 : 1.05 }}
            whileTap={{ scale: downloading ? 1 : 0.95 }}
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
              downloading
                ? isDark
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isDark
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
            }`}
          >
            {downloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={20} />
                Download CV
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className={`p-2 rounded-lg ${
                isDark ? 'bg-cyan-500/20' : 'bg-blue-100'
              }`}
            >
              <Briefcase
                className={isDark ? 'text-cyan-400' : 'text-blue-600'}
                size={24}
              />
            </div>
            <h2
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Work Experience
            </h2>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Loading experience...
                </div>
              </div>
            ) : experience.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center py-12 px-6 rounded-2xl ${
                  isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
                }`}
              >
                <Briefcase size={64} className={`mx-auto mb-6 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  No Work Experience Added Yet
                </h3>
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Experience details will appear here once added
                </p>
              </motion.div>
            ) : (
              experience.map((job, index) => (
              <motion.div
                key={job.id || index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border ${
                  isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <h3
                      className={`text-xl font-bold mb-1 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {job.title}
                    </h3>
                    <p
                      className={`text-lg ${
                        isDark ? 'text-cyan-400' : 'text-blue-600'
                      }`}
                    >
                      {job.company}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      isDark
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {job.period}
                  </span>
                </div>
                <p
                  className={`mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {job.description}
                </p>
                <ul className="space-y-2">
                  {job.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2 text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      <span
                        className={`mt-1 ${
                          isDark ? 'text-cyan-400' : 'text-blue-600'
                        }`}
                      >
                        ▹
                      </span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
              ))
            )}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className={`p-2 rounded-lg ${
                isDark ? 'bg-purple-500/20' : 'bg-indigo-100'
              }`}
            >
              <GraduationCap
                className={isDark ? 'text-purple-400' : 'text-indigo-600'}
                size={24}
              />
            </div>
            <h2
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Education
            </h2>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Loading education...
                </div>
              </div>
            ) : education.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center py-12 px-6 rounded-2xl ${
                  isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
                }`}
              >
                <GraduationCap size={64} className={`mx-auto mb-6 ${isDark ? 'text-purple-400' : 'text-indigo-600'}`} />
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  No Education Added Yet
                </h3>
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Education details will appear here once added
                </p>
              </motion.div>
            ) : (
              education.map((edu, index) => (
              <motion.div
                key={edu.id || index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl border ${
                  isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <h3
                      className={`text-xl font-bold mb-1 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {edu.degree}
                    </h3>
                    <p
                      className={`text-lg ${
                        isDark ? 'text-purple-400' : 'text-indigo-600'
                      }`}
                    >
                      {edu.school}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      isDark
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {edu.period}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {edu.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className={`px-3 py-1 text-sm rounded-full ${
                        isDark
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
              ))
            )}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className={`p-2 rounded-lg ${
                isDark ? 'bg-green-500/20' : 'bg-green-100'
              }`}
            >
              <Code
                className={isDark ? 'text-green-400' : 'text-green-600'}
                size={24}
              />
            </div>
            <h2
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Skills
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Loading skills...
                </div>
              </div>
            ) : skills.length === 0 ? (
              <div className="col-span-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center py-12 px-6 rounded-2xl ${
                    isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}
                >
                  <Code size={64} className={`mx-auto mb-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    No Skills Added Yet
                  </h3>
                  <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Skills will appear here once added
                  </p>
                </motion.div>
              </div>
            ) : (
              skills.map((skillCategory, index) => (
              <motion.div
                key={skillCategory.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border ${
                  isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <h3
                  className={`text-lg font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {skillCategory.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.map((skill, idx) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        isDark
                          ? 'bg-gray-700 text-cyan-400'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
              ))
            )}
          </div>
        </motion.section>

        {/* Certifications Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className={`p-2 rounded-lg ${
                isDark ? 'bg-orange-500/20' : 'bg-orange-100'
              }`}
            >
              <Award
                className={isDark ? 'text-orange-400' : 'text-orange-600'}
                size={24}
              />
            </div>
            <h2
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Certifications
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Loading certifications...
              </div>
            </div>
          ) : certifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center py-12 px-6 rounded-2xl ${
                isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
            >
              <Award size={64} className={`mx-auto mb-6 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No Certifications Added Yet
              </h3>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Certifications will appear here once added
              </p>
            </motion.div>
          ) : (
            <motion.div
              className={`p-6 rounded-xl border ${
                isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {certifications.map((cert, index) => (
                  <motion.li
                    key={cert.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-start gap-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <span
                      className={`mt-1 ${
                        isDark ? 'text-orange-400' : 'text-orange-600'
                      }`}
                    >
                      ✓
                    </span>
                    <div className="flex-1">
                      <div>{cert.name}</div>
                      {cert.issuer && (
                        <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {cert.issuer} {cert.date && `• ${cert.date}`}
                        </div>
                      )}
                      {cert.pdfUrl && (
                        <a
                          href={cert.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm underline ${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-700'}`}
                        >
                          View Certificate PDF
                        </a>
                      )}
                    </div>
                  </motion.li>
              ))}
            </ul>
          </motion.div>
          )}
        </motion.section>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={dialog.isOpen}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
        onConfirm={dialog.onConfirm}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
        confirmText="OK"
        showCancel={dialog.showCancel !== false}
      />
    </div>
  );
};

export default Resume;
