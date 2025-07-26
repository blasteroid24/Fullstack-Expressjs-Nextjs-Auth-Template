import { verifyToken } from '../utils/tokenUtils.js';
import logErrorToDB from '../utils/errorLogger.js';

const authAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token' });
    }

    const decoded = verifyToken(token);

    if (!['admin', 'super_admin'].includes(decoded.role)) {
      return res.status(403).json({ error: 'Forbidden: Admin access only' });
    }

    req.admin = decoded; 
    next();
  } 
  catch (error) {
    await logErrorToDB('auth_admin', error.message, req.originalUrl);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export default authAdmin;
