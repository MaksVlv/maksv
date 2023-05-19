import React, {ChangeEvent, useEffect, useState} from "react";
import styles from '../styles/admin.module.scss';
import { toast } from "react-toastify";
import { IEstate } from './Estate';
import axios from "axios";
import GoogleMapReact from "google-map-react";
import Upload from "../../service/Upload";
import { series } from "./FLatInputs";
import FormData from "form-data";


interface EstateUpdateProps {
    estateOld: IEstate,
    onCloseClick: () => void,
    onUpdate: () => void,
}

export default function EstateUpdate({ estateOld, onCloseClick, onUpdate }: EstateUpdateProps) {

    const [loading, setLoading] = useState(true);
    const [estate, setEstate] = useState<IEstate>(estateOld);
    const [districts, setDistricts] = useState<IDistrict[]>([]);
    const [cities, setCities] = useState<ICity[]>([{ _id: '', name: { lv: '', ru: '', en: '' } }]);


    useEffect(() => {
        axios.get(`estate/info?id=${estateOld._id}`).then(res => {
            setEstate(res.data)
            setLoading(false);
        }, err => {
            toast.error(err.response.data.message || "Error occurred")
            onCloseClick();
        })
        axios.get('city?size=10000').then(res => {
            setCities(res.data.data);
        }, _err => {
            toast.error("Error with loading cities, try again");
            onCloseClick();
        })
        getDistricts(estate.city._id);
    }, [])

    const deleteEstate = () => {
        if (confirm("Do you really want to delete " + estate.name.lv + "?")) {
            setLoading(true);
            axios.delete(`estate?id=${estate._id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(_res => {
                toast.success("Estate deleted - " + estate.name.lv)
                onUpdate();
                onCloseClick();
            }, err => {
                toast.error(err.response.data.message || "Error occurred")
            }).finally(() => setLoading(false));
        }
    }

    const handleNameSubmit = (e: React.SyntheticEvent, update: string) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('estate', JSON.stringify({...estate, images: [], mainImage: ''}));
        axios.post(`estate/update?update=${update}`, formData, { headers: { "Content-Type": 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(_res => {
            toast.success(`Estate ${update} updated - ` + estate.name.lv)
            onUpdate();
        }, err => {
            toast.error(err.response.data.message || "Error occurred")
        }).finally(() => setLoading(false));
    }

    const getDistricts = (cityId: string) => {
        setEstate({...estate, city: { ...estate.city, _id: cityId }, district: { name: { lv: '', ru: '', en: ''}, _id: '' }});
        axios.get(`city/district?city=${cityId}`).then(res => {
            setDistricts(res.data);
        }, _err => {
            toast.error("Error with loading districts, try again");
            onCloseClick();
        })
    }

    const mainImageChange = (file: Image) => {
        if (!file)
            return;
        if (file && file.preview === estate.mainImage)
            return;
        setLoading(true);
        toast.warn("Sending image");
        const formData = new FormData();
        formData.append('estate', JSON.stringify({...estate, images: [], mainImage: ''}));
        formData.append('mainImage', file.file);
        axios.post(`estate/update?update=mainImage`, formData, { headers: { "Content-Type": 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(res => {
            toast.success(`Estate main image updated - ` + estate.name.lv)
            onUpdate();
            setEstate({...estate, mainImage: res.data.url })
        }, err => {
            toast.error(err.response.data.message || "Error occurred")
        }).finally(() => setLoading(false));
    }

    const imagesChange = (files: Image[], length: number | undefined) => {
        if (typeof length === 'undefined')
            return;
        setLoading(true);
        toast.warn("Sending image/s");

        let start = files.length - length - 1
        const imageRequests: any = [];
        for (let i = start; i < files.length; i++) {
            const formDataImages = new FormData();
            formDataImages.append('estate', JSON.stringify({...estate, images: [], mainImage: ''}));
            formDataImages.append(`image`, files[i].file);
            imageRequests.push(axios.post("estate/update?update=image", formDataImages, { headers: { "Content-Type": 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem("token")}` } }))
        }
        Promise.all(imageRequests).then(_res => {
            axios.get(`estate/info?id=${estateOld._id}`).then(res => {
                // @ts-ignore
                setEstate({...estate, images: res.data.images })
                setLoading(false);
            })
        }).catch(_err => {
            toast.success("Not all images are uploaded, please check estate")
            setLoading(false);
        })
    }

    const imagesDelete = (files: Image[], url: string) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('estate', JSON.stringify({...estate, images: [], mainImage: ''}));
        formData.append('url', url);
        axios.post(`estate/update?update=imageDelete`, formData, { headers: { "Content-Type": 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(res => {
            toast.success(`Estate image deleted - ` + estate.name.lv)
            // @ts-ignore
            setEstate({...estate, images: res.data.images })
        }, err => {
            toast.error(err.response.data.message || "Error occurred")
        }).finally(() => setLoading(false));
    }

    const changeSeries = (e: ChangeEvent<HTMLSelectElement>) => {
        setEstate({...estate, series: series[e.target.value]})
    }

    if (loading)
        return (
            <>
                <div className="fixed inset-0 bg-gray-900 opacity-50" style={{ zIndex: 1 }}/>
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className={styles.spinner} />
                </div>
            </>
        )


    return (
        <>
            <div className="fixed inset-0 bg-gray-900 opacity-50" style={{ zIndex: 1 }}/>
            <div className="fixed inset-0 flex items-center justify-center z-10">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full relative" style={{maxHeight: "90vh", maxWidth: "800px", overflow: "auto"}}>
                    <svg onClick={deleteEstate} className={styles.delete} xmlns="http://www.w3.org/2000/svg" fill={"none"} width="24" height="24" viewBox="0 0 24 24">
                        <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
                    </svg>
                    <div className="text-lg font-medium mb-4">Update estate</div>
                    <div className="mb-6">
                        <form onSubmit={(e: React.SyntheticEvent) => handleNameSubmit(e, "name")}>
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
                                <div className="flex justify-end relative">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        <hr className={"mt-6 mb-6"}/>
                        <form onSubmit={(e: React.SyntheticEvent) => handleNameSubmit(e, "description")}>
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
                                <div className="flex justify-end relative">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        <hr className={"mt-6 mb-6"}/>
                        <form onSubmit={(e: React.SyntheticEvent) => handleNameSubmit(e, "price")}>
                            <div className="block text-gray-700 font-bold mb-2">Price:</div>
                            <div className="mb-4 flex justify-between gap-3">
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    step={0.01}
                                    name="estatePrice"
                                    id="estatePrice"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter estate price"
                                    value={estate.price}
                                    onChange={(e) => setEstate({...estate, price: Number(e.target.value) })}
                                />
                                <div className="flex justify-end relative">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        <hr className={"mt-6 mb-6"}/>
                        <form onSubmit={(e: React.SyntheticEvent) => handleNameSubmit(e, "rent")}>
                            <div className="block text-gray-700 font-bold mb-2">Rent?</div>
                            <div className="mb-4 flex justify-between gap-3">
                                <label className={styles.switch}>
                                    <input type="checkbox" defaultChecked={estate.rent} onChange={() => setEstate({...estate, rent: !estate.rent})}/>
                                    <span className={styles.slider + " " + styles.round}/>
                                </label>
                                <div className="flex justify-end relative">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        <hr className={"mt-6 mb-6"}/>
                        <form onSubmit={(e: React.SyntheticEvent) => handleNameSubmit(e, "location")}>
                            <div className="mt-4 block text-gray-700 font-bold mb-2">City:</div>
                            <div className="relative inline-block w-full">
                                <select
                                    required={true}
                                    name="estateCity"
                                    id="estateCity"
                                    className="block appearance-none w-full bg-white border focus:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    value={estate.city._id}
                                    onChange={(e) => {getDistricts(e.target.value)}}
                                >
                                    <option value="" disabled>Select estate city</option>
                                    {
                                        cities.map((city, i) => (
                                            <option value={city._id} key={i + city._id}>{city.name.lv}</option>
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
                                    value={estate.district._id}
                                    onChange={(e) => setEstate({...estate, district: { ...estate.district, _id: e.target.value}})}
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
                            <div style={{ height: '400px', width: '100%' }} className={"mt-4 mb-6"}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: "" }}
                                    defaultCenter={{
                                        lat: estate.location.lat,
                                        lng: estate.location.lng
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
                            <div className="flex justify-end relative">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        <hr className={"mt-6 mb-6"}/>
                        <div className="block text-gray-700 font-bold mt-6">Main image:</div>
                        <Upload one={true} onFileChange={(file: Image[]) => mainImageChange(file[0])} filesOld={[estate.mainImage]} deleteImg={false} loading={(state: boolean) => setLoading(state)} />

                        <div className="block text-gray-700 font-bold mt-6">Images:</div>
                        <Upload onFileChange={(files: Image[], length: number | undefined) => imagesChange(files, length)} filesOld={estate.images} onDeleteImg={(files: Image[], url: string) => imagesDelete(files, url)} loading={(state: boolean) => setLoading(state)} />

                        <hr className={"mt-6 mb-6"}/>

                        {estate.type.lv === "Mājas" &&
                        <form onSubmit={(e: React.SyntheticEvent) => handleNameSubmit(e, "house")}>
                            <div className={"flex flex-col"}>
                                <div className="block text-gray-700 font-bold mb-4 text-center">HOUSE</div>
                                <div className="block text-gray-700 font-bold mb-2">Rooms:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="houseRooms"
                                    id="houseRooms"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter house rooms"
                                    value={estate.rooms}
                                    onChange={(e) => setEstate({...estate, rooms: e.target.value })}
                                />
                                <div className="block text-gray-700 font-bold mb-2">Floors:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="houseFloors"
                                    id="houseFloors"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter house floors"
                                    value={estate.floor}
                                    onChange={(e) => setEstate({...estate, floor: e.target.value })}
                                />
                                <div className="block text-gray-700 font-bold mb-2">Living area:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    step={0.01}
                                    name="houseLivingArea"
                                    id="houseLivingArea"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter house living area"
                                    value={estate.livingArea}
                                    onChange={(e) => setEstate({...estate, livingArea: e.target.value })}
                                />
                                <div className="block text-gray-700 font-bold mb-2">Land area:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    step={0.01}
                                    name="houseLandArea"
                                    id="houseLandArea"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter house land area"
                                    value={estate.landArea}
                                    onChange={(e) => setEstate({...estate, landArea: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end relative">
                                <button
                                    type="submit"
                                    className="mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        }
                        {estate.type.lv === "Dzīvokļi" &&
                        <form onSubmit={(e: React.SyntheticEvent) => handleNameSubmit(e, "flat")}>
                            <div className={"flex flex-col"}>
                                <div className="block text-gray-700 font-bold mb-4 text-center">FLAT</div>
                                <div className="block text-gray-700 font-bold mb-2">Rooms:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="flatRooms"
                                    id="flatRooms"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter flat rooms"
                                    value={estate.rooms}
                                    onChange={(e) => setEstate({...estate, rooms: e.target.value })}
                                />
                                <div className="block text-gray-700 font-bold mb-2">Floor:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="flatFloor"
                                    id="flatFloor"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter house floors"
                                    value={estate.floor}
                                    onChange={(e) => setEstate({...estate, floor: e.target.value })}
                                />
                                <div className="block text-gray-700 font-bold mb-2">Living area:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    step={0.01}
                                    name="flatLivingArea"
                                    id="flatLivingArea"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter house living area"
                                    value={estate.livingArea}
                                    onChange={(e) => setEstate({...estate, livingArea: e.target.value })}
                                />
                                <div className="block text-gray-700 font-bold mb-2">Series: </div>
                                <div className="relative inline-block w-full mb-4">
                                    <select
                                        required={true}
                                        name="estateType"
                                        id="estateType"
                                        className="block disabled:cursor-not-allowed appearance-none w-full bg-white border focus:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                        onChange={(e) => changeSeries(e)}
                                        defaultValue={Object.keys(series).findIndex(key => series[key].en === estate.series?.en) + 1}
                                    >
                                        <option value="" disabled>Select flat series</option>
                                        {Object.keys(series).map((key, i) => (
                                            <option value={key}>{series[key].en}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path
                                                d="M14.14 7.88l-4.95 4.95a1.5 1.5 0 01-2.12 0l-4.95-4.95a1.5 1.5 0 012.12-2.12L10 9.77l3.05-3.05a1.5 1.5 0 012.12 2.12z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end relative">
                                <button
                                    type="submit"
                                    className="mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        }
                        {(estate.type.lv === "Rūpnīca" || estate.type.lv === "Zeme" || estate.type.lv === "Komerciālais īpašums") &&
                        <form onSubmit={(e: React.SyntheticEvent) => handleNameSubmit(e, "land")}>
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
                                <div className="block text-gray-700 font-bold mb-2">Cadastral number:</div>
                                <input
                                    required={true}
                                    type={"number"}
                                    min={0}
                                    name="landCadastralNumber"
                                    id="landCadastralNumber"
                                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter land cadastral number"
                                    value={estate.cadastralNumber}
                                    onChange={(e) => setEstate({...estate, cadastralNumber: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end relative">
                                <button
                                    type="submit"
                                    className="mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        }
                        {(estate.type.lv === "Bēniņi, pagrabi" ||
                            estate.type.lv === "Darbnīcas, noliktavas, ražošanas telpas" ||
                            estate.type.lv === "Autostāvvietas")
                        &&
                        <form onSubmit={(e: React.SyntheticEvent) => handleNameSubmit(e, "landOnly")}>
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
                            <div className="flex justify-end relative">
                                <button
                                    type="submit"
                                    className="mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        }
                        {(estate.type.lv === "Garāžas")
                        &&
                        <form onSubmit={(e: React.SyntheticEvent) => handleNameSubmit(e, "garage")}>
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
                            <div className="flex justify-end relative">
                                <button
                                    type="submit"
                                    className="mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        }
                        {(estate.type.lv === "Restorāni, kafejnīcas, biroji")
                        &&
                        <form onSubmit={(e: React.SyntheticEvent) => handleNameSubmit(e, "cafe")}>
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
                            <div className="flex justify-end relative">
                                <button
                                    type="submit"
                                    className="mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        }

                    </div>
                    <div className="flex justify-end relative">
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-4 disabled:cursor-not-allowed"
                            onClick={() => onCloseClick()}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

interface ICity {
    _id: string,
    name: {
        lv: string,
        ru: string,
        en: string
    },
}

interface IDistrict {
    _id: string,
    name: {
        lv: string,
        ru: string,
        en: string
    }
}

interface Image {
    file: {},
    preview: string
}

const Marker = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "20px", height: "20px", color: "pink", position: "absolute", top: "-10px", left: "-10px" }}>
        <svg width="20" height="20" fill={"red"}>
            <circle cx="10" cy="10" r="10" />
        </svg>
    </div>
);
