import express, { Request, Response } from 'express';
import UserModel from '../models/user.model'; // assuming you have defined a user model

const router = express.Router();

router.post('/add', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = new UserModel({ email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
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
