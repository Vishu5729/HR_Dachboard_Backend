import jwt from 'jsonwebtoken';
import User from '../model/user.js'; // make sure the path matches your folder name

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // attach user to request
    next(); // pass control to next middleware/controller
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default protect;
