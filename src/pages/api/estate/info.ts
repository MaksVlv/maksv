import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import Estate from '@/models/Estate';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        if (req.method === 'GET') {
            return await estateInfoGet(req, res);
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


const estateInfoGet = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        await dbConnect();

        let id: string;

        if (req.query.id)
            id = req.query.id as string
        else
            return res.status(400).json({ message: "Enter city id" })

        const estate = await Estate.findById(id).populate('district').populate('city');

        if (!estate)
            return res.status(400).json({ message: "There is no estate with this id" })

        return res.status(200).json(estate);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
