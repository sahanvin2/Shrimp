import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function authRequired(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ success: false, data: null, error: 'Unauthorized' });
    }
    req.user = jwt.verify(token, env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, data: null, error: 'Unauthorized' });
  }
}

export function optionalAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (token) {
      req.user = jwt.verify(token, env.JWT_SECRET);
    }
  } catch (error) {
    req.user = null;
  }
  return next();
}
