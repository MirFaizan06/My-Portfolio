import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  Code2,
  Rocket,
  Zap,
  Database,
  Globe,
  Smartphone,
  Github,
  Linkedin,
  Mail,
  Coffee,
} from 'lucide-react';

const Home = () => {
  const { isDark } = useTheme();

  const skills = [
    { icon: Code2, name: 'Full Stack Development', color: 'from-cyan-400 to-blue-500' },
    { icon: Smartphone, name: 'Mobile Apps', color: 'from-purple-400 to-pink-500' },
    { icon: Database, name: 'Backend & APIs', color: 'from-green-400 to-teal-500' },
    { icon: Globe, name: 'Web3 & Blockchain', color: 'from-orange-400 to-red-500' },
    { icon: Zap, name: 'Performance Optimization', color: 'from-yellow-400 to-orange-500' },
    { icon: Rocket, name: 'Cloud & DevOps', color: 'from-indigo-400 to-purple-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div
      className={`min-h-screen pt-16 ${
        isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                isDark ? 'bg-cyan-400' : 'bg-blue-400'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Profile Image Placeholder */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="mb-8 flex justify-center"
            >
              <div
                className={`w-32 h-32 rounded-full ${
                  isDark ? 'bg-gradient-to-br from-cyan-400 to-purple-500' : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                } p-1 animate-pulse-glow`}
              >
                <div
                  className={`w-full h-full rounded-full ${
                    isDark ? 'bg-gray-900' : 'bg-white'
                  } flex items-center justify-center text-4xl font-bold ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`}
                >
                  NxY
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Hi, I'm{' '}
              <span className="gradient-text">Mir Faizan</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-xl sm:text-2xl mb-8 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Full Stack Developer | UI/UX Enthusiast | Tech Explorer
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`text-lg max-w-2xl mx-auto mb-12 ${
                isDark ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              Crafting beautiful, scalable, and performant web applications with modern technologies.
              Passionate about creating seamless user experiences and solving complex problems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  isDark
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
                }`}
              >
                View Projects
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  isDark
                    ? 'bg-gray-800 text-white border border-gray-700 hover:border-cyan-400'
                    : 'bg-white text-gray-900 border border-gray-300 hover:border-blue-600'
                }`}
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center gap-4 mt-12"
            >
              {[
                { icon: Github, href: 'https://github.com/mirfaizan8803', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:mirfaizan8803@gmail.com', label: 'Email' },
                { icon: Coffee, href: '#', label: 'Buy Me a Coffee' },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-lg transition-all ${
                    isDark
                      ? 'bg-gray-800 text-gray-300 hover:text-cyan-400 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:text-blue-600 hover:bg-gray-200'
                  }`}
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl sm:text-5xl font-bold text-center mb-16 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            What I Do
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`p-6 rounded-xl transition-all ${
                  isDark
                    ? 'glass-dark hover:border-cyan-400/50'
                    : 'glass-light hover:border-blue-400/50'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${skill.color}`}
                  >
                    <skill.icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-semibold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {skill.name}
                    </h3>
                    <p
                      className={`${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Building modern solutions with cutting-edge technologies
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-12 ${
              isDark ? 'glass-dark' : 'glass-light'
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '50+', label: 'Projects Completed' },
                { value: '30+', label: 'Happy Clients' },
                { value: '5+', label: 'Years Experience' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                >
                  <div
                    className={`text-4xl md:text-5xl font-bold mb-2 gradient-text`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`text-sm md:text-base ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
