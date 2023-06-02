import React, {ChangeEvent, useEffect, useState} from "react";


interface Land {
    landArea: string,
    cadastralNumber: string,
    assignment?: {
        lv: string,
        ru: string,
        en: string
    },
    livingArea?: string
}

interface ILandInputs {
    onParamChange: (flat: Land) => void,
    type: string,
}

const LandInputs = ({ onParamChange, type }: ILandInputs) => {

    const [land, setLand] = useState<Land>(emptyLand);

    useEffect(() => {
        onParamChange(land);
    }, [land])

    const changeAssignment = (e: ChangeEvent<HTMLSelectElement>) => {
        setLand({...land, assignment: assignment[e.target.value]})
    }

    return (
        <div className={"flex flex-col"}>
            <div className="block text-gray-700 font-bold mb-4 text-center" style={{ textTransform: "uppercase" }}>{ type }</div>
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
                value={land.landArea}
                onChange={(e) => setLand({...land, landArea: e.target.value })}
            />
            {type === "Commercial object" &&
                <div className={"mb-4"}>
                    <div className="block text-gray-700 font-bold mb-2">Room area:</div>
                    <input
                        type={"number"}
                        min={0}
                        step={0.01}
                        name="livingArea"
                        id="livingArea"
                        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter room area"
                        value={land.livingArea}
                        onChange={(e) => setLand({...land, livingArea: e.target.value })}
                    />
                </div>
            }
            <div className="block text-gray-700 font-bold mb-2">Cadastral number:</div>
            <input
                required={true}
                type={"number"}
                min={0}
                name="landCadastralNumber"
                id="landCadastralNumber"
                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter land cadastral number"
                value={land.cadastralNumber}
                onChange={(e) => setLand({...land, cadastralNumber: e.target.value })}
            />
            {type === "Land" &&
                <div className={"mb-4"}>
                    <div className="block text-gray-700 font-bold mb-2">Assignment: </div>
                    <div className="relative inline-block w-full mb-4">
                        <select
                            required={true}
                            name="estateType"
                            id="estateType"
                            className="block disabled:cursor-not-allowed appearance-none w-full bg-white border focus:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => changeAssignment(e)}
                            defaultValue={""}
                        >
                            <option value="" disabled>Select land assignment</option>
                            {Object.keys(assignment).map((key: string, i:number) =>
                                <option value={key} key={i}>{assignment[key].lv}</option>
                            )

                            }
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path
                                    d="M14.14 7.88l-4.95 4.95a1.5 1.5 0 01-2.12 0l-4.95-4.95a1.5 1.5 0 012.12-2.12L10 9.77l3.05-3.05a1.5 1.5 0 012.12 2.12z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default LandInputs;

const emptyLand = {
    landArea: '',
    cadastralNumber: '',
    livingArea: '0'
}

interface IAssignment {
    [key: string]: {
        [key: string]: string,
        lv: string,
        ru: string,
        en: string,
    }
}

export const assignment: IAssignment = {
    '1': {
        lv: "Lauksaimniecības zeme",
        ru: "Сельскохозяйственая земля",
        en: "Agricultural land",
    },
    '2': {
        lv: "Komerciāla apbūve",
        ru: "Коммерческая застройка",
        en: "Commercial building",
    },
    '3': {
        lv: "Vasarnīcas zemes gabals, dārzs",
        ru: "Дачный участок, огород",
        en: "Cottage plot, garden",
    },
    '4': {
        lv: "Fermeru saimniecības",
        ru: "Под фермерское хозяйство",
        en: "For farming",
    },
    '5': {
        lv: "Autostāvvietu, garāžu būvēšanai",
        ru: "Под автостоянки, гаражи",
        en: "For parking lots, garages",
    },
    '6': {
        lv: "Daudzstāvu būve",
        ru: "Многоэтажное строительство",
        en: "High-rise construction",
    },
    '7': {
        lv: "Zeme privātmājas būvēšanai",
        ru: "Земля под частный дом",
        en: "Land for private house",
    },
    '8': {
        lv: "Zemes gabals ciemata",
        ru: "Участок под поселок",
        en: "Land for the village",
    },
    '9': {
        lv: "Cits",
        ru: "Другое",
        en: "Another",
    },
}
