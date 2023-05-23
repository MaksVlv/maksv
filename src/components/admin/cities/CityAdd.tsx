import React, {ChangeEvent, useEffect, useState} from "react";
import { toast } from "react-toastify";
import axios from "axios";

interface City {
    lv: string,
    ru: string,
    en: string,
}
interface District {
    lv: string,
    ru: string,
    en: string,
}

interface CityAddProps {
    onCloseClick: () => void,
    onSave: () => void
}

export default function CityAdd({ onCloseClick, onSave }: CityAddProps) {


    const [city, setCity] = useState<City>({lv: '', en: '', ru: ''})

    const [districts, setDistricts] = useState<District[]>([{lv: '', en: '', ru: ''}]);

    const addDistrict = () => {
        setDistricts([...districts, {lv: '', en: '', ru: ''}]);
    };

    const removeDistrict = (index: number) => {
        if (districts.length === 1) {
            toast.error("You need to enter at least one district of this city!")
            return;
        }
        const newDistricts = [...districts];
        newDistricts.splice(index, 1);
        setDistricts(newDistricts);
    }

    const handleDistrictChange = (event: ChangeEvent<HTMLInputElement>, index: number, lan: "lv" | "ru" | "en") => {
        const newDistricts: District[] = [...districts];
        newDistricts[index][lan] = event.target.value;
        setDistricts(newDistricts);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        axios.post('city', { city, districts }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(_res => {
            toast.success("City added!");
            onSave();
            onCloseClick();
        }).catch(err => {
            toast.error(err.response.data.message || "Error occurred" );
        })
    };

    return (
        <>
            <div className="fixed inset-0 bg-gray-900 opacity-50" style={{ zIndex: 1 }}/>
            <div className="fixed inset-0 flex items-center justify-center z-10">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full" style={{maxHeight: "90vh", maxWidth: "800px", overflow: "auto"}}>
                    <div className="text-lg font-medium mb-4">Add new city/municipality & district/township</div>
                    <div className="mb-6">
                        <form onSubmit={handleSubmit}>
                            <div className="block text-gray-700 font-bold mb-2">City/municipality:</div>
                            <div className="mb-4 flex justify-between gap-3">
                                <div className={"flex-1"}>
                                    <input
                                        required={true}
                                        type="text"
                                        name="cityName-lv"
                                        id="cityName-lv"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter city name LV"
                                        value={city.lv}
                                        onChange={(e) => setCity({...city, lv: e.target.value})}
                                    />
                                </div>
                                <div className={"flex-1"}>
                                    <input
                                        required={true}
                                        type="text"
                                        name="cityName-ru"
                                        id="cityName-ru"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter city name RU"
                                        value={city.ru}
                                        onChange={(e) => setCity({...city, ru: e.target.value})}
                                    />
                                </div>
                                <div className={"flex-1"}>
                                    <input
                                        required={true}
                                        type="text"
                                        name="cityName-en"
                                        id="cityName-en"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter city name EN"
                                        value={city.en}
                                        onChange={(e) => setCity({...city, en: e.target.value})}
                                    />
                                </div>
                            </div>
                            <hr className={"mt-5 mb-6"}/>
                            {districts.map((district, index) => (
                                <div className="relative" key={index}>
                                    <div className="block text-gray-700 font-bold mb-2">District/township:</div>
                                    <div className="mb-4 flex justify-between gap-3">
                                        <div className={"flex-1"}>
                                            <input
                                                required={true}
                                                type="text"
                                                id={`district-${index}-lv`}
                                                name={`district-${index}-lv`}
                                                placeholder="Enter district name LV"
                                                value={district.lv}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
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
                                                value={district.ru}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
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
                                                value={district.en}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
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
                            <button type="button" onClick={addDistrict} className="inline-flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                            </button>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-4"
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

