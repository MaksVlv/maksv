import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';
import Page from '@/utils/page.util';
import City from '@/models/City';
import District from '@/models/District';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        if (req.method === 'POST') {
            return await cityPost(req, res)
        } else if (req.method === 'GET') {
            return await cityGet(req, res)
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


const cityPost = async (req: NextApiRequest, res: NextApiResponse) => {
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

        const { city, districts } = req.body;

        // VALIDATION
        if (!city || !districts)
            return res.status(400).json({ message: "Invalid data" });
        if (!city.lv || !city.ru || !city.en || !Array.isArray(districts))
            return res.status(400).json({ message: "Invalid data" });
        for (let i = 0; i < districts.length; i++) {
            if (!districts[i].lv || !districts[i].ru || !districts[i].en)
                return res.status(400).json({ message: "Invalid data" });
        }

        let candidate = await City.findOne({ $or: [
                { 'name.lv': city.lv },
                { 'name.ru': city.ru },
                { 'name.en': city.en }
            ] });
        if (candidate)
            return res.status(400).json({ message: "This city already added" });


        const newCity = new City({
            name: city
        });

        await newCity.save();

        for (let district of districts) {
            const candidate = await District.findOne({
                $and: [
                    { city: newCity._id },
                    {
                        $or: [
                            { 'name.lv': district.lv },
                            { 'name.ru': district.ru },
                            { 'name.en': district.en }
                        ]
                    }
                ]
            })

            if (!candidate) {
                const newDistrict = new District({
                    name: district,
                    city: newCity._id
                })
                await newDistrict.save()

            }
        }

        return res.status(200).json({ city: city.lv });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const cityGet = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        await dbConnect();

        const page = new Page(req)

        const cities = await City.find({
            $or: [
                { "name.lv": { $regex: page.Search, $options: 'i' } },
                { "name.ru": { $regex: page.Search, $options: 'i' } },
                { "name.en": { $regex: page.Search, $options: 'i' } },
            ]
        }).limit(page.Size).skip(page.Size * page.Page).sort({
            createdAt: "desc"
        });

        const citiesCount = await City.find({
            $or: [
                { "name.lv": { $regex: page.Search, $options: 'i' } },
                { "name.ru": { $regex: page.Search, $options: 'i' } },
                { "name.en": { $regex: page.Search, $options: 'i' } },
            ]
        }).countDocuments();

        page.setData(cities)
        page.setCount(citiesCount)

        return res.status(200).json(page.pageResponse());

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
