import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SEO, { seoConfig } from '../components/SEO';
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
  Sparkles,
  Target,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

const Home = () => {
  const { isDark } = useTheme();

  const skills = [
    {
      icon: Code2,
      name: 'Full Stack Development',
      description: 'Building robust end-to-end web solutions with React, Node.js, and modern frameworks',
      color: 'from-cyan-400 via-blue-500 to-indigo-500',
    },
    {
      icon: Smartphone,
      name: 'Mobile Apps',
      description: 'Creating seamless cross-platform mobile experiences with React Native',
      color: 'from-purple-400 via-pink-500 to-rose-500',
    },
    {
      icon: Database,
      name: 'Backend & APIs',
      description: 'Designing scalable server architecture with REST APIs and GraphQL',
      color: 'from-emerald-400 via-green-500 to-teal-500',
    },
    {
      icon: Globe,
      name: 'Web3 & Blockchain',
      description: 'Developing decentralized applications and smart contracts on Ethereum',
      color: 'from-orange-400 via-amber-500 to-yellow-500',
    },
    {
      icon: Zap,
      name: 'Performance Optimization',
      description: 'Delivering lightning-fast experiences through optimization techniques',
      color: 'from-yellow-400 via-orange-500 to-red-500',
    },
    {
      icon: Rocket,
      name: 'Cloud & DevOps',
      description: 'Implementing CI/CD pipelines and cloud infrastructure on AWS',
      color: 'from-indigo-400 via-purple-500 to-pink-500',
    },
  ];

  const stats = [
    { value: '50+', label: 'Projects Completed', icon: Target },
    { value: '30+', label: 'Happy Clients', icon: Sparkles },
    { value: '5+', label: 'Years Experience', icon: TrendingUp },
    { value: '100%', label: 'Client Satisfaction', icon: Zap },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mirfaizan8803', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:mirfaizan8803@gmail.com', label: 'Email' },
    { icon: Coffee, href: '#', label: 'Buy Me a Coffee' },
  ];

  return (
    <>
      <SEO {...seoConfig.home} />
      <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>

        {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-8 py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-purple-500/30 via-pink-500/20 to-transparent rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${
                  isDark
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-400/30'
                    : 'bg-blue-500/10 text-blue-600 border-blue-400/30'
                }`}>
                  <Sparkles size={16} className="animate-pulse" />
                  Welcome to my digital space
                </span>
              </motion.div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1] ${
                  isDark ? 'text-dark-text' : 'text-light-text'
                }`}>
                  Hi, I'm{' '}
                  <span className="block mt-4 gradient-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                    Mir Faizan
                  </span>
                </h1>
                <p className={`text-2xl sm:text-3xl font-light leading-[1.4] ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}>
                  Full Stack Developer &<br />
                  <span className={isDark ? 'text-purple-400' : 'text-indigo-600'}>UI/UX Enthusiast</span>
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`text-lg leading-[1.8] max-w-xl ${
                  isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}
              >
                I craft digital experiences that blend beautiful design with cutting-edge
                technology. Passionate about creating scalable, performant web applications
                that solve real-world problems.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="/projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all ${
                    isDark
                      ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25'
                      : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  }`}
                >
                  Explore My Work
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border-2 transition-all ${
                    isDark
                      ? 'border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10'
                      : 'border-blue-600/50 text-blue-600 hover:bg-blue-600/10'
                  }`}
                >
                  Let's Connect
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex gap-4"
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl transition-all ${
                      isDark
                        ? 'bg-dark-surface/50 border border-dark-border hover:border-cyan-400/50 hover:bg-cyan-400/5 text-dark-text-secondary hover:text-cyan-400'
                        : 'bg-light-surface border border-light-border hover:border-blue-400/50 hover:bg-blue-400/5 text-light-text-secondary hover:text-blue-600'
                    }`}
                    aria-label={social.label}
                  >
                    <social.icon size={22} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex justify-center"
            >
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="relative"
              >
                {/* Profile Card */}
                <div className={`relative w-[400px] h-[480px] rounded-3xl p-8 backdrop-blur-xl shadow-2xl ${
                  isDark
                    ? 'bg-gradient-to-br from-dark-surface/80 to-dark-surface/40 border-2 border-cyan-400/20'
                    : 'bg-gradient-to-br from-white/80 to-white/40 border-2 border-blue-400/20'
                }`}>

                  <div className="h-full flex flex-col items-center justify-center space-y-8">
                    {/* Logo */}
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className={`w-44 h-44 rounded-2xl flex items-center justify-center ${
                        isDark
                          ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/30'
                          : 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-2 border-blue-400/30'
                      }`}
                    >
                      <div className="text-6xl font-bold gradient-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                        NxT
                      </div>
                    </motion.div>

                    {/* Info */}
                    <div className="text-center space-y-4">
                      <h3 className={`text-2xl font-bold ${
                        isDark ? 'text-dark-text' : 'text-light-text'
                      }`}>
                        Mir Faizan
                      </h3>
                      <p className={`text-base ${
                        isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                      }`}>
                        Full Stack Developer
                      </p>
                    </div>

                    {/* Status */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                      isDark
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/30'
                        : 'bg-emerald-500/10 text-emerald-600 border border-emerald-400/30'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Available for Projects
                    </div>
                  </div>
                </div>

                {/* Floating Icons */}
                <motion.div
                  animate={{ y: [-15, 15, -15], rotate: [0, 8, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className={`absolute -top-4 -left-4 w-20 h-20 rounded-xl flex items-center justify-center shadow-xl ${
                    isDark
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-500'
                      : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                  }`}
                >
                  <Code2 className="text-white" size={36} />
                </motion.div>

                <motion.div
                  animate={{ y: [15, -15, 15], rotate: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-xl flex items-center justify-center shadow-xl ${
                    isDark
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                      : 'bg-gradient-to-br from-indigo-500 to-purple-500'
                  }`}
                >
                  <Rocket className="text-white" size={28} />
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 space-y-6"
          >
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
              isDark
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/30'
                : 'bg-blue-500/10 text-blue-600 border border-blue-300/50'
            }`}>
              <Zap size={16} />
              What I Do Best
            </span>

            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-display font-bold ${
              isDark ? 'text-dark-text' : 'text-light-text'
            }`}>
              My{' '}
              <span className="gradient-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                Expertise
              </span>
            </h2>

            <p className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>
              I specialize in creating comprehensive digital solutions that combine
              innovative design with robust technical implementation.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity`} />

                {/* Card */}
                <div className={`relative h-full p-10 rounded-3xl backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all ${
                  isDark
                    ? 'bg-dark-surface/50 border-2 border-dark-border group-hover:border-cyan-400/50'
                    : 'bg-white/50 border-2 border-light-border group-hover:border-blue-400/50'
                }`}>

                  {/* Icon */}
                  <div className="mb-8">
                    <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${skill.color} shadow-lg`}>
                      <skill.icon className="text-white" size={36} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className={`text-xl font-bold font-display leading-tight ${
                      isDark ? 'text-dark-text' : 'text-light-text'
                    }`}>
                      {skill.name}
                    </h3>
                    <p className={`text-base leading-relaxed ${
                      isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                    }`}>
                      {skill.description}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <div className={`mt-8 pt-6 border-t opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDark ? 'border-dark-border' : 'border-light-border'
                  }`}>
                    <div className={`flex items-center gap-2 text-sm font-semibold ${
                      isDark ? 'text-cyan-400' : 'text-blue-600'
                    }`}>
                      <span>Explore More</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-3xl p-16 backdrop-blur-xl shadow-2xl ${
              isDark
                ? 'bg-gradient-to-br from-dark-surface/60 to-dark-surface/40 border-2 border-cyan-400/20'
                : 'bg-gradient-to-br from-white/60 to-white/40 border-2 border-blue-400/20'
            }`}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group cursor-pointer"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-6"
                  >
                    <div className={`p-4 rounded-xl ${
                      isDark
                        ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30'
                        : 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30'
                    }`}>
                      <stat.icon
                        size={28}
                        className={isDark ? 'text-cyan-400' : 'text-blue-600'}
                      />
                    </div>
                  </motion.div>

                  {/* Value */}
                  <div className={`text-4xl lg:text-5xl font-display font-bold mb-4 ${
                    isDark
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600'
                  } bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className={`text-sm font-semibold ${
                    isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
    </>
  );
};

export default Home;
