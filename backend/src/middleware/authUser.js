import { verifyToken } from '../utils/tokenUtils.js';
import logErrorToDB from '../utils/errorLogger.js';

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token' });
    }

    const decoded = verifyToken(token);

    if (decoded.role !== 'user') {
      return res.status(403).json({ error: 'Forbidden: Invalid user role' });
    }

    req.user = decoded; 
    next();
  } catch (error) {
    await logErrorToDB('auth_user', error.message, req.originalUrl);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export default authUser;
