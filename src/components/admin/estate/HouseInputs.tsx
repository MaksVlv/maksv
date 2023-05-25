import React, { useEffect, useState } from "react";


interface House {
    rooms: string,
    floor: string,
    livingArea: string,
    landArea: string,
    cadastralNumber?: string
}

interface IHouseInputs {
    onParamChange: (house: House) => void
}

const HouseInputs = ({ onParamChange }: IHouseInputs) => {

    const [house, setHouse] = useState<House>(emptyHouse);

    useEffect(() => {
        onParamChange(house);
    }, [house])

    return (
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
                value={house.rooms}
                onChange={(e) => setHouse({...house, rooms: e.target.value })}
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
                value={house.floor}
                onChange={(e) => setHouse({...house, floor: e.target.value })}
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
                value={house.livingArea}
                onChange={(e) => setHouse({...house, livingArea: e.target.value })}
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
                value={house.landArea}
                onChange={(e) => setHouse({...house, landArea: e.target.value })}
            />
            <div className="block text-gray-700 font-bold mb-2">Cadastral number:</div>
            <input
                type={"number"}
                min={0}
                name="landCadastralNumber"
                id="landCadastralNumber"
                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter land cadastral number"
                value={house.cadastralNumber}
                onChange={(e) => setHouse({...house, cadastralNumber: e.target.value })}
            />
        </div>
    );
};

export default HouseInputs;

const emptyHouse = {
    floor: '',
    rooms: '',
    livingArea: '',
    landArea: '',
}
