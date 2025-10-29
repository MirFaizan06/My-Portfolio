import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const ALLOWED_EMAIL = 'mirfaizan8803@gmail.com';

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, error: 'Token is required' });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    // Check if email is allowed
    if (email !== ALLOWED_EMAIL) {
      return res.status(403).json({
        success: false,
        error: 'Access denied. Only authorized users can access the admin panel.',
      });
    }

    // Create JWT token
    const jwtToken = jwt.sign(
      {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        token: jwtToken,
        user: {
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
        },
      },
    });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ success: false, error: 'Invalid token' });
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
