import React, { useEffect, useState } from "react";


interface Land {
    landArea: string,
    cadastralNumber: string,
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
        </div>
    );
};

export default LandInputs;

const emptyLand = {
    landArea: '',
    cadastralNumber: '',
}
