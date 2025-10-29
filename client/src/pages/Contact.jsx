import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { contactAPI } from '../utils/api';

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

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mirfaizan8803@gmail.com',
      href: 'mailto:mirfaizan8803@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+92 XXX XXXXXXX',
      href: 'tel:+92XXXXXXXXX',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Pakistan',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mirfaizan8803', label: 'GitHub', color: 'hover:text-gray-900' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-500' },
  ];

  return (
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
          className="text-center mb-16"
        >
          <h1
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p
            className={`text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Have a project in mind? Let's discuss how I can help
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`block p-6 rounded-xl transition-all ${
                  isDark
                    ? 'glass-dark hover:border-cyan-400/50'
                    : 'glass-light hover:border-blue-400/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      isDark
                        ? 'bg-gradient-to-br from-cyan-500 to-purple-600'
                        : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                    }`}
                  >
                    <info.icon className="text-white" size={24} />
                  </div>
                  <div>
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
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`p-6 rounded-xl ${
                isDark ? 'glass-dark' : 'glass-light'
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Follow Me
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-lg transition-all ${
                      isDark
                        ? 'bg-gray-800 text-gray-300 hover:text-cyan-400'
                        : 'bg-gray-100 text-gray-600 hover:text-blue-600'
                    }`}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`p-6 rounded-xl ${
                isDark
                  ? 'bg-gradient-to-br from-cyan-900/20 to-purple-900/20'
                  : 'bg-gradient-to-br from-blue-50 to-indigo-50'
              }`}
            >
              <p
                className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-700'
                }`}
              >
                💡 <strong>Quick Response:</strong> I typically respond to all inquiries within 24 hours.
                For urgent matters, feel free to call directly.
              </p>
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
              className={`p-8 rounded-2xl ${
                isDark ? 'glass-dark' : 'glass-light'
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 ${
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
                    className={`w-full px-4 py-3 rounded-lg border transition-all ${
                      isDark
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400/30'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/30'
                    } focus:outline-none focus:ring-2`}
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 ${
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
                    className={`w-full px-4 py-3 rounded-lg border transition-all ${
                      isDark
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400/30'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/30'
                    } focus:outline-none focus:ring-2`}
                    placeholder="john@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className={`block text-sm font-medium mb-2 ${
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
                    className={`w-full px-4 py-3 rounded-lg border transition-all ${
                      isDark
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400/30'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/30'
                    } focus:outline-none focus:ring-2`}
                    placeholder="Project Inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 ${
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
                    className={`w-full px-4 py-3 rounded-lg border transition-all resize-none ${
                      isDark
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400/30'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/30'
                    } focus:outline-none focus:ring-2`}
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Status Message */}
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      status.type === 'success'
                        ? isDark
                          ? 'bg-green-900/30 text-green-400 border border-green-800'
                          : 'bg-green-50 text-green-700 border border-green-200'
                        : isDark
                        ? 'bg-red-900/30 text-red-400 border border-red-800'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    loading
                      ? isDark
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : isDark
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
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
