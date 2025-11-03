import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SEO, { seoConfig } from '../components/SEO';
import { ExternalLink, Github, Filter, Search } from 'lucide-react';
import { projectsAPI } from '../utils/api';

const Projects = () => {
  const { isDark } = useTheme();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectsAPI.getAll();
        const apiProjects = response.data || [];
        setProjects(apiProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'client', label: 'Client Work' },
    { value: 'personal', label: 'Personal' },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <SEO {...seoConfig.projects} />
      <div
        className={`min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 ${
          isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto">
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
            My <span className="gradient-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Projects</span>
          </h1>
          <p
            className={`text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            A collection of my recent work and passion projects
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center"
        >
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(cat.value)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === cat.value
                    ? isDark
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}
              size={20}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-all ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              } focus:outline-none focus:ring-2 ${
                isDark ? 'focus:ring-cyan-400/30' : 'focus:ring-blue-500/30'
              }`}
            />
          </div>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`h-96 rounded-xl animate-pulse ${
                  isDark ? 'bg-gray-800' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-20 px-6 rounded-2xl ${
              isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
          >
            <Search size={64} className={`mx-auto mb-6 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No Projects Found
            </h3>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm ? 'Try adjusting your search or filter' : 'No projects available at the moment'}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`group rounded-xl overflow-hidden transition-all ${
                    isDark
                      ? 'bg-gray-800 hover:shadow-2xl hover:shadow-cyan-500/20'
                      : 'bg-white hover:shadow-2xl hover:shadow-blue-500/20'
                  }`}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Action Buttons */}
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                      >
                        <Github size={20} className="text-gray-900" />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                      >
                        <ExternalLink size={20} className="text-gray-900" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-sm mb-4 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 text-xs rounded-full ${
                            isDark
                              ? 'bg-gray-700 text-cyan-400'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* No Results */}
        {!loading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p
              className={`text-xl ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              No projects found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
    </>
  );
};

export default Projects;
