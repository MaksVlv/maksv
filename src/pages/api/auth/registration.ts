import bcrypt from 'bcryptjs';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    return res.status(500).json({ message: 'Registration is off' });
// if (req.method !== 'POST') {
  //   return res.status(405).json({ message: 'Method not allowed' });
  // }
  //
  // const { username, password } = req.body;
  //
  // await dbConnect();
  //
  // try {
  //   const existingUser = await User.findOne({ username });
  //
  //   if (existingUser) {
  //     return res.status(409).json({ message: 'User already exists' });
  //   }
  //
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //
  //   const newUser = new User({
  //     username,
  //     password: hashedPassword,
  //   });
  //
  //   await newUser.save();
  //
  //   return res.status(201).json({ message: 'User created successfully' });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({ message: 'Internal Server Error' });
  // }
}
