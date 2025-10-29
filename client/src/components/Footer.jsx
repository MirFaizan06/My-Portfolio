import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Heart, Github, Linkedin, Mail, Coffee } from 'lucide-react';
import { versionAPI } from '../utils/api';

const Footer = () => {
  const { isDark } = useTheme();
  const [version, setVersion] = useState('1.0.0');

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await versionAPI.get();
        if (response.data?.version) {
          setVersion(response.data.version);
        }
      } catch (error) {
        console.error('Error fetching version:', error);
      }
    };

    fetchVersion();
  }, []);

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mirfaizan8803', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:mirfaizan8803@gmail.com', label: 'Email' },
    { icon: Coffee, href: '#', label: 'Buy Me a Coffee' },
  ];

  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Resume', href: '/resume' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer
      className={`relative mt-20 ${
        isDark
          ? 'bg-gradient-to-b from-gray-900 to-gray-950'
          : 'bg-gradient-to-b from-gray-50 to-gray-100'
      }`}
    >
      {/* Decorative Line */}
      <div
        className={`h-px ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent'
            : 'bg-gradient-to-r from-transparent via-blue-500 to-transparent'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-2xl font-bold mb-4 gradient-text`}
            >
              NxY
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Building modern, scalable, and beautiful web applications.
              Let's create something amazing together.
            </motion.p>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Quick Links
            </motion.h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className={`text-sm transition-colors ${
                      isDark
                        ? 'text-gray-400 hover:text-cyan-400'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Let's Connect
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex gap-3 mb-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg transition-all ${
                    isDark
                      ? 'bg-gray-800 text-gray-400 hover:text-cyan-400 hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-600 hover:text-blue-600 hover:bg-gray-300'
                  }`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <a
                href="mailto:mirfaizan8803@gmail.com"
                className={`${
                  isDark ? 'hover:text-cyan-400' : 'hover:text-blue-600'
                } transition-colors`}
              >
                mirfaizan8803@gmail.com
              </a>
            </motion.p>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`pt-8 border-t ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p
              className={`text-sm ${
                isDark ? 'text-gray-500' : 'text-gray-600'
              }`}
            >
              © {currentYear} Mir Faizan (NxY). Made with{' '}
              <Heart
                className="inline text-red-500"
                size={14}
                fill="currentColor"
              />{' '}
              using React & TailwindCSS
            </p>

            {/* Version */}
            <div className="flex items-center gap-4">
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  isDark
                    ? 'bg-gray-800 text-cyan-400'
                    : 'bg-gray-200 text-blue-600'
                }`}
              >
                v{version}
              </span>
              <a
                href="/admin"
                className={`text-xs ${
                  isDark
                    ? 'text-gray-600 hover:text-gray-400'
                    : 'text-gray-400 hover:text-gray-600'
                } transition-colors`}
              >
                Admin
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
