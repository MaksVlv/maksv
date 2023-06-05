import { NextApiRequest, NextApiResponse } from 'next';
import Estate from '@/models/Estate';
import dbConnect from '@/utils/dbConnect';


export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST")
        return res.status(405).json({ message: 'Method not allowed' })

    try {

        await dbConnect();

        const oldEstate = await Estate.findOne({ "name.lv": "Bišu iela 6" }).lean();

        const newEstate = new Estate({
            ...oldEstate,
            _id: oldEstate.name_translit.replace(/[^\w\s-]/gi, '').replace(/ /g, '-')
        });
        await newEstate.save();

        // await Estate.updateMany({ "type.en": "Garages" }, { type: {
        //     lv: "Garāža",
        //     ru: "Гараж",
        //     en: "Garage"
        // }})

        return res.status(200).json({ message: 'OK' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
