import express, { Request, Response } from 'express';
import UserModel from '../models/user.model'; // assuming you have defined a user model

const router = express.Router();

router.post('/add', async (req: Request, res: Response) => {
   console.log("CHEGOU AQUI");

    try {
        const { email, password } = req.body;
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user
        const newUser = new UserModel({email, password});

        // Save the user to the database
        await newUser.save();

        // Send the created user as a response
        res.status(201).json(newUser);
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
