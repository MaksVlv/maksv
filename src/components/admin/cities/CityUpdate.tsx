import React, { ChangeEvent, useEffect, useState } from "react";
import styles from '../styles/admin.module.scss';
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

interface District {
    name: {
        lv: string,
        ru: string,
        en: string,
    },
    _id?: string
}
interface City {
    city: {
        lv: string
        ru: string,
        en: string,
    },
    _id?: string,
    districts: District[]
}

interface CityUpdateProps {
    cityId: string,
    onCloseClick: () => void,
    onUpdate: () => void,
}

export default function CityUpdate({ cityId, onCloseClick, onUpdate }: CityUpdateProps) {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState<City>({
        city: {
            lv: '',
            ru: '',
            en: '',
        },
        _id: cityId,
        districts: [{ name: {lv: '', ru: '', en: ''}, _id: '' }]
    });


    useEffect(() => {
        axios.get(`city/info?id=${cityId}`).then(res => {
            setCity({
                ...city,
                city: {
                    lv: res.data.name.lv,
                    ru: res.data.name.ru,
                    en: res.data.name.en
                },
                districts: res.data.districts
            })
            setLoading(false);
        }, err => {
            toast.error(err.response.data.message || "Error occurred")
            onCloseClick();
        })
    }, [])


    const handleDistrictChange = (event: ChangeEvent<HTMLInputElement>, index: number, lan: "lv" | "ru" | "en") => {
        const newDistricts: District[] = [...city.districts];
        newDistricts[index].name[lan] = event.target.value;
        setCity({ ...city, districts: newDistricts});
    }

    const removeDistrict = (index: number) => {
        if (city.districts.length === 1) {
            toast.error("You need to save at least one district of this city!")
            return;
        }


        if (confirm("Do you really want to delete " + city.districts[index].name.lv + " district?")) {
            axios.delete(`city/district?id=${city.districts[index]._id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(_res => {
                toast.success("District deleted!")
                const newDistricts = [...city.districts];
                newDistricts.splice(index, 1);
                setCity({ ...city, districts: newDistricts });
            }, err => {
                if (err.response?.status === 401) {
                    toast.error("Please renew session!")
                    localStorage.removeItem('token');
                    router.push('/admin/login', '/admin/login', { locale: 'lv' });
                    return;
                }
                toast.error(err.response?.data.message || "Error occurred")
            })
        }
    }

    const addDistrict = () => {
        setCity({ ...city, districts: [...city.districts, { name: { lv: '', ru: '', en: '' } }] })
    }

    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        axios.post('city/info', city, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(_res => {
            toast.success("City updated!")
            onUpdate();
            onCloseClick();
        }, err => {
            if (err.response?.status === 401) {
                toast.error("Please renew session!")
                localStorage.removeItem('token');
                router.push('/admin/login', '/admin/login', { locale: 'lv' });
                return;
            }
            toast.error(err.response?.data.message || "Error occurred")
        })
    }

    const deleteCity = () => {
        if (confirm("Do you really want to delete " + city.city.lv + " city?")) {
            axios.delete(`city/info?id=${city._id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(_res => {
                toast.success(city.city.lv + " city deleted!")
                onUpdate();
                onCloseClick();
            }, err => {
                if (err.response?.status === 401) {
                    toast.error("Please renew session!")
                    localStorage.removeItem('token');
                    router.push('/admin/login', '/admin/login', { locale: 'lv' });
                    return;
                }
                toast.error(err.response?.data.message || "Error occurred")
            })
        }
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
                <div className="bg-white shadow-lg p-8 w-full relative" style={{maxHeight: "90vh", maxWidth: "800px", overflow: "auto"}}>
                    <svg onClick={deleteCity} className={styles.delete} xmlns="http://www.w3.org/2000/svg" fill={"none"} width="24" height="24" viewBox="0 0 24 24">
                        <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
                    </svg>
                    <div className="text-lg font-medium mb-4">Atjaunināt pilsēta/novads & pagasts/mikrorajons</div>
                    <div className="mb-6">
                        <form onSubmit={onSubmit}>
                            <div className="block text-gray-700 font-bold mb-2">Pilsēta/novads:</div>
                            <div className="mb-4 flex justify-between gap-3">
                                <div className={"flex-1"}>
                                    <input
                                        required={true}
                                        type="text"
                                        name="cityName-lv"
                                        id="cityName-lv"
                                        className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter city name LV"
                                        value={city.city.lv}
                                        onChange={(e) => setCity({...city, city: { ...city.city, lv: e.target.value}})}
                                    />
                                </div>
                                <div className={"flex-1"}>
                                    <input
                                        required={true}
                                        type="text"
                                        name="cityName-ru"
                                        id="cityName-ru"
                                        className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter city name RU"
                                        value={city.city.ru}
                                        onChange={(e) => setCity({...city, city: { ...city.city, ru: e.target.value}})}
                                    />
                                </div>
                                <div className={"flex-1"}>
                                    <input
                                        required={true}
                                        type="text"
                                        name="cityName-en"
                                        id="cityName-en"
                                        className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter city name EN"
                                        value={city.city.en}
                                        onChange={(e) => setCity({...city, city: { ...city.city, en: e.target.value}})}
                                    />
                                </div>
                            </div>
                            <hr className={"mt-5 mb-6"}/>
                            {city.districts.map((district, index) => (
                                <div className="relative" key={index}>
                                    <div className="block text-gray-700 font-bold mb-2">Pagasts/mikrorajons:</div>
                                    <div className="mb-4 flex justify-between gap-3">
                                        <div className={"flex-1"}>
                                            <input
                                                required={true}
                                                type="text"
                                                id={`district-${index}-lv`}
                                                name={`district-${index}-lv`}
                                                placeholder="Enter district name LV"
                                                value={district.name.lv}
                                                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                                                onChange={(event) => handleDistrictChange(event, index, "lv")}
                                            />
                                        </div>
                                        <div className={"flex-1"}>
                                            <input
                                                required={true}
                                                type="text"
                                                id={`district-${index}-ru`}
                                                name={`district-${index}-ru`}
                                                placeholder="Enter district name RU"
                                                value={district.name.ru}
                                                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                                                onChange={(event) => handleDistrictChange(event, index, "ru")}
                                            />
                                        </div>
                                        <div className={"flex-1"}>
                                            <input
                                                required={true}
                                                type="text"
                                                id={`district-${index}-en`}
                                                name={`district-${index}-en`}
                                                placeholder="Enter district name EN"
                                                value={district.name.en}
                                                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                                                onChange={(event) => handleDistrictChange(event, index, "en")}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="absolute top-0 right-0 h-50 px-2 text-gray-500 hover:text-red-500"
                                            onClick={() => removeDistrict(index)}
                                        >
                                            <svg className="h-8 w-6 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm9.707 5.707a1 1 0 010 1.414L11.414 13l1.293 1.293a1 1 0 01-1.414 1.414L10 14.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 13l-1.293-1.293a1 1 0 011.414-1.414L10 11.586l1.293-1.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addDistrict} className="inline-flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 hover:bg-gray-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                            </button>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 ml-4"
                                    onClick={() => onCloseClick()}
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

