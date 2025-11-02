import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'confirm', // 'confirm', 'success', 'error', 'info'
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  showCancel = true
}) => {
  const { isDark } = useTheme();

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={48} className="text-green-500" />;
      case 'error':
        return <XCircle size={48} className="text-red-500" />;
      case 'info':
        return <Info size={48} className={isDark ? 'text-cyan-400' : 'text-blue-500'} />;
      case 'confirm':
      default:
        return <AlertTriangle size={48} className="text-yellow-500" />;
    }
  };

  const getButtonColors = () => {
    switch (type) {
      case 'success':
        return isDark
          ? 'bg-green-500 hover:bg-green-600'
          : 'bg-green-600 hover:bg-green-700';
      case 'error':
        return isDark
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-red-600 hover:bg-red-700';
      case 'info':
        return isDark
          ? 'bg-cyan-500 hover:bg-cyan-600'
          : 'bg-blue-600 hover:bg-blue-700';
      case 'confirm':
      default:
        return isDark
          ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700'
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700';
    }
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative max-w-md w-full rounded-2xl p-6 shadow-2xl ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <X size={20} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              {getIcon()}
            </div>

            {/* Title */}
            <h2 className={`text-2xl font-bold text-center mb-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {title}
            </h2>

            {/* Message */}
            <p className={`text-center mb-6 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {message}
            </p>

            {/* Actions */}
            <div className={`flex gap-3 ${showCancel ? '' : 'justify-center'}`}>
              {showCancel && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors ${
                    isDark
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cancelText}
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                className={`${showCancel ? 'flex-1' : 'px-12'} px-6 py-3 rounded-xl font-medium text-white transition-colors shadow-lg ${getButtonColors()}`}
              >
                {confirmText}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
