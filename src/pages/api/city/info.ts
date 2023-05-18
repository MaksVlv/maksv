import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';
import Page from '@/utils/page.util';
import City from '@/models/City';
import District from '@/models/District';
import Estate from '@/models/Estate';

const ObjectId = mongoose.Types.ObjectId;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        if (req.method === 'GET') {
            return await cityInfoGet(req, res);
        } else if (req.method === 'POST') {
            return await cityInfoUpdate(req, res);
        } else if (req.method === 'DELETE') {
            return await cityInfoDelete(req, res);
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


const cityInfoGet = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        await dbConnect();

        let id: string;

        if (req.query.id)
            id = req.query.id as string
        else
            return res.status(400).json({ message: "Enter city id" })

        const _id = new ObjectId(id);

        const city = await City.aggregate([
            { $match: { _id } },
            {
                $lookup: {
                    from: "districts",
                    localField: "_id",
                    foreignField: "city",
                    as: "districts"
                }
            }
        ]);

        if (city.length === 0)
            return res.status(400).json({ message: "There is no cty with this id" })

        return res.status(200).json(city[0]);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const cityInfoUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    // @ts-ignore
    const token = req.headers.authorization.split(" ")[1];

    if (!token)
        return res.status(201).json({ message: "No Auth" });

    try {
        await dbConnect();

        // @ts-ignore
        const user = await jwt.verify(token, process.env.JWT_SECRET);

        if (!user.isAdmin)
            throw "user is not admin";

        const city = req.body;

        // VALIDATION
        if (!city)
            return res.status(400).json({ message: "Invalid data" });
        if (!city.city.lv || !city.city.ru || !city.city.en || !Array.isArray(city.districts))
            return res.status(400).json({ message: "Invalid data" });
        for (let i = 0; i < city.districts.length; i++) {
            if (!city.districts[i].name.lv || !city.districts[i].name.ru || !city.districts[i].name.en)
                return res.status(400).json({ message: "Invalid data" });
        }

        let candidate = await City.find({ $or: [
                { 'name.lv': city.city.lv },
                { 'name.ru': city.city.ru },
                { 'name.en': city.city.en }
            ] }).countDocuments();
        if (candidate > 1)
            return res.status(400).json({ message: "This city already added" });

        const updatedCity = await City.findOneAndUpdate({ _id: city._id }, { name: city.city }, { new: true })

        for (let district of city.districts) {
            const candidate = await District.find({
                $and: [
                    { city: updatedCity._id },
                    {
                        $or: [
                            { 'name.lv': district.name.lv },
                            { 'name.ru': district.name.ru },
                            { 'name.en': district.name.en }
                        ]
                    }
                ]
            }).countDocuments()

            const candidate_2 = await District.findById(district._id)

            if (!candidate_2 && candidate === 0) {
                const newDistrict = new District({
                    name: district.name,
                    city: city._id
                })
                await newDistrict.save()
            } else if (candidate <= 1) {
                await District.findOneAndUpdate({ _id: district._id }, { name: district.name })
            }
        }

        return res.status(200).json(updatedCity)

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const cityInfoDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    // @ts-ignore
    const token = req.headers.authorization.split(" ")[1];

    if (!token)
        return res.status(201).json({ message: "No Auth" });

    try {
        await dbConnect();

        // @ts-ignore
        const user = await jwt.verify(token, process.env.JWT_SECRET);

        if (!user.isAdmin)
            throw "user is not admin";

        const id = req.query.id;

        // VALIDATION
        if (!id || id === "undefined") {
            return res.status(400).json({ message: "Invalid data" });
        }

        const estateCandidate = await Estate.findOne({ city: id }).populate('district')
        if (estateCandidate)
            return res.status(400).json({ message: "City is used in estate - " + estateCandidate.name.lv + " with district - " + estateCandidate.district.name.lv })


        await District.deleteMany({ city: id })
        await City.findOneAndDelete({ _id: id })

        return res.status(200).json({ message: "City deleted!" })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
