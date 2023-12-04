import React, { useEffect, useState, useRef } from "react";
import styles from '../styles/admin.module.scss';
import { Pagination } from '../Pagination';
import EstateAdd from './EstateAdd';
import EstateUpdate from './EstateUpdate';
import { toast } from "react-toastify";
import axios from "axios";


interface IPagination {
    pages: number,
    page: number,
    size: number
}

export default function Estates({ googleApi }: { googleApi: string }) {

    const [estates, setEstates] = useState<IEstate[]>([]);
    const [search, setSearch] = useState('');
    const [forceUpdate, setForceUpdate] = useState(0);
    const [pagination, setPagination] = useState<IPagination>({
        pages: 0,
        page: 0,
        size: 20
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [isOpenUp, setIsOpenUp] = useState('');
    const [isOpenAdd, setIsOpenAdd] = useState(false);

    const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);


    useEffect(() => {
        getData(pagination, search)
    }, [pagination.page, forceUpdate])

    const searchChange = (e: any) => {
        setLoading(true);
        clearTimeout(timeoutId.current);
        setSearch(e.target.value);

        timeoutId.current = setTimeout(() => {
            getData({...pagination, page: 0}, e.target.value, true);
        }, 700)
    }

    const getData = (pagination: IPagination, search: string, reset: boolean = false) => {
        setLoading(true)
        if (reset) {
            setPagination({...pagination, page: 0})
            setSearch(search)
        }
        axios.get(`estate?size=${pagination.size}&page=${pagination.page}&search=${search}&disabled=true`).then(res => {
            setPagination({ ...pagination, pages: res.data.pages })
            setEstates(res.data.data)
            setLoading(false)
        }, _err => {
            toast.error("Error occurred with loading estates")
            setLoading(false)
        })
    }

    return (
        <section className="bg-white rounded-lg w-full container mx-auto px-8 mt-10">
            <h1 className="w-full text-center text-2xl font-bold pt-8 pb-3">Estates</h1>
            <div className="relative mb-6 z-0">
                <input
                    type="text"
                    className="block w-full h-full py-2 pr-4 pl-8 text-sm leading-5 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:shadow-outline-blue focus:border-blue-300 focus:text-gray-900 sm:text-sm sm:leading-5 opacity-100"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => {searchChange(e)}}
                />
                <div className="absolute inset-y-0 left-0 flex items-center">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M13.447 11.105a7 7 0 10-1.342 1.342l4.243 4.243a1 1 0 11-1.414 1.414l-4.243-4.243zM7 12a5 5 0 1110 0 5 5 0 01-10 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
            {!loading ?
                <div className={styles.table}>
                    {estates.length > 0 ?
                        estates.map((estate, i) =>
                            <div className={styles.row} style={{ backgroundColor: `${estate.disabled ? "#FFCDD2" : ""}` }} key={i} onClick={() => {setIsOpenUp(i.toString())}}>
                                <div className={"text-black font-bold text-1xl " + styles.info} style={{ width: "5%" }}><img src={estate.mainImage} alt={estate.name.lv +"MainImage"}/></div>
                                <div className={"text-black font-bold text-1xl " + styles.info}>{estate.name.lv}</div>
                                <div className={"text-black font-bold text-1xl " + styles.info} style={{ width: "7%" }}>{estate.type.en}</div>
                                <div className={"text-black font-bold text-1xl " + styles.info} style={{ width: "5%" }}>{estate.rent ? "RENT" : "SELL"}</div>
                                <div className={"text-black font-bold text-1xl " + styles.info} style={{ width: "8%" }}>{Number(estate.price.toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}</div>
                                <div className={"text-black font-bold text-1xl " + styles.info}>{estate.city.name.lv}</div>
                            </div>
                        )
                        :
                        <div className={styles.empty}>Empty</div>
                    }
                </div>
                :
                <div className={styles.table + " justify-center items-center"}>
                    <div className={styles.spinner}/>
                </div>
            }
            <div className={styles.bottom}>
                <button onClick={() => setIsOpenAdd(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add
                </button>
                <Pagination
                    totalPages={pagination.pages}
                    activePage={pagination.page + 1}
                    onPageChange={(page) => setPagination({ ...pagination, page: page - 1 })}
                />
            </div>
            {isOpenAdd && <EstateAdd googleApi={googleApi} onCloseClick={() => setIsOpenAdd(false)} onSave={() => {setForceUpdate(forceUpdate+1)}}/>}
            {isOpenUp && <EstateUpdate googleApi={googleApi} estateOld={estates[Number(isOpenUp)]} onCloseClick={() => setIsOpenUp('')} onUpdate={() => {setForceUpdate(forceUpdate+1)}}/>}

        </section>

    )
}

export interface IEstate {
    _id: string,
    city: {
        name: {
            lv: string,
            ru: string,
            en: string,
        },
        _id: string
    },
    mainImage: string,
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
    district: {
        name: {
            lv: string,
            ru: string,
            en: string,
        },
        _id: string
    },
    street: string,
    location: {
        lat: number,
        lng: number,
    },
    images: [],
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
    disabled?: boolean,
    assignment?: {
        lv: string,
        ru: string,
        en: string,
    }
}
