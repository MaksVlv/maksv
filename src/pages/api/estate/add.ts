import cloudinary from 'cloudinary';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import Estate from '@/models/Estate';
import District from '@/models/District';
import jwt from "jsonwebtoken";

cloudinary.v2.config({
    cloud_name: "artemijss",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST")
        return res.status(405).json({ message: 'Method not allowed' })


    try {

        // @ts-ignore
        const token = req.headers.authorization.split(" ")[1];
        if (!token)
            return res.status(201).json({ message: "No Auth" });

        // @ts-ignore
        const user = await jwt.verify(token, process.env.JWT_SECRET);

        if (!user.isAdmin)
            return res.status(405).json({ message: "user is not admin" });

        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({message: 'Error parsing form data'});
            }

            try {

                if (!files.mainImage || Object.keys(files).length <= 1 || !fields.estate) {
                    return res.status(400).json({message: 'Invalid data'});
                }

                const estate = JSON.parse(fields.estate as string);

                estate.price = Number(estate.price);


                //VALIDATION
                if (!validateCommon(estate))
                    return res.status(400).json({ message: "Invalid data provided" })
                if (!await validateDistrict(estate.city, estate.district))
                    return res.status(400).json({ message: "District not found or city do not related to district" })
                if (!await validateEstateName(estate.name))
                    return res.status(400).json({ message: "Estate with this name already created" })

                const type = estate.type.en
                estate.landArea = Number(estate.landArea)
                estate.livingArea = Number(estate.livingArea)
                estate.rooms = Number(estate.rooms)
                estate.floor = Number(estate.floor)
                estate.gateHeight = Number(estate.gateHeight)

                estate.description.en = estate.description.en.replace(/\n/g, "<br/>");
                estate.description.ru = estate.description.ru.replace(/\n/g, "<br/>");
                estate.description.lv = estate.description.lv.replace(/\n/g, "<br/>");

                if (type === "Houses") {
                    if (!validateHouse(estate))
                        return res.status(400).json({ message: "Invalid house data" })
                    deleteForHouse(estate);
                } else if (type === "Flats") {
                    if (!validateFlat(estate))
                        return res.status(400).json({ message: "Invalid flat data" })
                    deleteForFlat(estate);
                } else if (type === "Land" || type === "Factory" || type === "Commercial object") {
                    if (!validateLand(estate))
                        return res.status(400).json({ message: "Invalid land data" })
                    deleteForLand(estate);
                } else if (type === "Attic, basement" || type === "Workshops, warehouses, production facilities" || type === "Parking") {
                    if (!validateLandOnly(estate))
                        return res.status(400).json({ message: "Invalid land only data" })
                    deleteForLandOnly(estate);
                } else if (type === "Garages") {
                    if (!validateGarage(estate))
                        return res.status(400).json({ message: "Invalid land only data" })
                    deleteForGarage(estate);
                } else if (type === "Restaurants, cafes, offices") {
                    if (!validateCafe(estate))
                        return res.status(400).json({ message: "Invalid land only data" })
                    deleteForCafe(estate);
                } else {
                    return res.status(400).json({ message: "Invalid estate type" })
                }


                const typedEstate: IHouse | IFlat | ILand | ILandOnly | IGarage | ICafe = estate;

                await dbConnect();

                let mainImageUrl = '';
                let imageUrls = [];

                // @ts-ignore
                let result = await cloudinary.uploader.upload(files.mainImage.filepath);
                mainImageUrl = result.secure_url;
                delete files.mainImage

                const fileNames = Object.keys(files)

                for (let i = 0; i < fileNames.length; i++) {
                    // @ts-ignore
                    let result = await cloudinary.uploader.upload(files[fileNames[i]].filepath);
                    if (!result.secure_url)
                        throw "no image secure_url"

                    imageUrls.push(result.secure_url);
                }

                // mainImageUrl = "https://res.cloudinary.com/artemijss/image/upload/v1682090503/wqd4f4zjw9xzquedua09.jpg"
                // imageUrls = ["https://res.cloudinary.com/artemijss/image/upload/v1682090517/qqrzzr3zmzkwjvgkzdxs.jpg", "https://res.cloudinary.com/artemijss/image/upload/v1682090531/wakpkv8twyl1lmui87po.jpg"]

                typedEstate.mainImage = mainImageUrl;
                typedEstate.images = imageUrls;


                const newEstate = new Estate(typedEstate);

                await newEstate.save();

                return res.status(200).json(newEstate)

            } catch (e) {
                console.log(e);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

interface ILangText {
    lv: string,
    ru: string,
    en: string
}

interface ICommon {
    name: ILangText,
    description: ILangText,
    price: number,
    rent: boolean,
    city: string,
    district: string,
    street: string,
    location: {
        lat: number,
        lng: number,
    },
    mainImage: string,
    images: string[],
    type: ILangText,
}

interface IHouse extends ICommon {
    rooms: number,
    floor: number,
    livingArea: number,
    landArea: number
}

interface IFlat extends ICommon {
    rooms: number,
    floor: number,
    livingArea: number,
    series: ILangText
}

interface ILand extends ICommon {
    landArea: number,
    cadastralNumber: string
}

interface ILandOnly extends ICommon {
    landArea: number,
}

interface IGarage extends ICommon {
    size: string,
    gateHeight: number,
}

interface ICafe extends ICommon {
    landArea: number,
    floor: number,
}


function validateCommon(common: any): boolean {
    const { name, description, price, rent, city, district, street, location, type } = common;

    const isValidLangText = (langText: any): boolean => {
        return Object.values(langText).every((value) => typeof value === 'string' && value.trim().length > 0);
    };

    if (!isValidLangText(name) || !isValidLangText(description)) {
        return false;
    }

    if (typeof price !== 'number' || price < 0) {
        return false;
    }

    if (typeof rent !== 'boolean') {
        return false;
    }

    if ([city, district, street].some((value) => typeof value !== 'string' || value.trim().length === 0)) {
        return false;
    }

    if (!location || typeof location !== 'object' || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
        return false;
    }

    const isValidILangText = (langText: any): boolean => {
        return Object.values(langText).length === Object.keys(langText).length && Object.values(langText).every((value) => typeof value === 'string' && value.trim().length > 0);
    };

    if (!isValidILangText(type)) {
        return false;
    }

    return true;
}


function validateHouse(house: any): boolean {
    const { rooms, floor, livingArea, landArea } = house;

    if (typeof rooms !== 'number' || rooms < 0 || typeof floor !== 'number' || floor < 0 || typeof livingArea !== 'number' || livingArea < 0 || typeof landArea !== 'number' || landArea < 0) {
        return false;
    }

    return true;
}

function validateFlat(flat: any): boolean {
    const { rooms, floor, livingArea, series } = flat;

    if (typeof rooms !== 'number' || rooms < 0 || typeof floor !== 'number' || floor < 0 || typeof livingArea !== 'number' || livingArea < 0 || typeof series !== 'object') {
        return false;
    }

    return true;
}

function validateLand(land: any): boolean {
    const { landArea, cadastralNumber } = land;

    if (typeof landArea !== 'number' || landArea < 0 || typeof cadastralNumber !== 'string' || cadastralNumber.length === 0) {
        return false;
    }

    return true;
}

function validateLandOnly(land: any): boolean {
    const { landArea } = land;

    if (typeof landArea !== 'number' || landArea < 0) {
        return false;
    }

    return true;
}

function validateGarage(garage: any): boolean {
    const { gateHeight, size } = garage;

    if (typeof gateHeight !== 'number' || gateHeight < 0 || !size) {
        return false;
    }

    return true;
}

function validateCafe(cafe: any): boolean {
    const { landArea, floor } = cafe;

    if (typeof landArea !== 'number' || landArea < 0 || typeof floor !== 'number' || floor < 0) {
        return false;
    }

    return true;
}

async function validateDistrict(city: string, district: string): Promise<boolean> {

    const candidateDistrict = await District.findById(district);

    return !(!candidateDistrict || candidateDistrict.city.toString() !== city);
}

async function validateEstateName(name: any): Promise<boolean> {

    const candidate = await Estate.findOne({
        $or: [
            { 'name.lv': name.lv },
            { 'name.ru': name.ru },
            { 'name.en': name.en }
        ]
    });

    return !candidate;
}

const deleteForHouse = (house: any) => {
    delete house.series;
    delete house.cadastralNumber;
    delete house.size;
    delete house.gateHeight;
}

const deleteForFlat = (flat: any) => {
    delete flat.landArea;
    delete flat.cadastralNumber;
    delete flat.size;
    delete flat.gateHeight;
}

const deleteForLand = (land: any) => {
    delete land.rooms;
    delete land.floor;
    delete land.livingArea;
    delete land.series;
    delete land.size;
    delete land.gateHeight;
}

const deleteForLandOnly = (land: any) => {
    delete land.rooms;
    delete land.floor;
    delete land.livingArea;
    delete land.series;
    delete land.size;
    delete land.gateHeight;
    delete land.cadastralNumber;
}

const deleteForGarage = (garage: any) => {
    delete garage.rooms;
    delete garage.floor;
    delete garage.livingArea;
    delete garage.series;
    delete garage.cadastralNumber;
    delete garage.landArea;
}

const deleteForCafe = (cafe: any) => {
    delete cafe.rooms;
    delete cafe.livingArea;
    delete cafe.series;
    delete cafe.cadastralNumber;
    delete cafe.size;
    delete cafe.gateHeight;
}
