import { useState } from 'react';
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

const Resume = () => {
  const { isDark } = useTheme();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // TODO: Replace with actual Firebase Storage URL
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // window.open(downloadUrl, '_blank');
      alert('CV download will be available soon!');
    } catch (error) {
      alert('Failed to download CV');
    } finally {
      setDownloading(false);
    }
  };

  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Leading development of scalable web applications using React, Node.js, and AWS.',
      achievements: [
        'Architected and deployed 10+ production applications',
        'Reduced page load time by 60% through optimization',
        'Mentored junior developers and conducted code reviews',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Innovations',
      period: '2020 - 2022',
      description: 'Developed custom web solutions for clients across various industries.',
      achievements: [
        'Built 20+ client projects from scratch',
        'Implemented CI/CD pipelines',
        'Increased client satisfaction rate to 98%',
      ],
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Labs',
      period: '2019 - 2020',
      description: 'Contributed to front-end and back-end development of web applications.',
      achievements: [
        'Developed reusable component libraries',
        'Fixed critical bugs and improved performance',
        'Collaborated with design team on UI/UX',
      ],
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Computer Science',
      school: 'University of Technology',
      period: '2015 - 2019',
      achievements: ['GPA: 3.8/4.0', 'Dean\'s List', 'Best Final Year Project Award'],
    },
  ];

  const skills = {
    'Frontend': ['React', 'Next.js', 'Vue.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    'Backend': ['Node.js', 'Express', 'Python', 'Django', 'RESTful APIs', 'GraphQL'],
    'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis'],
    'Tools & Others': ['Git', 'Docker', 'AWS', 'CI/CD', 'Agile', 'Testing (Jest, Cypress)'],
  };

  const certifications = [
    'AWS Certified Developer - Associate',
    'Google Cloud Professional',
    'MongoDB Certified Developer',
    'Advanced React & Redux',
  ];

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
            My <span className="gradient-text">Resume</span>
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
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${
                  isDark ? 'glass-dark' : 'glass-light'
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
            ))}
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
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl ${
                  isDark ? 'glass-dark' : 'glass-light'
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
            ))}
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
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${
                  isDark ? 'glass-dark' : 'glass-light'
                }`}
              >
                <h3
                  className={`text-lg font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
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
            ))}
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

          <motion.div
            className={`p-6 rounded-xl ${
              isDark ? 'glass-dark' : 'glass-light'
            }`}
          >
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert, index) => (
                <motion.li
                  key={index}
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
                  {cert}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default Resume;
