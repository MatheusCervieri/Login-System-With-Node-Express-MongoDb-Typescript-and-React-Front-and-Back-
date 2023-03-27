import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';
import { AnyKeys } from 'mongoose';
// Define the middleware function
export const authMiddleware = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  try {
    // Extract the token from the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.substring(7);

    // Verify the token and extract the user ID
    const { id } = jwt.verify(token, "mykey") as { id: string };

    // Find the user associated with the token
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach the authenticated user to the request object
    req.user = user;

    // Call the next middleware function
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Unauthorized' });
  }
};