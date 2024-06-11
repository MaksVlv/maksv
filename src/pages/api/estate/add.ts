import formidable, { File } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
const transliteration = require('transliteration');
import dbConnect from '@/utils/dbConnect';
import Estate from '@/models/Estate';
import District from '@/models/District';
import jwt from "jsonwebtoken";
import fs, { readFileSync, unlink } from "fs";
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


export const config = {
    api: {
        bodyParser: false,
    },
};

const s3Client = new S3Client({ region: process.env.AWS_S3_REGION });
const bucketName = process.env.AWS_S3_BUCKET;
const publicUrl = `https://${bucketName}.s3.amazonaws.com/`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST")
        return res.status(405).json({ message: 'Method not allowed' })


    try {

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


        const form = new formidable.IncomingForm({ maxFileSize: 4.5 * 1024 * 1024 });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({message: 'Error parsing form data'});
            }

            try {

                if (!files.mainImage || !fields.estate) {
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
                if (type !== "Flat")
                    estate.floor = Number(estate.floor)
                estate.gateHeight = Number(estate.gateHeight)

                estate.description.en = estate.description.en.replace(/\n/g, "<br/>");
                estate.description.ru = estate.description.ru.replace(/\n/g, "<br/>");
                estate.description.lv = estate.description.lv.replace(/\n/g, "<br/>");

                if (type === "House") {
                    if (!validateHouse(estate))
                        return res.status(400).json({ message: "Invalid house data" })
                    deleteForHouse(estate);
                } else if (type === "Flat") {
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
                } else if (type === "Garage") {
                    if (!validateGarage(estate))
                        return res.status(400).json({ message: "Invalid land only data" })
                    deleteForGarage(estate);
                } else if (type === "Restaurants, cafes, offices") {
                    if (!validateCafe(estate))
                        return res.status(400).json({ message: "Invalid land only data" })
                    deleteForCafe(estate);
                } else if (type === "Forest") {
                    if (!validateForest(estate))
                        return res.status(400).json({ message: "Invalid forest data" })
                    deleteForForest(estate);
                } else {
                    return res.status(400).json({ message: "Invalid estate type" })
                }

                const nameTranslit = transliteration.transliterate(estate.name.lv, { unknown: '' });
                estate.name_translit = nameTranslit;
                estate._id = nameTranslit.replace(/[^\w\s-]/gi, '').replace(/ /g, '-');

                const typedEstate: IHouse | IFlat | ILand | ILandOnly | IGarage | ICafe | IForest = estate;

                await dbConnect();

                const file = files.mainImage as File;

                const fileType = getUploadedFileType(file);
                const slug = `${uuidv4()}-${slugify(file.originalFilename || "noName", { lower: true })}`;

                const fileBuffer = readFileSync(file.filepath);

                try {
                    await s3Client.send(
                        new PutObjectCommand({
                            Bucket: bucketName,
                            Key: slug,
                            Body: fileBuffer,
                            ACL: 'public-read',
                            ContentType: fileType
                        })
                    )

                    typedEstate.mainImage = publicUrl + slug;

                } catch (e) {
                    console.log(e)
                    throw "error with loading main image";
                } finally {
                    await unlink(file.filepath, (err) => {
                        if (err) {
                            console.error('File delete error', err);
                        }
                    });
                }

                if (JSON.parse(req.query.disabled as string) && req.query.disabled === "true")
                    typedEstate.disabled = true;

                const newEstate = new Estate(typedEstate);

                await newEstate.save();

                return res.status(200).json(newEstate)

            } catch (e) {
                console.log(e);
                return res.status(500).json({ err: e, message: 'Internal Server Error' });
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ err: error, message: 'Internal Server Error' });
    }
}

export const getUploadedFileType = (file: File): string => {
    if (!file) throw "no file";
    const fileType = file.mimetype;
    if (!fileType) throw "no file type";

    return fileType;
}

interface ILangText {
    lv: string,
    ru: string,
    en: string
}

interface ICommon {
    name: ILangText,
    name_translit: string,
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
    disabled?: boolean
}

interface IHouse extends ICommon {
    rooms: number,
    floor: number,
    livingArea: number,
    landArea: number
}

interface IFlat extends ICommon {
    rooms: number,
    floor: string,
    livingArea: number,
    series: ILangText
}

interface ILand extends ICommon {
    landArea: number,
    cadastralNumber: string,
    assignment: ILangText
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

interface IForest extends ICommon {
    landArea: number,
    cadastralNumber: string,
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

    if (typeof rooms !== 'number' || rooms < 0 || typeof floor !== 'string' || floor.trim().length === 0 || typeof livingArea !== 'number' || livingArea < 0 || typeof series !== 'object') {
        return false;
    }

    return true;
}

function validateLand(land: any): boolean {
    const { landArea, cadastralNumber } = land;

    if (typeof landArea !== 'number' || landArea < 0 || typeof cadastralNumber !== 'string') {
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

function validateForest(forest: any): boolean {
    const { landArea, cadastralNumber } = forest;

    if (typeof landArea !== 'number' || landArea < 0) {
        return false;
    }

    return true;
}

async function validateDistrict(city: string, district: string): Promise<boolean> {

    const candidateDistrict = await District.findById(district);

    return !(!candidateDistrict || candidateDistrict.city.toString() !== city);
}

async function validateEstateName(name: any): Promise<boolean> {

    const nameID = transliteration.transliterate(name.lv, { unknown: '' }).replace(/[^\w\s-]/gi, '').replace(/ /g, '-');

    const candidate = await Estate.findOne({
        $or: [
            { 'name.lv': name.lv },
            { 'name.ru': name.ru },
            { 'name.en': name.en },
            { 'name_translit': nameID }
        ]
    });

    return !candidate;
}

const deleteForHouse = (house: any) => {
    delete house.series;
    // delete house.cadastralNumber;
    delete house.size;
    delete house.gateHeight;
    delete house.assignment;
}

const deleteForFlat = (flat: any) => {
    delete flat.landArea;
    delete flat.cadastralNumber;
    delete flat.size;
    delete flat.gateHeight;
    delete flat.assignment;
}

const deleteForLand = (land: any) => {
    delete land.rooms;
    delete land.series;
    delete land.size;
    delete land.gateHeight;
    if (land.type.en !== "Land")
        delete land.assignment;
    if (land.type.en !== "Commercial object") {
        delete land.livingArea;
        delete land.floor;
    }
}

const deleteForLandOnly = (land: any) => {
    delete land.rooms;
    delete land.floor;
    delete land.livingArea;
    delete land.series;
    delete land.size;
    delete land.gateHeight;
    delete land.cadastralNumber;
    delete land.assignment;
}

const deleteForGarage = (garage: any) => {
    delete garage.rooms;
    delete garage.floor;
    delete garage.livingArea;
    delete garage.series;
    delete garage.cadastralNumber;
    delete garage.landArea;
    delete garage.assignment;
}

const deleteForCafe = (cafe: any) => {
    delete cafe.rooms;
    delete cafe.livingArea;
    delete cafe.series;
    delete cafe.cadastralNumber;
    delete cafe.size;
    delete cafe.gateHeight;
    delete cafe.assignment;
}

const deleteForForest = (forest: any) => {
    delete forest.floor;
    delete forest.rooms;
    delete forest.livingArea;
    delete forest.series;
    delete forest.size;
    delete forest.gateHeight;
    delete forest.assignment;
}
