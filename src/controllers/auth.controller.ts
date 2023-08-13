import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Fetch token
export const getToken = async (req: Request, res: Response) => {
  try {
    const token = await jwt.sign({user: "user@user.com"}, "SECRET_KEY");
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching token', error });
  }
};

