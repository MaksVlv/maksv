import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';
import Page from '@/utils/page.util';
import Estate from '@/models/Estate';
import District from '@/models/District';
import City from '@/models/City';
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: "dv139dkum",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        if (req.method === 'GET') {
            return await estateGet(req, res)
        } if (req.method === 'DELETE') {
            return await estateDelete(req, res)
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const estateGet = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        await dbConnect();

        const page = new Page(req)

        const query: any = {
            $or: [
                { "name.lv": { $regex: page.Search, $options: 'i' } },
                { "name.ru": { $regex: page.Search, $options: 'i' } },
                { "name.en": { $regex: page.Search, $options: 'i' } },
                { "type.lv": { $regex: page.Search, $options: 'i' } },
                { "type.ru": { $regex: page.Search, $options: 'i' } },
                { "type.en": { $regex: page.Search, $options: 'i' } },
            ],
            disabled: {
                $in: [false, null]
            }
        };

        if (req.query.rent && req.query.rent === "true")
            query["rent"] = true;
        if (req.query.rent && req.query.rent === "false")
            query["rent"] = false;

        if (req.query.type)
            query["type.en"] = req.query.type;

        if (req.query.city)
            query["city"] = req.query.city;

        if (req.query.district)
            query["district"] = req.query.district;

        if (req.query.priceFrom || req.query.priceTill) {
            const priceFrom = req.query.priceFrom || 0;
            const priceTill = req.query.priceTill || Number.MAX_SAFE_INTEGER;
            query["price"] = {$gte: priceFrom, $lte: priceTill};
        }

        if (req.query.floorFrom || req.query.floorTill) {
            const floorFrom = req.query.floorFrom || 0;
            const floorTill = req.query.floorTill || Number.MAX_SAFE_INTEGER;
            query["floor"] = {$gte: floorFrom, $lte: floorTill};
        }

        if (req.query.roomsFrom || req.query.roomsTill) {
            const roomsFrom = req.query.roomsFrom || 0;
            const roomsTill = req.query.roomsTill || Number.MAX_SAFE_INTEGER;
            query["rooms"] = {$gte: roomsFrom, $lte: roomsTill};
        }

        if (req.query.livingAreaFrom || req.query.livingAreaTill) {
            const livingAreaFrom = req.query.livingAreaFrom || 0;
            const livingAreaTill = req.query.livingAreaTill || Number.MAX_SAFE_INTEGER;
            query["livingArea"] = {$gte: livingAreaFrom, $lte: livingAreaTill};
        }

        if (req.query.landAreaFrom || req.query.landAreaTill) {
            const landAreaFrom = req.query.landAreaFrom || 0;
            const landAreaTill = req.query.landAreaTill || Number.MAX_SAFE_INTEGER;
            query["landArea"] = {$gte: landAreaFrom, $lte: landAreaTill};
        }

        if (req.query.gateHeightFrom || req.query.gateHeightTill) {
            const gateHeightFrom = req.query.gateHeightFrom || 0;
            const gateHeightTill = req.query.gateHeightTill || Number.MAX_SAFE_INTEGER;
            query["gateHeight"] = {$gte: gateHeightFrom, $lte: gateHeightTill};
        }

        if (req.query.disabled) {
            query["disabled"] = {$in: [false, null, true]};
        }

        if (page.Search === "draft" && req.query.disabled) {
            delete query["$or"];
            query["disabled"] = true;
        }

        if (req.query.series)
            query["series.en"] = req.query.series;

        if (req.query.no)
            query["_id"] = { $ne: req.query.no };

        let sortKey: string = 'createdAt';
        let sortVal: SortOrder = 'desc';
        if (req.query.sort) {
            let sort = req.query.sort as string
            sortKey = sort.split(':')[0]
            sortVal = sort.split(':')[1] as SortOrder
        }

        const estates = await Estate.find(query).limit(page.Size).skip(page.Size * page.Page).populate({path: 'district', model: District}).populate({path: 'city', model: City}).sort({
            [sortKey]: sortVal
        });

        const estatesCount = await Estate.find(query).countDocuments();

        page.setData(estates)
        page.setCount(estatesCount)

        return res.status(200).json(page.pageResponse());

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

type SortOrder = 'asc' | 'desc';

const estateDelete = async (req: NextApiRequest, res: NextApiResponse) => {
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

        const estate = await Estate.findById(id);

        // MAIN image delete
        // @ts-ignore
        const publicId = estate.mainImage.split("/").pop().split(".")[0];

        // @ts-ignore
        await cloudinary.uploader.destroy(publicId);

        // Images delete
        for (let image of estate.images) {
            // @ts-ignore
            const publicId = image.split("/").pop().split(".")[0];
            // @ts-ignore
            await cloudinary.uploader.destroy(publicId);
        }

        await Estate.findOneAndDelete({ _id: id })

        return res.status(200).json({ message: "Estate deleted!" })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
