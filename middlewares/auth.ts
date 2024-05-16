import { NextFunction, Request, Response } from 'express';
import { JwtUtil } from '../utils/tokenUtils'; // Assuming jwt.util is the file path for your JWT utility

declare global {
    namespace Express {
      interface Request {
        user?: {email: string, id: string}; // Replace 'any' with your user data type if known
      }
    }
  }

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedPayload = await JwtUtil.verifyToken(token);
    if (decodedPayload) {
      // Attach decoded data (e.g., user ID) to the request object for access in route handlers
      req.user = decodedPayload as {email: string, id: string};
      next();
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Error during token verification:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
