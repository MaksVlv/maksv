import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConnect from '@/utils/dbConnect';
import Estate from '@/models/Estate';
import District from '@/models/District';
import City from '@/models/City';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        if (req.method === 'GET') {
            return await filterInfoGet(req, res);
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


const filterInfoGet = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        await dbConnect();

        const pipeline = [
            {
                $group: {
                    _id: "$type",
                    count: { $sum: 1 }
                }
            }
        ];

        const countTypes = await Estate.aggregate(pipeline);

        return res.status(200).json(countTypes);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
