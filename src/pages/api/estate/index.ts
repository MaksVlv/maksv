import { NextApiRequest, NextApiResponse } from 'next';
const mongoose = require('mongoose');
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';
import Page from '@/utils/page.util';
import Estate from '@/models/Estate';
import District from '@/models/District';
import City from '@/models/City';
import cloudinary from "cloudinary";
import {$gte} from "sift";

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


        const aggregation: any = [
            {
                $lookup: {
                    from: "cities",
                    localField: "city",
                    foreignField: "_id",
                    as: "city",
                }
            },
            {
                $lookup: {
                    from: "districts",
                    localField: "district",
                    foreignField: "_id",
                    as: "district"
                }
            },
            {
                $unwind: "$city"
            },
            {
                $unwind: "$district"
            },
            {
                $match: {
                    $or: [
                        { "name.lv": { $regex: page.Search, $options: 'i' } },
                        { "name.ru": { $regex: page.Search, $options: 'i' } },
                        { "name.en": { $regex: page.Search, $options: 'i' } },
                        { "type.lv": { $regex: page.Search, $options: 'i' } },
                        { "type.ru": { $regex: page.Search, $options: 'i' } },
                        { "type.en": { $regex: page.Search, $options: 'i' } },
                        { "city.name.lv": { $regex: page.Search, $options: 'i' } },
                        { "city.name.en": { $regex: page.Search, $options: 'i' } },
                        { "city.name.ru": { $regex: page.Search, $options: 'i' } },
                        { "district.name.lv": { $regex: page.Search, $options: 'i' } },
                        { "district.name.en": { $regex: page.Search, $options: 'i' } },
                        { "district.name.ru": { $regex: page.Search, $options: 'i' } },
                    ],
                    disabled: { $in: [false, null] }
                }
            }
        ];

        if (req.query.rent && req.query.rent === "true") {
            aggregation.push({
                rent: true
            })
        }
        if (req.query.rent && req.query.rent === "false") {
            aggregation.push({
                rent: false
            })
        }

        if (req.query.type) {
            aggregation.push({
                $match: {"type.en": req.query.type}
            })
        }

        if (req.query.city) {
            aggregation.push({
                $match: {"city._id": new mongoose.Types.ObjectId(req.query.city)}
            })
        }

        if (req.query.district) {
            aggregation.push({
                $match: {"district._id": new mongoose.Types.ObjectId(req.query.district)}
            })
        }

        if (req.query.priceFrom || req.query.priceTill) {
            const priceFrom = req.query.priceFrom || 0;
            const priceTill = req.query.priceTill || Number.MAX_SAFE_INTEGER;
            aggregation.push({
                $match: {
                    price: {
                        $gte: parseInt(priceFrom as string),
                        $lte: parseInt(priceTill as string)
                    }
                }
            })
        }

        if (req.query.floorFrom || req.query.floorTill) {
            const floorFrom = Number(req.query.floorFrom) || 0;
            const floorTill = Number(req.query.floorTill) || Number.MAX_SAFE_INTEGER;
            aggregation.push({
                $match: {
                    $expr: {
                        $and: [
                            {
                                $regexMatch: {
                                    input: { $toString: { $arrayElemAt: [{ $split: ['$floor', '/'] }, 0] } },
                                    regex: `^\\d+$`,
                                    options: 'i'
                                }
                            },
                            {
                                $gte: [{ $toInt: { $arrayElemAt: [{ $split: ['$floor', '/'] }, 0] } }, floorFrom]
                            },
                            {
                                $lte: [{ $toInt: { $arrayElemAt: [{ $split: ['$floor', '/'] }, 0] } }, floorTill]
                            }
                        ]
                    }
                }
            })
        }

        if (req.query.roomsFrom || req.query.roomsTill) {
            const roomsFrom = req.query.roomsFrom || 0;
            const roomsTill = req.query.roomsTill || Number.MAX_SAFE_INTEGER;
            aggregation.push({
                $match: {
                    rooms: {
                        $gte: parseInt(roomsFrom as string),
                        $lte: parseInt(roomsTill as string)
                    }
                }
            })
        }

        if (req.query.livingAreaFrom || req.query.livingAreaTill) {
            const livingAreaFrom = req.query.livingAreaFrom || 0;
            const livingAreaTill = req.query.livingAreaTill || Number.MAX_SAFE_INTEGER;
            aggregation.push({
                $match: {
                    livingArea: {
                        $gte: parseInt(livingAreaFrom as string),
                        $lte: parseInt(livingAreaTill as string)
                    }
                }
            })
        }

        if (req.query.landAreaFrom || req.query.landAreaTill) {
            const landAreaFrom = req.query.landAreaFrom || 0;
            const landAreaTill = req.query.landAreaTill || Number.MAX_SAFE_INTEGER;
            aggregation.push({
                $match: {
                    landArea: {
                        $gte: parseInt(landAreaFrom as string),
                        $lte: parseInt(landAreaTill as string)
                    }
                }
            })
        }

        if (req.query.gateHeightFrom || req.query.gateHeightTill) {
            const gateHeightFrom = req.query.gateHeightFrom || 0;
            const gateHeightTill = req.query.gateHeightTill || Number.MAX_SAFE_INTEGER;
            aggregation.push({
                $match: {
                    gateHeight: {
                        $gte: parseInt(gateHeightFrom as string),
                        $lte: parseInt(gateHeightTill as string)
                    }
                }
            })
        }

        if (req.query.disabled) {
            aggregation.push({
                $match: {
                    disabled: {$in: [false, null, true]}
                }
            })
        }

        if (page.Search === "draft" && req.query.disabled) {
            aggregation.push({
                $match: {
                    disabled: true
                }
            })
        }

        if (req.query.series) {
            aggregation.push({
                $match: { "series.en": req.query.series }
            })
        }
        if (req.query.assignment) {
            aggregation.push({
                $match: { "assignment.en": req.query.assignment }
            })
        }

        if (req.query.no) {
            aggregation.push({
                $match: { "_id": {$ne: new mongoose.Types.ObjectId(req.query.no)} }
            })
        }

        let sortKey: string = 'createdAt';
        let sortVal: SortOrder = -1;
        if (req.query.sort) {
            let sort = req.query.sort as string
            sortKey = sort.split(':')[0]
            sortVal = sort.split(':')[1] as SortOrder
            if (sortVal === "desc") {
                sortVal = -1;
            } else {
                sortVal = 1;
            }
        }

        aggregation.push({
            $sort: {
                [sortKey]: sortVal
            }
        })
        aggregation.push({
            $skip: page.Size * page.Page
        })
        aggregation.push({
            $limit: page.Size
        })

        const estates = await Estate.aggregate(aggregation);

        const estatesCount = await Estate.aggregate([...aggregation.slice(0, -3), {
            $count: "totalCount"
        }]);

        if (estatesCount[0])
            page.setCount(estatesCount[0].totalCount)
        else
            page.setCount(0)
        page.setData(estates)

        return res.status(200).json(page.pageResponse());

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

type SortOrder = 'asc' | 'desc' | 1 | -1;

const estateDelete = async (req: NextApiRequest, res: NextApiResponse) => {
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
