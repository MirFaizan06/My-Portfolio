import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { contactAPI, contactDetailsAPI } from '../utils/api';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [contactDetails, setContactDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const fetchContactDetails = async () => {
    try {
      const response = await contactDetailsAPI.get();
      setContactDetails(response.data);
    } catch (error) {
      console.error('Failed to fetch contact details:', error);
      // Fallback to default
      setContactDetails({
        email: 'mirfaizan8803@gmail.com',
        phone: '+91 XXX XXXXXXX',
        location: 'India',
        socialLinks: {
          github: 'https://github.com/mirfaizan8803',
          linkedin: '#',
          twitter: '#',
        },
      });
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await contactAPI.sendMessage(formData);

      setStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = contactDetails ? [
    {
      icon: Mail,
      label: 'Email',
      value: contactDetails.email,
      href: `mailto:${contactDetails.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contactDetails.phone,
      href: `tel:${contactDetails.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: contactDetails.location,
      href: '#',
    },
  ] : [];

  const socialLinks = contactDetails ? [
    { icon: Github, href: contactDetails.socialLinks?.github || '#', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
    { icon: Linkedin, href: contactDetails.socialLinks?.linkedin || '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: Twitter, href: contactDetails.socialLinks?.twitter || '#', label: 'Twitter', color: 'hover:text-sky-500' },
  ] : [];

  return (
    <div
      className={`min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Let's Build Something{' '}
            <span className="gradient-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Amazing
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-lg sm:text-xl max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Have a project in mind? I'm here to help bring your ideas to life.
            Drop me a message and let's start the conversation!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            {loadingDetails ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="animate-spin text-cyan-500" size={32} />
              </div>
            ) : (
              contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`block p-6 rounded-xl transition-all backdrop-blur-sm ${
                    isDark
                      ? 'bg-gray-800/50 border border-gray-700/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10'
                      : 'bg-white/80 border border-gray-200 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        isDark
                          ? 'bg-gradient-to-br from-cyan-500 to-purple-600'
                          : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                      } shadow-lg`}
                    >
                      <info.icon className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium mb-1 ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {info.label}
                      </p>
                      <p
                        className={`font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {info.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))
            )}

            {/* Social Links */}
            {!loadingDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className={`p-6 rounded-xl backdrop-blur-sm ${
                  isDark
                    ? 'bg-gray-800/50 border border-gray-700/50'
                    : 'bg-white/80 border border-gray-200'
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Connect With Me
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-lg transition-all ${
                        isDark
                          ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-cyan-400'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-blue-600'
                      }`}
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Response Time Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`p-6 rounded-xl backdrop-blur-sm ${
                isDark
                  ? 'bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-800/30'
                  : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-cyan-500/20' : 'bg-blue-500/20'}`}>
                  <CheckCircle2 className={isDark ? 'text-cyan-400' : 'text-blue-600'} size={20} />
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold mb-1 ${
                      isDark ? 'text-cyan-400' : 'text-blue-700'
                    }`}
                  >
                    Quick Response Guaranteed
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-700'
                    }`}
                  >
                    I typically respond within 24 hours. For urgent matters, feel free to call directly.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div
              className={`p-8 rounded-2xl backdrop-blur-sm ${
                isDark
                  ? 'bg-gray-800/50 border border-gray-700/50'
                  : 'bg-white/80 border border-gray-200'
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-semibold mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 rounded-lg border transition-all ${
                        isDark
                          ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                      } focus:outline-none`}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-semibold mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 rounded-lg border transition-all ${
                        isDark
                          ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                      } focus:outline-none`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className={`block text-sm font-semibold mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-lg border transition-all ${
                      isDark
                        ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                    } focus:outline-none`}
                    placeholder="What would you like to discuss?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-semibold mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-lg border transition-all resize-none ${
                      isDark
                        ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                    } focus:outline-none`}
                    placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                  />
                </div>

                {/* Status Message */}
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 p-4 rounded-lg ${
                      status.type === 'success'
                        ? isDark
                          ? 'bg-green-900/30 text-green-400 border border-green-800'
                          : 'bg-green-50 text-green-700 border border-green-200'
                        : isDark
                        ? 'bg-red-900/30 text-red-400 border border-red-800'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm font-medium">{status.message}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className={`w-full py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all shadow-lg ${
                    loading
                      ? isDark
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : isDark
                      ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white hover:shadow-xl hover:shadow-cyan-500/30'
                      : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:shadow-xl hover:shadow-blue-500/30'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
