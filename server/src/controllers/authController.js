import { auth } from '../config/firebase.js';

const ALLOWED_EMAIL = process.env.ADMIN_EMAIL || 'mirfaizan8803@gmail.com';

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, error: 'Token is required' });
    }

    // Verify Firebase ID token instead of Google OAuth token
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch (verifyError) {
      console.error('Token verification error:', verifyError.message);
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token. Please try signing in again.'
      });
    }

    const email = decodedToken.email;

    // Check if email is allowed
    if (email !== ALLOWED_EMAIL) {
      console.warn(`Unauthorized access attempt from: ${email}`);
      return res.status(403).json({
        success: false,
        error: 'Access denied. Only authorized users can access the admin panel.',
      });
    }

    console.log(`✅ Successful login: ${email}`);

    // Return the Firebase token directly - client will use it for authenticated requests
    res.json({
      success: true,
      data: {
        token: token, // Use the original Firebase token
        user: {
          email: decodedToken.email,
          name: decodedToken.name || decodedToken.email.split('@')[0],
          picture: decodedToken.picture,
          uid: decodedToken.uid,
        },
      },
    });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({
      success: false,
      error: 'Authentication failed. Please try again.'
    });
  }
};

export const verifyAuth = async (req, res) => {
  try {
    // If middleware passed, user is authenticated
    res.json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};
