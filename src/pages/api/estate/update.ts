import cloudinary from 'cloudinary';
import formidable from 'formidable';
import {NextApiRequest, NextApiResponse} from 'next';
import Estate from '@/models/Estate';
import District from '@/models/District';
import jwt from "jsonwebtoken";

cloudinary.v2.config({
    cloud_name: "dv139dkum",
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

        const update = req.query.update
        if (!update)
            return res.status(201).json({ message: "Update query is mandatory" });

        // @ts-ignore
        const user = await jwt.verify(token, process.env.JWT_SECRET);

        if (!user.isAdmin)
            return res.status(405).json({ message: "user is not admin" });


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
                const candidate = await Estate.findById(id)

                if (!candidate)
                    return res.status(400).json({message: 'No estate with this id'});

                estate.landArea = Number(estate.landArea);
                estate.livingArea = Number(estate.livingArea);
                estate.rooms = Number(estate.rooms);
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
                    case "mainImage":
                        return await addMainImage(estate, files, req, res);
                        break;
                    case "image":
                        return await addImage(estate, files, req, res);
                        break;
                    case "imageDelete":
                        const url = fields.url as string
                        return await deleteImage(estate, url, req, res);
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

    const estate = await Estate.findById(estateObj._id);

    // MAIN image delete
    // @ts-ignore
    const publicId = estate.mainImage.split("/").pop().split(".")[0];
    // @ts-ignore
    await cloudinary.uploader.destroy(publicId);

    // MAIN image add
    // @ts-ignore
    let result = await cloudinary.uploader.upload(files.mainImage.filepath);
    estate.mainImage = result.secure_url;
    await estate.save();

    return res.status(200).json({ url: result.secure_url });
}

const addImage = async (estateObj: any, files: formidable.Files, req: NextApiRequest, res: NextApiResponse) => {

    // image add
    const fileNames = Object.keys(files)
    let imageUrls = [];

    for (let i = 0; i < fileNames.length; i++) {
        // @ts-ignore
        let result = await cloudinary.uploader.upload(files[fileNames[i]].filepath);
        if (!result.secure_url)
            throw "no image secure_url"

        imageUrls.push(result.secure_url);
    }

    const estate = await Estate.findOneAndUpdate(
        { _id: estateObj._id },
        { $push: { images: { $each: imageUrls } } },
        { new: true }
    );

    return res.status(200).json({ images: estate.images });
}

const deleteImage = async (estateObj: any, url: string, req: NextApiRequest, res: NextApiResponse) => {

    if (!url)
        return res.status(400).json({ message: 'Image url is mandatory' });

    const estate = await Estate.findById(estateObj._id);

    const index = estate.images.indexOf(url)
    if (index === -1) {
        return res.status(400).json({ message: 'There is no img with this url in this estate' });
    }

    // @ts-ignore
    const publicId = url.split("/").pop().split(".")[0];

    // @ts-ignore
    await cloudinary.uploader.destroy(publicId);

    const tmpArr = estate.images;
    tmpArr.splice(index, 1);

    estate.images = tmpArr;

    await estate.save();

    return res.status(200).json({ images: estate.images });
    // return res.status(200).json({ url: result.secure_url });
}

const changeName = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!isValidLangText(estate.name))
        return res.status(400).json({ message: 'Name is mandatory' });

    if (!await validateEstateName(estate.name))
        return res.status(400).json({ message: "Estate with this name already created" })

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, { name: estate.name })
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
    if (!estate.rent || typeof estate.rent !== 'boolean')
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
        floor: estate.floor
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
        floor: estate.floor
    })
    return res.status(200).json({ newEstate });
}

const changeLand = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!validateLand(estate))
        return res.status(400).json({ message: 'Land data problems' });

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
        size: estate.size
    })
    return res.status(200).json({ newEstate });
}

const changeCafe = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!validateCafe(estate))
        return res.status(400).json({ message: 'Cafe data problems' });

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, {
        landArea: estate.landArea,
        floor: estate.floor
    })
    return res.status(200).json({ newEstate });
}

const changeLandOnly = async (estate: any, req: NextApiRequest, res: NextApiResponse) => {
    if (!validateLandOnly(estate))
        return res.status(400).json({ message: 'Land only data problems' });

    const newEstate = await Estate.findOneAndUpdate({ _id: estate._id }, {
        landArea: estate.landArea
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

    const candidate = await Estate.find({
        $or: [
            { 'name.lv': name.lv },
            { 'name.ru': name.ru },
            { 'name.en': name.en }
        ]
    }).countDocuments();

    return candidate <= 1;
}
