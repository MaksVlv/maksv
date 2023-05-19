import React, {ChangeEvent, useEffect, useState} from "react";
import styles from '../styles/admin.module.scss';
import Upload from '../../service/Upload';
import HouseInputs from './HouseInputs';
import FLatInputs from './FLatInputs';
import LandInputs from './LandInputs';
import { toast } from "react-toastify";
import GoogleMapReact from 'google-map-react';
import axios from "axios";
import FormData from "form-data";


interface EstateAddProps {
    onCloseClick: () => void,
    onSave: () => void,
}

export default function EstateAdd({ onCloseClick, onSave }: EstateAddProps) {


    const [estate, setEstate] = useState<Estate>(emptyEstate);
    const [cities, setCities] = useState<City[]>([{ _id: '', name: { lv: '', ru: '', en: '' } }]);
    const [districts, setDistricts] = useState<District[]>([{ _id: '', name: { lv: '', ru: '', en: '' } }]);

    const [loading, setLoading] = useState<boolean>(false);


    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (!estate.location.lat && !estate.location.lng) {
            toast.error("Click location on map!")
            return;
        } else if (estate.images.length === 0) {
            toast.error("Please select images")
            return;
        } else if (!estate.mainImage.file) {
            toast.error("Please select main image")
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('mainImage', estate.mainImage.file);
        formData.append('estate', JSON.stringify({...estate, images: [], mainImage: ''}));

        axios.post("estate/add", formData, { headers: { "Content-Type": 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(res => {
            const imageRequests: any = [];
            for (let i = 0; i < estate.images.length; i++) {
                const formDataImages = new FormData();
                formDataImages.append('estate', JSON.stringify({...res.data, images: [], mainImage: ''}));
                formDataImages.append(`image`, estate.images[i].file);
                imageRequests.push(axios.post("estate/update?update=image", formDataImages, { headers: { "Content-Type": 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem("token")}` } }))
            }
            Promise.all(imageRequests).catch(_err => {
                toast.success("Not all images are uploaded, please check estate")
            }).finally(() => {
                toast.success("Estate added!")
                onSave();
                onCloseClick();
                setLoading(false);
            })
        }, err => {
            toast.error(err.response.data.message || "Error occurred" );
            setLoading(false);
        })
    };

    useEffect(() => {
        axios.get('city?size=10000').then(res => {
            setCities(res.data.data);
        }, _err => {
           toast.error("Error with loading cities, try again");
           onCloseClick();
        })
    }, [])

    const getDistricts = (cityId: string) => {
        axios.get(`city/district?city=${cityId}`).then(res => {
            setDistricts(res.data);
        }, _err => {
            toast.error("Error with loading districts, try again");
            onCloseClick();
        })
    }

    const changeType = (e: ChangeEvent<HTMLSelectElement>) => {
        const typeIndex = e.target.value;
        setEstate({
            ...estate,
            // @ts-ignore
            type: { lv: types[typeIndex].lv, ru: types[typeIndex].ru, en: types[typeIndex].en },
            rooms: '', floor: '', livingArea: '', landArea: '', cadastralNumber: '',
            series: {lv: '', ru: '', en: ''}
        })
    }

    const imagesChange = (files: Image[]) => {
        setEstate({ ...estate, images: files })
    }

    return (
        <>
            <div className="fixed inset-0 bg-gray-900 opacity-50" style={{ zIndex: 1 }}/>
            <div className="fixed inset-0 flex items-center justify-center z-10">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full relative" style={{maxHeight: "90vh", maxWidth: "800px", overflow: "auto"}}>
                    {loading &&
                        <>
                            <div className="fixed inset-0 bg-gray-900 opacity-50" style={{ zIndex: 20, height: "100%" }}/>
                            <div className={"justify-center items-center fixed"} style={{ zIndex: 500, left: "50%", top: "50%", transform: "translate(-50%. -50%)" }}>
                                <div className={styles.spinner}/>
                            </div>
                        </>
                    }
                    <div className="text-lg font-medium mb-4">Add new estate</div>
                    <div className="mb-6">
                        <form onSubmit={handleSubmit}>

                            <div className="block text-gray-700 font-bold mb-2">Name:</div>
                            <div className="mb-4 flex justify-between gap-3">
                                <div className={"flex-1"}>
                                    <input
                                        required={true}
                                        type="text"
                                        name="estateName-lv"
                                        id="estateName-lv"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter estate name LV"
                                        value={estate.name.lv}
                                        onChange={(e) => setEstate({...estate, name: { ...estate.name, lv: e.target.value }})}
                                    />
                                </div>
                                <div className={"flex-1"}>
                                    <input
                                        required={true}
                                        type="text"
                                        name="estateName-ru"
                                        id="estateName-ru"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter estate name RU"
                                        value={estate.name.ru}
                                        onChange={(e) => setEstate({...estate, name: { ...estate.name, ru: e.target.value }})}
                                    />
                                </div>
                                <div className={"flex-1"}>
                                    <input
                                        required={true}
                                        type="text"
                                        name="estateName-en"
                                        id="estateName-en"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter estate name EN"
                                        value={estate.name.en}
                                        onChange={(e) => setEstate({...estate, name: { ...estate.name, en: e.target.value }})}
                                    />
                                </div>
                            </div>

                            <div className="block text-gray-700 font-bold mb-2">Description:</div>
                            <div className="mb-4 flex flex-col justify-between gap-3">
                                <div className={"flex-1"}>
                                    <textarea
                                        required={true}
                                        name="estateDescription-lv"
                                        id="estateDescription-lv"
                                        className="flex-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        style={{ minHeight: "100px" }}
                                        placeholder="Enter estate description LV"
                                        value={estate.description.lv}
                                        onChange={(e) => setEstate({...estate, description: { ...estate.description, lv: e.target.value }})}
                                    />
                                </div>
                                <div className={"flex-1"}>
                                    <textarea
                                        required={true}
                                        name="estateDescription-ru"
                                        id="estateDescription-ru"
                                        className="flex-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        style={{ minHeight: "100px" }}
                                        placeholder="Enter estate description RU"
                                        value={estate.description.ru}
                                        onChange={(e) => setEstate({...estate, description: { ...estate.description, ru: e.target.value }})}
                                    />
                                </div>
                                <div className={"flex-1"}>
                                    <textarea
                                        required={true}
                                        name="estateDescription-en"
                                        id="estateDescription-en"
                                        className="flex-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        style={{ minHeight: "100px" }}
                                        placeholder="Enter estate description EN"
                                        value={estate.description.en}
                                        onChange={(e) => setEstate({...estate, description: { ...estate.description, en: e.target.value }})}
                                    />
                                </div>
                            </div>

                            <div className="block text-gray-700 font-bold mb-2">Price:</div>
                            <input
                                required={true}
                                type={"number"}
                                min={0}
                                name="estatePrice"
                                id="estatePrice"
                                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter estate price"
                                value={estate.price}
                                onChange={(e) => setEstate({...estate, price: Number(e.target.value) })}
                            />

                            <div className="block text-gray-700 font-bold mb-2">Rent?</div>
                            <div>
                                <label className={styles.switch}>
                                    <input type="checkbox" defaultChecked={estate.rent} onChange={() => setEstate({...estate, rent: !estate.rent})}/>
                                    <span className={styles.slider + " " + styles.round}/>
                                </label>
                            </div>

                            <div className="mt-4 block text-gray-700 font-bold mb-2">City:</div>
                            <div className="relative inline-block w-full">
                                <select
                                    required={true}
                                    name="estateCity"
                                    id="estateCity"
                                    className="block appearance-none w-full bg-white border focus:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    value={estate.city}
                                    onChange={(e) => {setEstate({...estate, city: e.target.value}); getDistricts(e.target.value)}}
                                >
                                    <option value="" disabled>Select estate city</option>
                                    {
                                        cities.map((city, i) => (
                                            <option value={city._id} key={i}>{city.name.lv}</option>
                                        ))
                                    }
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path
                                            d="M14.14 7.88l-4.95 4.95a1.5 1.5 0 01-2.12 0l-4.95-4.95a1.5 1.5 0 012.12-2.12L10 9.77l3.05-3.05a1.5 1.5 0 012.12 2.12z"/>
                                    </svg>
                                </div>
                            </div>

                            <div className="mt-4 block text-gray-700 font-bold mb-2">District:</div>
                            <div className="relative inline-block w-full mb-4">
                                <select
                                    required={true}
                                    name="estateDistrict"
                                    id="estateDistrict"
                                    className="block disabled:cursor-not-allowed appearance-none w-full bg-white border focus:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    value={estate.district}
                                    onChange={(e) => setEstate({...estate, district: e.target.value})}
                                    disabled={!estate.city}
                                >
                                    <option value="" disabled>Select estate district</option>
                                    {
                                        districts.map((district, i) => (
                                            <option value={district._id} key={i}>{district.name.lv}</option>
                                        ))
                                    }
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path
                                            d="M14.14 7.88l-4.95 4.95a1.5 1.5 0 01-2.12 0l-4.95-4.95a1.5 1.5 0 012.12-2.12L10 9.77l3.05-3.05a1.5 1.5 0 012.12 2.12z"/>
                                    </svg>
                                </div>
                            </div>

                            <div className="block text-gray-700 font-bold mb-2">Street:</div>
                            <input
                                required={true}
                                type="text"
                                name="estateStreet"
                                id="estateStreet"
                                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter estate street"
                                value={estate.street}
                                onChange={(e) => setEstate({...estate, street: e.target.value })}
                            />

                            <div style={{ height: '400px', width: '100%' }} className={"mt-4"}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: "" }}
                                    defaultCenter={{
                                        lat: 56.949802,
                                        lng: 24.175352
                                    }}
                                    defaultZoom={10}
                                    onClick={({ lat, lng }) => {setEstate({...estate, location: { lat, lng }})}}
                                    options={{fullscreenControl: false}}
                                >
                                    {estate.location.lat && estate.location.lng &&
                                        // @ts-ignore
                                    (<Marker lng={estate.location.lng} lat={estate.location.lat} text="My Marker"/>)
                                    }
                                </GoogleMapReact>
                            </div>

                            <div className="block text-gray-700 font-bold mt-6">Main image:</div>
                            <Upload one={true} onFileChange={(file: Image[]) => setEstate({...estate, mainImage: file[0]})} loading={(state: boolean) => setLoading(state)} />

                            <div className="block text-gray-700 font-bold mt-6">Images:</div>
                            <Upload onFileChange={(files: Image[]) => imagesChange(files)} loading={(state: boolean) => setLoading(state)} />

                            <hr className={"mt-5 mb-6"}/>

                            <div className="relative inline-block w-full mb-4">
                                <select
                                    required={true}
                                    name="estateType"
                                    id="estateType"
                                    className="block disabled:cursor-not-allowed appearance-none w-full bg-white border focus:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={(e) => changeType(e)}
                                    defaultValue={""}
                                >
                                    <option value="" disabled>Select estate type</option>
                                    {
                                        Object.keys(types).map((key, i) => (
                                            <option value={key} key={i}>{types[key].en}</option>
                                        ))
                                    }
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path
                                            d="M14.14 7.88l-4.95 4.95a1.5 1.5 0 01-2.12 0l-4.95-4.95a1.5 1.5 0 012.12-2.12L10 9.77l3.05-3.05a1.5 1.5 0 012.12 2.12z"/>
                                    </svg>
                                </div>
                            </div>

                            {estate.type.lv === "Mājas" && <HouseInputs onParamChange={(house) => {
                                setEstate({...estate, rooms: house.rooms, floor: house.floor, livingArea: house.livingArea, landArea: house.landArea})
                            }}/>}
                            {estate.type.lv === "Dzīvokļi" && <FLatInputs onParamChange={(flat) => {
                                setEstate({...estate, rooms: flat.rooms, floor: flat.floor, livingArea: flat.livingArea, series: flat.series})
                            }}/>}
                            {(estate.type.lv === "Rūpnīca" || estate.type.lv === "Zeme" || estate.type.lv === "Komerciālais īpašums")
                                && <LandInputs type={estate.type.en} onParamChange={(land) => {
                                    setEstate({...estate, landArea: land.landArea, cadastralNumber: land.cadastralNumber})
                            }}/>}
                            {(estate.type.lv === "Bēniņi, pagrabi" ||
                                estate.type.lv === "Darbnīcas, noliktavas, ražošanas telpas" ||
                                estate.type.lv === "Autostāvvietas")
                                &&
                                <div className={"flex flex-col"}>
                                    <div className="block text-gray-700 font-bold mb-4 text-center" style={{ textTransform: "uppercase" }}>{ estate.type.en }</div>
                                    <div className="block text-gray-700 font-bold mb-2">Land Area:</div>
                                    <input
                                        required={true}
                                        type={"number"}
                                        min={0}
                                        step={0.01}
                                        name="landArea"
                                        id="landArea"
                                        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter land area"
                                        value={estate.landArea}
                                        onChange={(e) => setEstate({...estate, landArea: e.target.value })}
                                    />
                                </div>
                            }
                            {(estate.type.lv === "Garāžas")
                                &&
                                <div className={"flex flex-col"}>
                                    <div className="block text-gray-700 font-bold mb-4 text-center" style={{ textTransform: "uppercase" }}>{ estate.type.en }</div>
                                    <div className="block text-gray-700 font-bold mb-2">Size:</div>
                                    <input
                                        required={true}
                                        type={"text"}
                                        min={0}
                                        name="landArea"
                                        id="landArea"
                                        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter size - 300x200"
                                        value={estate.size}
                                        onChange={(e) => setEstate({...estate, size: e.target.value })}
                                    />
                                    <div className="block text-gray-700 font-bold mb-2">Gate height:</div>
                                    <input
                                        required={true}
                                        type={"number"}
                                        min={0}
                                        step={0.01}
                                        name="landArea"
                                        id="landArea"
                                        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter gate height"
                                        value={estate.gateHeight}
                                        onChange={(e) => setEstate({...estate, gateHeight: Number(e.target.value) })}
                                    />
                                </div>
                            }
                            {(estate.type.lv === "Restorāni, kafejnīcas, biroji")
                            &&
                            <div className={"flex flex-col"}>
                                <div className="block text-gray-700 font-bold mb-4 text-center" style={{ textTransform: "uppercase" }}>{ estate.type.en }</div>
                                <div className="block text-gray-700 font-bold mb-2">Land Area:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    step={0.01}
                                    name="landArea"
                                    id="landArea"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter land area"
                                    value={estate.landArea}
                                    onChange={(e) => setEstate({...estate, landArea: e.target.value })}
                                />
                                <div className="block text-gray-700 font-bold mb-2">Floor:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="floor"
                                    id="floor"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter floor"
                                    value={estate.floor}
                                    onChange={(e) => setEstate({...estate, floor: e.target.value })}
                                />
                            </div>
                            }

                            <div className="flex justify-end relative">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-4 disabled:cursor-not-allowed"
                                    onClick={() => onCloseClick()}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

interface Image {
    file: {},
    preview: string
}

export interface Estate {
    name: {
        lv: string,
        ru: string,
        en: string,
    },
    description: {
        lv: string,
        ru: string,
        en: string,
    },
    price: number,
    rent: boolean,
    city: string,
    district: string,
    street: string,
    location: {
        lat: number,
        lng: number,
    },
    mainImage: Image,
    images: Image[],
    type: {
        lv: string,
        ru: string,
        en: string,
    },

    rooms?: string,
    livingArea?: string,
    floor?: string,
    series?: {
        lv: string,
        ru: string,
        en: string,
    },
    condition?: {
        lv: string,
        ru: string,
        en: string,
    },
    landArea?: string,
    cadastralNumber?: string,
    size?: string,
    gateHeight?: number,
}

export const emptyEstate: Estate = {
    name: {
        lv: '',
        ru: '',
        en: '',
    },
    description: {
        lv: '',
        ru: '',
        en: '',
    },
    price: 0,
    rent: false,
    city: '',
    district: '',
    street: '',
    location: {
        lat: 0,
        lng: 0,
    },
    images: [],
    mainImage: {
        file: {},
        preview: ''
    },
    type: {
        lv: '',
        ru: '',
        en: '',
    }
}

interface City {
    _id: string,
    name: {
        lv: string,
        ru: string,
        en: string
    }
}

interface District {
    _id: string,
    name: {
        lv: string,
        ru: string,
        en: string
    }
}

interface ITypes {
    [key: string]: {
        lv: string,
        ru: string,
        en: string,
    }
}

const types: ITypes = {
    '1': {
        lv: "Mājas",
        ru: "Дома",
        en: "Houses"
    },
    '2': {
        lv: "Dzīvokļi",
        ru: "Квартиры",
        en: "Flats"
    },
    '3': {
        lv: "Zeme",
        ru: "Земля",
        en: "Land"
    },
    '4': {
        lv: "Rūpnīca",
        ru: "Завод",
        en: "Factory"
    },
    '5': {
        lv: "Komerciālais īpašums",
        ru: "Коммерческий обьект",
        en: "Commercial object"
    },
    '6': {
        lv: "Bēniņi, pagrabi",
        ru: "Чердак, подвал",
        en: "Attic, basement"
    },
    '7': {
        lv: "Darbnīcas, noliktavas, ražošanas telpas",
        ru: "Цеха, склады, производственные помещения",
        en: "Workshops, warehouses, production facilities"
    },
    '8': {
        lv: "Garāžas",
        ru: "Гаражи",
        en: "Garages"
    },
    '9': {
        lv: "Autostāvvietas",
        ru: "Стоянки",
        en: "Parking"
    },
    '10': {
        lv: "Restorāni, kafejnīcas, biroji",
        ru: "Рестораны, кафе, офисы",
        en: "Restaurants, cafes, offices"
    }
}

const Marker = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "20px", height: "20px", color: "pink", position: "absolute", top: "-10px", left: "-10px" }}>
        <svg width="20" height="20" fill={"red"}>
            <circle cx="10" cy="10" r="10" />
        </svg>
    </div>
);

