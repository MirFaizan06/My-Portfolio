import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Notification = ({ show, message, type, onClose }) => {
  const { isDark } = useTheme();

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
  };

  const colors = {
    success: isDark
      ? 'bg-green-900/30 border-green-700 text-green-400'
      : 'bg-green-50 border-green-200 text-green-800',
    error: isDark
      ? 'bg-red-900/30 border-red-700 text-red-400'
      : 'bg-red-50 border-red-200 text-red-800',
    warning: isDark
      ? 'bg-yellow-900/30 border-yellow-700 text-yellow-400'
      : 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };

  const Icon = icons[type] || AlertCircle;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          className="fixed top-4 right-4 z-100 max-w-md"
        >
          <div
            className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg ${colors[type]}`}
          >
            <Icon size={24} />
            <p className="flex-1 font-medium">{message}</p>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-black/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
