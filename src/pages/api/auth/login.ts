import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = req.body;

    await dbConnect();

    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // @ts-ignore
        const token = jwt.sign({ userId: existingUser._id, isAdmin: existingUser.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
