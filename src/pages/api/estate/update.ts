import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
const transliteration = require('transliteration');
import Estate from '@/models/Estate';
import District from '@/models/District';
import jwt from "jsonwebtoken";
import { readFileSync, unlink } from "fs";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";
import { getUploadedFileType } from "./add";


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

        const update = req.query.update
        if (!update)
            return res.status(400).json({ message: "Update query is mandatory" });


        const form = new formidable.IncomingForm({ maxFileSize: 4.5 * 1024 * 1024 });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.log(err)
                return res.status(400).json({message: 'Error parsing form data'});
            }

            try {
                const estate = JSON.parse(fields.estate as string);

                const id = estate._id;

                if (!id)
                    return res.status(400).json({message: 'No estate _id'});
                const candidate = await Estate.findOne({ _id: id });

                if (!candidate)
                    return res.status(400).json({message: 'No estate with this id'});

                if (estate.type.lv !== candidate.type.lv && ['house','flat','land','landOnly','garage','cafe', 'forest'].includes(update as string)) {
                    await Estate.findOneAndUpdate({ _id: id }, {
                        type: estate.type
                    })
                }

                estate.landArea = Number(estate.landArea);
                estate.livingArea = Number(estate.livingArea);
                estate.rooms = Number(estate.rooms);
                if (estate.type.en !== "Flat")
                    estate.floor = Number(estate.floor);
                estate.gateHeight = Number(estate.gateHeight);

                switch (update) {
                    case "name":
                        return await changeName(estate, req, res);
                        break;
                    case "description":
                        return await changeDescription(estate, req, res);
                        break;
                    case "price":
                        return await changePrice(estate, req, res);
                        break;
                    case "rent":
                        return await changeRent(estate, req, res);
                        break;
                    case "location":
                        return await changeLocation(estate, req, res);
                        break;
                    case "house":
                        return await changeHouse(estate, req, res);
                        break;
                    case "flat":
                        return await changeFlat(estate, req, res);
                        break;
                    case "land":
                        return await changeLand(estate, req, res);
                        break;
                    case "landOnly":
                        return await changeLandOnly(estate, req, res);
                        break;
                    case "garage":
                        return await changeGarage(estate, req, res);
                        break;
                    case "cafe":
                        return await changeCafe(estate, req, res);
                        break;
                    case "forest":
                        return await changeForest(estate, req, res);
                        break;
                    case "mainImage":
                        return await addMainImage(estate, files, req, res);
                        break;
                    case "image":
                        return await addImage(estate, files, req, res);
                        break;
                    case "imageChangeOrder":
                        return await imageChangeOrder(estate, req, res);
                        break;
                    case "imageDelete":
                        const url = fields.url as string
                        return await deleteImage(estate, url, req, res);
                        break;
                    case "disabled":
                        const disabled = fields.disabled as string
                        return await changeDisabled(estate, disabled, req, res);
                        break;
                    default:
                        return res.status(400).json({ message: "Update type is not supported" })
                }

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


const addMainImage = async (estateObj: any, files: formidable.Files, req: NextApiRequest, res: NextApiResponse) => {

    if (!files.mainImage)
        return res.status(400).json({ message: 'Main image is mandatory' });

    const estate = await Estate.findOne({ _id: estateObj._id });

    // MAIN image delete
    // @ts-ignore
    const publicId = estate.mainImage.split("/").pop();

    const file = files.mainImage as formidable.File;

    const fileType = getUploadedFileType(file);
    const slug = `${uuidv4()}-${slugify(file.originalFilename || "noName", { lower: true })}`;

    const fileBuffer = readFileSync(file.filepath);

    try {
        if (publicId) {
            try {
                await s3Client.send(
                    new DeleteObjectCommand({
                        Bucket: bucketName,
                        Key: publicId
                    })
                )
            } catch (e) {
                console.log(e)
            }
        }

        await s3Client.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: slug,
                Body: fileBuffer,
                ACL: 'public-read',
                ContentType: fileType
            })
        )

        estate.mainImage = publicUrl + slug;
        await estate.save();

    } catch (e) {
        console.log(e)
        throw "error with updating main image"
    } finally {
        await unlink(file.filepath, (err) => {
            if (err) {
                console.error('File delete error', err);
            }
        });
    }

    return res.status(200).json({ url: publicUrl + slug });
}

const addImage = async (estateObj: any, files: formidable.Files, req: NextApiRequest, res: NextApiResponse) => {

    // image add
    const fileNames = Object.keys(files)
    let imageUrls = [];

    for (let i = 0; i < fileNames.length; i++) {

        const file = files[fileNames[i]] as formidable.File;
        const fileType = getUploadedFileType(file);
        const slug = `${uuidv4()}-${slugify(file.originalFilename || "noName", { lower: true })}`;

        const fileBuffer = readFileSync(file.filepath);

        await s3Client.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: slug,
                Body: fileBuffer,
                ACL: 'public-read',
                ContentType: fileType
            })
        )

        imageUrls.push(publicUrl + slug);

        //@ts-ignore
        await unlink(file.filepath, (err) => {
            if (err) {
                console.error('File delete error', err);
            }
        });
    }

    const estate = await Estate.findOneAndUpdate(
        { _id: estateObj._id },
        { $push: { images: { $each: imageUrls } } },
        { new: true }
    );

    return res.status(200).json({ images: estate.images });
}


const imageChangeOrder = async (estateObj: any, req: NextApiRequest, res: NextApiResponse) => {

    const estate = await Estate.findOneAndUpdate(
        { _id: estateObj._id },
        { images: estateObj.images },
        { new: true }
    );

    return res.status(200).json({ images: estate.images });
}

const deleteImage = async (estateObj: any, url: string, req: NextApiRequest, res: NextApiResponse) => {

    if (!url)
        return res.status(400).json({ message: 'Image url is mandatory' });

    const estate = await Estate.findOne({ _id: estateObj._id });

    const index = estate.images.indexOf(url)
    if (index === -1) {
        return res.status(400).json({ message: 'There is no img with this url in this estate' });
    }

    // @ts-ignore
    const publicId = url.split("/").pop();

    await s3Client.send(
        new DeleteObjectCommand({
            Bucket: bucketName,
            Key: publicId
        })
    )

    const tmpArr = estate.images;
    tmpArr.splice(index, 1);

    estate.images = tmpArr;

    await estate.save();

    return res.status(200).json({ images: estate.images });
}

const changeName = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!isValidLangText(estate.name))
        return res.status(400).json({ message: 'Name is mandatory' });

    if (!await validateEstateName(estate.name))
        return res.status(400).json({ message: "Estate with this name already created" })

    const translitName = transliteration.transliterate(estate.name.lv, { unknown: '' });
    const translitNameId = transliteration.transliterate(estate.name.lv, { unknown: '' }).replace(/[^\w\s-]/gi, '').replace(/ /g, '-');

    const oldEstate = await Estate.findOne({ _id: estate._id }).lean();

    if (oldEstate._id === translitNameId) {
        const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, { name: estate.name, name_translit: translitName })
        return res.status(200).json({ newEstate });
    }

    const newEstate = new Estate({
        ...oldEstate,
        _id: translitNameId,
        name: estate.name,
        name_translit: translitName,
    });
    await newEstate.save();
    await Estate.deleteOne({ _id: estate._id });
    return res.status(200).json({ newEstate });
}

const changeDisabled = async (estate: any, disabled: string, req: NextApiRequest, res: NextApiResponse) => {
    if (disabled !== "true" && disabled !== "false")
        return res.status(400).json({ message: 'Disabled status is mandatory' });

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, { disabled: JSON.parse(disabled) })
    return res.status(200).json({ newEstate });
}

const changeDescription = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!isValidLangText(estate.description))
        return res.status(400).json({ message: 'Description is mandatory' });

    estate.description.en = estate.description.en.replace(/\n/g, "<br/>");
    estate.description.ru = estate.description.ru.replace(/\n/g, "<br/>");
    estate.description.lv = estate.description.lv.replace(/\n/g, "<br/>");

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, { description: estate.description })
    return res.status(200).json({ newEstate });
}

const changePrice = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!estate.price || typeof estate.price !== 'number' || estate.price < 0)
        return res.status(400).json({ message: 'Price is mandatory' });

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, { price: estate.price })
    return res.status(200).json({ newEstate });
}

const changeRent = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (typeof estate.rent !== 'boolean')
        return res.status(400).json({ message: 'Rent is mandatory' });

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, { rent: estate.rent })
    return res.status(200).json({ newEstate });
}

const changeLocation = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!estate.city._id || !estate.district._id || !estate.street || !estate.location || typeof estate.location.lat !== 'number' || typeof estate.location.lng !== 'number')
        return res.status(400).json({ message: 'Location is mandatory' });
    console.log(estate.district)
    if (!await validateDistrict(estate.city._id, estate.district._id))
        return res.status(400).json({ message: 'This city dont have this district' });

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, { city: estate.city, district: estate.district, street: estate.street, location: { lat: estate.location.lat, lng: estate.location.lng } })
    return res.status(200).json({ newEstate });
}

const changeHouse = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!validateHouse(estate))
        return res.status(400).json({ message: 'House data problems' });

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, {
        landArea: estate.landArea,
        livingArea: estate.livingArea,
        rooms: estate.rooms,
        floor: estate.floor,
        cadastralNumber: estate.cadastralNumber,
        $unset: {
            series: 1,
            size: 1,
            gateHeight: 1,
            assignment: 1
        }
    })
    return res.status(200).json({ newEstate });
}

const changeFlat = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!validateFlat(estate))
        return res.status(400).json({ message: 'Flat data problems' });

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, {
        series: estate.series,
        livingArea: estate.livingArea,
        rooms: estate.rooms,
        floor: estate.floor,
        $unset: {
            landArea: 1,
            cadastralNumber: 1,
            size: 1,
            gateHeight: 1,
            assignment: 1
        }
    })
    return res.status(200).json({ newEstate });
}

const changeLand = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!validateLand(estate))
        return res.status(400).json({ message: 'Land data problems' });

    if (estate.assignment) {
        const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, {
            cadastralNumber: estate.cadastralNumber,
            landArea: estate.landArea,
            assignment: estate.assignment,
            $unset: {
                rooms: 1,
                floor: 1,
                series: 1,
                size: 1,
                gateHeight: 1,
                livingArea: 1,
            }
        })
        return res.status(200).json({ newEstate });
    }

    if (estate.type.en === "Commercial object") {
        if (!estate.livingArea)
            estate.livingArea = 0
        const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, {
            cadastralNumber: estate.cadastralNumber,
            landArea: estate.landArea,
            livingArea: estate.livingArea,
            $unset: {
                rooms: 1,
                floor: 1,
                series: 1,
                size: 1,
                gateHeight: 1,
                assignment: 1,
            }
        })
        return res.status(200).json({ newEstate });
    }

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, {
        cadastralNumber: estate.cadastralNumber,
        landArea: estate.landArea
    })
    return res.status(200).json({ newEstate });
}

const changeGarage = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!validateGarage(estate))
        return res.status(400).json({ message: 'Garage data problems' });

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, {
        gateHeight: estate.gateHeight,
        size: estate.size,
        $unset: {
            rooms: 1,
            floor: 1,
            livingArea: 1,
            series: 1,
            cadastralNumber: 1,
            landArea: 1,
            assignment: 1,
        }
    })
    return res.status(200).json({ newEstate });
}

const changeCafe = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!validateCafe(estate))
        return res.status(400).json({ message: 'Cafe data problems' });

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, {
        landArea: estate.landArea,
        floor: estate.floor,
        $unset: {
            rooms: 1,
            livingArea: 1,
            series: 1,
            cadastralNumber: 1,
            size: 1,
            gateHeight: 1,
            assignment: 1,
        }
    })
    return res.status(200).json({ newEstate });
}

const changeForest = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!validateForest(estate))
        return res.status(400).json({ message: 'Forest data problems' });

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, {
        landArea: estate.landArea,
        cadastralNumber: estate.cadastralNumber,
        $unset: {
            floor: 1,
            rooms: 1,
            livingArea: 1,
            series: 1,
            size: 1,
            gateHeight: 1,
            assignment: 1,
        }
    })
    return res.status(200).json({ newEstate });
}

const changeLandOnly = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!validateLandOnly(estate))
        return res.status(400).json({ message: 'Land only data problems' });

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, {
        landArea: estate.landArea,
        $unset: {
            rooms: 1,
            floor: 1,
            livingArea: 1,
            series: 1,
            size: 1,
            gateHeight: 1,
            cadastralNumber: 1,
            assignment: 1,
        }
    })
    return res.status(200).json({ newEstate });
}

const isValidLangText = (langText: any): boolean => {
    return Object.values(langText).every((value) => typeof value === 'string' && value.trim().length > 0);
};


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

    const candidate = await Estate.find({
        $or: [
            { 'name.lv': name.lv },
            { 'name.ru': name.ru },
            { 'name.en': name.en }
        ]
    }).countDocuments();

    return candidate <= 1;
}
