import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Shield, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const { signInWithGoogle, isAuthenticated, error } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const result = await signInWithGoogle();

      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        // Provide helpful error messages based on error type
        let friendlyError = result.error || 'Authentication failed. Please try again.';

        if (result.error?.includes('auth/configuration-not-found')) {
          friendlyError = '⚠️ Firebase Authentication not configured. Please enable Google Sign-In in Firebase Console. Check FIREBASE_SETUP_GUIDE.md for instructions.';
        } else if (result.error?.includes('auth/unauthorized-domain')) {
          friendlyError = '⚠️ This domain is not authorized. Add localhost to Firebase authorized domains.';
        } else if (result.error?.includes('auth/popup-blocked')) {
          friendlyError = '⚠️ Popup was blocked. Please allow popups for this site.';
        } else if (result.error?.includes('auth/popup-closed-by-user')) {
          friendlyError = 'Sign-in was cancelled. Please try again.';
        } else if (result.error?.includes('Access denied')) {
          friendlyError = '🚫 Access denied. Only mirfaizan8803@gmail.com can access this admin panel.';
        }

        setErrorMessage(friendlyError);
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      setErrorMessage(`Error: ${err.message || 'An unexpected error occurred'}`);
    }

    setLoading(false);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-8 rounded-2xl ${
          isDark ? 'glass-dark' : 'glass-light'
        }`}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex justify-center mb-6"
        >
          <div
            className={`p-4 rounded-full ${
              isDark
                ? 'bg-gradient-to-br from-cyan-500 to-purple-600'
                : 'bg-gradient-to-br from-blue-500 to-indigo-600'
            }`}
          >
            <Shield className="text-white" size={48} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-3xl font-bold text-center mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          Admin Panel
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`text-center mb-8 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Sign in to manage your portfolio
        </motion.p>

        {/* Error Message */}
        {(errorMessage || error) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              isDark
                ? 'bg-red-900/30 border border-red-800'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <AlertCircle
              className={isDark ? 'text-red-400' : 'text-red-600'}
              size={20}
            />
            <p
              className={`text-sm ${
                isDark ? 'text-red-400' : 'text-red-700'
              }`}
            >
              {errorMessage || error}
            </p>
          </motion.div>
        )}

        {/* Google Sign In Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleGoogleSignIn}
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all ${
            loading
              ? isDark
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isDark
              ? 'bg-white text-gray-900 hover:shadow-lg hover:shadow-white/20'
              : 'bg-gray-900 text-white hover:shadow-lg hover:shadow-gray-900/20'
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </>
          )}
        </motion.button>

        {/* Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`text-xs text-center mt-6 ${
            isDark ? 'text-gray-500' : 'text-gray-500'
          }`}
        >
          Only authorized administrators can access this panel
        </motion.p>

        {/* Help Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-4"
        >
          <a
            href="https://console.firebase.google.com/project/_/authentication"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs hover:underline ${
              isDark ? 'text-cyan-400' : 'text-blue-600'
            }`}
          >
            Having trouble? Check Firebase Console →
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
