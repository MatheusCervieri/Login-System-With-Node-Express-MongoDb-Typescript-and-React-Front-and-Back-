import express, { Request, Response } from 'express';
import UserModel from '../models/user.model'; // assuming you have defined a user model
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/add', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user
        const newUser = new UserModel({email, password});
        const token = jwt.sign({ id: newUser.id }, "mykey");
        // Save the user to the database
        await newUser.save();

        // Send the created user as a response
        res.status(201).json(token);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
       // Check if the password is correct
        if (user.password !== password) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Generate a token and send it as a response
      const token = jwt.sign({ id: user._id }, 'mykey');
      res.json(token);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

router.get('/email', authMiddleware, async (req: Request & { user?: any }, res: Response) => {
    try {
      // Get the ID of the authenticated user from the request object
      const userId = req.user.id;
  
      // Find the user by ID and return their email
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const email = user.email;
      res.json({ email });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

router.get('/', async (req: Request, res: Response) => {
    try {
      const users = await UserModel.find({});
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
});
  
export default router;
