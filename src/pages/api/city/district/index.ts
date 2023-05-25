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

        if (req.method === 'DELETE') {
            return await districtDelete(req, res);
        } else if (req.method === 'GET') {
            return await districtGet(req, res);
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


const districtDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    // @ts-ignore
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "No Auth" });

    try {
        // @ts-ignore
        const user = await jwt.verify(token, process.env.JWT_SECRET);

        if (!user.isAdmin)
            return res.status(405).json({ message: "user is not admin" });
    } catch (e) {
        return res.status(401).json({ message: "No Auth" });
    }

    try {
        await dbConnect();

        // @ts-ignore
        const user = await jwt.verify(token, process.env.JWT_SECRET);

        if (!user.isAdmin)
            throw "user is not admin";

        const id = req.query.id

        if (!id || id === "undefined") {
            return res.status(200).json({ message: "Nothing to delete, id is empty" })
        }

        const estateCandidate = await Estate.findOne({ district: id });
        if (estateCandidate)
            return res.status(400).json({ message: "District is used in estate - " + estateCandidate.name.lv })

        const district = await District.findById(id)
        const cityDistrictCount = await District.find({ city: district.city }).countDocuments()

        if (cityDistrictCount === 1)
            return res.status(400).json({ message: "Please enter second district to remove first" })

        await District.findOneAndDelete({ _id: id })

        return res.status(200).json({ message: "District deleted!" })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

type SortOrder = 'asc' | 'desc';

const districtGet = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        await dbConnect();

        const city = req.query.city

        let sortKey: string = 'createdAt';
        let sortVal: SortOrder = 'desc';
        if (req.query.sort) {
            let sort = req.query.sort as string
            sortKey = sort.split(':')[0]
            sortVal = sort.split(':')[1] as SortOrder
        }

        if (city || city !== "undefined") {

            const districts = await District.find({ city: city }).sort({
                [sortKey]: sortVal
            });

            return res.status(200).json(districts)
        }

        const districts = await District.find().sort({
            [sortKey]: sortVal
        });

        return res.status(200).json(districts)

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
