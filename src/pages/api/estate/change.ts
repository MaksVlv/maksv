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

        // const objects = await Estate.find({ mainImage: /cloudinary/ });
        // for (const object of objects) {
        //     object.mainImage = 'https://maksv-images.s3.amazonaws.com/' + object.mainImage.split("/").pop();
        //
        //     try {
        //         await object.save();
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }

        // const objects = await Estate.find({ 'images': { $regex: /cloudinary/ } });
        // for (const object of objects) {
        //
        //     object.images = object.images.map((img) => 'https://maksv-images.s3.amazonaws.com/' + img.split("/").pop());
        //
        //     try {
        //         await object.save();
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }

        //
        // const oldEstate = await Estate.findOne({ "name.lv": "Bišu iela 6" }).lean();
        //
        // const newEstate = new Estate({
        //     ...oldEstate,
        //     _id: oldEstate.name_translit.replace(/[^\w\s-]/gi, '').replace(/ /g, '-')
        // });
        // await newEstate.save();

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
