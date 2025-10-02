import React, { useEffect, useRef, useState } from "react";
import styles from '../styles/admin.module.scss';
import { Pagination } from '../Pagination';
import CityAdd from './CityAdd';
import CityUpdate from './CityUpdate';
import { toast } from "react-toastify";
import axios from "axios";


interface IPagination {
    pages: number,
    page: number,
    size: number
}

export default function Cities() {

    const [cities, setCities] = useState([]);
    const [search, setSearch] = useState('');
    const [forceUpdate, setForceUpdate] = useState(0);
    const [pagination, setPagination] = useState<IPagination>({
        pages: 0,
        page: 0,
        size: 10
    });
    const [sort, setSort] = useState<string>("createdAt:desc");

    const [loading, setLoading] = useState<boolean>(true);
    const [isOpenUp, setIsOpenUp] = useState('');
    const [isOpenAdd, setIsOpenAdd] = useState(false);

    const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);


    useEffect(() => {
        getData(pagination, search, sort);
    }, [pagination.page, forceUpdate])

    const searchChange = (e: any) => {
        setLoading(true);
        clearTimeout(timeoutId.current);
        setSearch(e.target.value);

        timeoutId.current = setTimeout(() => {
            getData({...pagination, page: 0}, e.target.value, sort, true);
        }, 700)
    }

    const getData = (pagination: IPagination, search: string, sort: string, reset: boolean = false) => {
        setLoading(true)
        if (reset) {
            setPagination({...pagination, page: 0})
            setSearch(search)
        }
        axios.get(`city?size=${pagination.size}&page=${pagination.page}&search=${search}&sort=${sort}`).then(res => {
            setPagination({ ...pagination, pages: res.data.pages })
            setCities(res.data.data)
            setLoading(false)
        }, _err => {
            toast.error("Error occurred with loading cities")
            setLoading(false)
        })
    }

    const changeSort = (val: string) => {
        setSort(val);
        getData({ ...pagination, page: 0 }, search, val, true);
    }

    return (
        <section className="bg-white w-full container mx-auto px-8">
            <h1 className="w-full text-center text-2xl font-bold pt-8 pb-3">Pilsēta/novads & Pagasts/mikrorajons</h1>
            <div className="relative mb-6 flex">
                <input
                    type="text"
                    className="block w-full h-full py-2 pr-4 pl-8 text-sm leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:shadow-outline-blue focus:border-blue-300 focus:text-gray-900 sm:text-sm sm:leading-5 opacity-100"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => {
                        searchChange(e)
                    }}
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
                <div>
                    <select name="sort_estates" id="sort_estates" value={sort}
                            onChange={(e) => changeSort(e.target.value)}>
                        <option value="createdAt:asc">Date asc</option>
                        <option value="createdAt:desc">Date desc</option>
                        <option value="name_translit:asc">Title asc</option>
                        <option value="name_translit:desc">Title desc</option>
                    </select>
                </div>
            </div>
            {!loading ?
                <div className={styles.table}>
                    {cities.length > 0 ?
                        cities.map((city: any, i) =>
                            <div className={styles.row + " " + styles.half} key={i}
                                 onClick={() => setIsOpenUp(city._id)}>
                                <div className={"text-[#1E1E1E] font-bold text-1xl"}>{city.name.lv}</div>
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
                <button onClick={() => setIsOpenAdd(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                    Add
                </button>
                <Pagination
                    totalPages={pagination.pages}
                    activePage={pagination.page + 1}
                    onPageChange={(page: number) => setPagination({ ...pagination, page: page - 1 })}
                />
            </div>
            {isOpenAdd && <CityAdd onCloseClick={() => setIsOpenAdd(false)} onSave={() => {setForceUpdate(forceUpdate+1)}}/>}
            {isOpenUp && <CityUpdate onCloseClick={() => setIsOpenUp('')} cityId={isOpenUp} onUpdate={() => {setForceUpdate(forceUpdate+1)}}/>}

        </section>

    )
}

