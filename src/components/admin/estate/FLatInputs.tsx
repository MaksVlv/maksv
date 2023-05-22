import React, {ChangeEvent, useEffect, useState} from "react";


interface Flat {
    rooms: string,
    floor: string,
    livingArea: string,
    series: {
        lv: string,
        ru: string,
        en: string,
    },
}

interface IFlatInputs {
    onParamChange: (flat: Flat) => void
}

const FlatInputs = ({ onParamChange }: IFlatInputs) => {

    const [flat, setFlat] = useState<Flat>(emptyFlat);

    useEffect(() => {
        onParamChange(flat);
    }, [flat])

    const changeSeries = (e: ChangeEvent<HTMLSelectElement>) => {
        setFlat({...flat, series: series[e.target.value]})
    }

    return (
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
                value={flat.rooms}
                onChange={(e) => setFlat({...flat, rooms: e.target.value })}
            />
            <div className="block text-gray-700 font-bold mb-2">Floor:</div>
            <input
                required={true}
                type={"text"}
                name="flatFloor"
                id="flatFloor"
                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter house floors"
                value={flat.floor}
                onChange={(e) => setFlat({...flat, floor: e.target.value })}
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
                value={flat.livingArea}
                onChange={(e) => setFlat({...flat, livingArea: e.target.value })}
            />
            <div className="block text-gray-700 font-bold mb-2">Series: </div>
            <div className="relative inline-block w-full mb-4">
                <select
                    required={true}
                    name="estateType"
                    id="estateType"
                    className="block disabled:cursor-not-allowed appearance-none w-full bg-white border focus:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => changeSeries(e)}
                    defaultValue={""}
                >
                    <option value="" disabled>Select flat series</option>
                    <option value="1">103</option>
                    <option value="2">104</option>
                    <option value="3">119</option>
                    <option value="4">467</option>
                    <option value="5">602</option>
                    <option value="6">Pre-war house</option>
                    <option value="7">Lithuanian project</option>
                    <option value="8">Small apartment</option>
                    <option value="9">Reconstructed</option>
                    <option value="10">Special project</option>
                    <option value="11">Stalin project</option>
                    <option value="12">Khrushchyovka</option>
                    <option value="13">Private house</option>
                    <option value="14">Czech project</option>
                    <option value="15">New</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                            d="M14.14 7.88l-4.95 4.95a1.5 1.5 0 01-2.12 0l-4.95-4.95a1.5 1.5 0 012.12-2.12L10 9.77l3.05-3.05a1.5 1.5 0 012.12 2.12z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default FlatInputs;

const emptyFlat = {
    floor: '',
    rooms: '',
    livingArea: '',
    series: {
        lv: '',
        ru: '',
        en: ''
    }
}

interface ISeries {
    [key: string]: {
        [key: string]: string,
        lv: string,
        ru: string,
        en: string,
    }
}

export const series: ISeries = {
    '1': {
        lv: "103",
        ru: "103",
        en: "103",
    },
    '2': {
        lv: "104",
        ru: "104",
        en: "104",
    },
    '3': {
        lv: "119",
        ru: "119",
        en: "119",
    },
    '4': {
        lv: "467",
        ru: "467",
        en: "467",
    },
    '5': {
        lv: "602",
        ru: "602",
        en: "602",
    },
    '6': {
        lv: "Pirmskara laika māja",
        ru: "Довоенный дом",
        en: "Pre-war house",
    },
    '7': {
        lv: "Lietuviešu projekts",
        ru: "Литовский проект",
        en: "Lithuanian project",
    },
    '8': {
        lv: "Mazģimeņu",
        ru: "Малосемейка",
        en: "Small apartment",
    },
    '9': {
        lv: "Renovēta",
        ru: "Реконструированный",
        en: "Reconstructed",
    },
    '10': {
        lv: "Specprojekts",
        ru: "Спецпроект",
        en: "Special project",
    },
    '11': {
        lv: "Staļina",
        ru: "Сталинка",
        en: "Stalin project",
    },
    '12': {
        lv: "Hruščovka",
        ru: "Хрущёвка",
        en: "Khrushchyovka",
    },
    '13': {
        lv: "Privātmāja",
        ru: "Частный дом",
        en: "Private house",
    },
    '14': {
        lv: "Čehu projekts",
        ru: "Чешский проект",
        en: "Czech project",
    },
    '15': {
        lv: "Jaunais projekts",
        ru: "Новостройка",
        en: "New project",
    }
}
