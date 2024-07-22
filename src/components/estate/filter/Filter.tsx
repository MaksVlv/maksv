import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import style from './filter.module.scss'
import Select from './Select'
import axios from "axios";
import { series } from "../../admin/estate/FLatInputs";
import { useRouter } from "next/router";
import { EstatesMap } from "@/components/estate/filter/EstatesMap";


interface City {
    _id: string,
    name: {
        [key: string]: string
        lv: string,
        ru: string,
        en: string,
    }
}

interface FilterSectionProps {
    onFilterSubmit: (filter: Filter) => void,
    filterStart: Filter,
    pagination: {
        pages: number,
        page: number,
        size: number,
        count: number
    },
    googleApi: string,
}

const FilterSection = ({ onFilterSubmit, filterStart, pagination, googleApi }: FilterSectionProps) => {

    const { t, i18n } = useTranslation()
    const router = useRouter();

    const [filter, setFilter] = useState<Filter>(filterStart);

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [mobOpen, setMobOpen] = useState<boolean>(false)
    const [cities, setCities] = useState<City[]>([])
    const [districts, setDistricts] = useState<City[]>([])
    const [typesServer, setTypesServer] = useState<{_id: {[key: string]: string}, count: number}[]>([])

    const [city, setCity] = useState<string>('')
    const [type, setType] = useState<string>('')

    const onSubmit = (e?: React.SyntheticEvent) => {
        e?.preventDefault();

        onFilterSubmit(filter);

        changeFilter(filter);
    }

    const onPlus = () => {
        setIsOpen(!isOpen);
    }

    const changeFilter = (filter: Filter) => {
        //@ts-ignore
        const queryParams = new URLSearchParams({
            ...filter,
            ...pagination
        });

        router.push({pathname: router.pathname, query: queryParams.toString()}, {
            pathname: router.pathname,
            query: queryParams.toString()
        }, {scroll: false});
        setMobOpen(false)
    }

    useEffect(() => {
        axios.get("city?size=10000&sort=name_translit:asc").then(res => {
            setCities(res.data.data)
        })
        axios.get("estate/filter").then(res => {
            setTypesServer(res.data);
        })
    }, [])

    useEffect(() => {
        setFilter(filterStart)
        if (filterStart.type) {
            setIsOpen(true);
            Object.keys(types).map((key: string) => {
                if (types[key].en === filterStart.type) {
                    setType(key);
                }
            })
        }
        if (filterStart.city) {
            cityChange(filterStart.city, false)
        }
    }, [filterStart])

    const cityChange = (id: string, change = true) => {
        if (!id) {
            setCity('');
            if (change)
                setFilter({...filter, city: '', district: ''})
            return;
        }
        setCity(id)
        if (change)
            setFilter({...filter, city: id, district: ''})
        axios.get(`city/district?city=${id}&sort=name_translit:asc&withoutSpace=true`).then(res => {
            setDistricts(res.data)
        })
    }

    const changeType = (typeKey: string) => {
        Object.keys(types).map((key: string) => {
            if (types[key].en === typeKey) {
                setType(key);
            }
        })
        setFilter({
            ...filter,
            type: typeKey,
            roomsFrom: '',
            roomsTill: '',
            floorFrom: '',
            floorTill: '',
            livingAreaFrom: '',
            livingAreaTill: '',
            landAreaFrom: '',
            landAreaTill: '',
            series: '',
            gateHeightFrom: '',
            gateHeightTill: '',
            assignment: ''
        })
    }

    const reset = () => {
        router.push(router.pathname, {}, {scroll: false})
        setIsOpen(false);
        setMobOpen(false);
    }

    return (
        <div className={style.filterSection + " wrapper"}>
            <div className={style.mobSearch} onClick={() => setMobOpen(true)}>
                <svg className={style.searchSVG} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.7285 15.8818L14.5879 11.6875C15.2617 10.5107 15.6133 9.20215 15.6133 7.88379C15.6133 3.60645 12.1367 0.125 7.86914 0.125C3.60156 0.125 0.125 3.60645 0.125 7.88379C0.125 12.1611 3.60156 15.6426 7.86914 15.6426C9.23145 15.6426 10.5791 15.2666 11.7803 14.5488L15.9014 18.7285C15.9941 18.8213 16.126 18.8799 16.2578 18.8799C16.3896 18.8799 16.5215 18.8262 16.6143 18.7285L18.7285 16.5898C18.9238 16.3896 18.9238 16.0771 18.7285 15.8818ZM7.86914 3.14746C10.4766 3.14746 12.5957 5.27148 12.5957 7.88379C12.5957 10.4961 10.4766 12.6201 7.86914 12.6201C5.26172 12.6201 3.14258 10.4961 3.14258 7.88379C3.14258 5.27148 5.26172 3.14746 7.86914 3.14746Z" fill="#7B7B7B"/>
                </svg>
                {t("estatePage:filter.search")}
            </div>
            <div className={style.title}>
                <h2>{t("estatePage:filter.title.h2")}</h2>
                <p>{t("estatePage:filter.title.p")}</p>
            </div>
            <form onSubmit={onSubmit} className={style.filter + " " + `${mobOpen ? style.mobOpen : ""}`}>
                <div className={style.row + " " + style.back} onClick={() => setMobOpen(false)}>
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.75 1.50781L6.94141 0.75L0.25 7L6.94141 13.25L7.75 12.4961L1.87109 7L7.75 1.50781Z" fill="#3C3C3C"/>
                    </svg>
                    {t("estatePage:filter.back")}
                </div>
                <div className={style.row}>
                    <div className={style.input + " " + style.long}>
                        <label htmlFor="search">{t("estatePage:filter.search")}</label>
                        <svg className={style.searchSVG} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.7285 15.8818L14.5879 11.6875C15.2617 10.5107 15.6133 9.20215 15.6133 7.88379C15.6133 3.60645 12.1367 0.125 7.86914 0.125C3.60156 0.125 0.125 3.60645 0.125 7.88379C0.125 12.1611 3.60156 15.6426 7.86914 15.6426C9.23145 15.6426 10.5791 15.2666 11.7803 14.5488L15.9014 18.7285C15.9941 18.8213 16.126 18.8799 16.2578 18.8799C16.3896 18.8799 16.5215 18.8262 16.6143 18.7285L18.7285 16.5898C18.9238 16.3896 18.9238 16.0771 18.7285 15.8818ZM7.86914 3.14746C10.4766 3.14746 12.5957 5.27148 12.5957 7.88379C12.5957 10.4961 10.4766 12.6201 7.86914 12.6201C5.26172 12.6201 3.14258 10.4961 3.14258 7.88379C3.14258 5.27148 5.26172 3.14746 7.86914 3.14746Z" fill="#7B7B7B"/>
                        </svg>
                        <input type="text" id={"search"} value={filter.search} onChange={e => setFilter({...filter, search: e.target.value})} placeholder={t("estatePage:filter.searchPlaceholder") || ""}/>
                    </div>
                    <div className={style.input}>
                        <label htmlFor="oprtation">{t("estatePage:filter.rent.label")}</label>
                        <Select
                            options={[{option: t("estatePage:filter.rent.buy"), value: "buy"}, {option: t("estatePage:filter.rent.rent"), value: "rent"}]}
                            placeHolder={"-"}
                            onSelect={(value: string) => {if (value === "rent") { setFilter({...filter, rent: true}) } else if (value === "buy") { setFilter({...filter, rent: false}) } else { setFilter({...filter, rent: null}) }}}
                            valueActual={filter.rent === true ? "rent" : filter.rent === false ? "buy" : ""}
                        />
                    </div>
                    <div className={style.input}>
                        <label htmlFor="type">{t("estatePage:filter.type")}</label>
                        <Select
                            options={typesServer.map((key: {_id: {[key: string]: string}, count: number}) => ({option: key._id[i18n.language], value: key._id['en']}))}
                            // options={Object.keys(types).map((key: string) => ({option: types[key][i18n.language], value: key}))}
                            placeHolder={"-"}
                            onSelect={(value: string) => changeType(value)}
                            valueActual={filter.type || ""}
                        />
                    </div>
                    <button type={"submit"} className={style.pcSubmit}>{t("estatePage:filter.search")}</button>
                </div>
                <div className={style.hr}/>
                <div className={style.row + " " + style.open} onClick={() => onPlus()}>
                    {t("estatePage:filter.advanced")}
                    <svg className={style.selectSVG + " " + (isOpen ? style.rotate : "")} width="16" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.50781 0.25L0.75 1.05859L7 7.75L13.25 1.05859L12.4961 0.25L7 6.12891L1.50781 0.25Z" fill="#3C3C3C"/>
                    </svg>
                </div>
                {isOpen &&
                    <>
                        <div className={style.row} style={{ marginTop: '20px' }}>
                            <div className={style.input}>
                                <label htmlFor="city">{t("estatePage:filter.city")}</label>
                                <Select
                                    options={cities.map((city => ({ option: city.name[i18n.language], value: city._id })))}
                                    disabled={cities.length < 1} placeHolder={"-"}
                                    onSelect={(id: string) => cityChange(id)}
                                    valueActual={filter.city}
                                />
                            </div>
                            <div className={style.input}>
                                <label htmlFor="district">{t("estatePage:filter.district")}</label>
                                <Select
                                    options={districts.map((district => ({ option: district.name[i18n.language], value: district._id })))}
                                    disabled={!city} placeHolder={"-"}
                                    onSelect={(value: string) => setFilter({...filter, district: value})}
                                    valueActual={filter.district}
                                />
                            </div>
                            <div className={style.input + " " + style.small}>
                                <label htmlFor="price">{t("estatePage:filter.price")} €</label>
                                <input type="number" placeholder={t("estatePage:filter.priceFrom") || ""} value={filter.priceFrom} onChange={e => setFilter({...filter, priceFrom: e.target.value})}/>
                            </div>
                            <div className={style.input + " " + style.small}>
                                <input type="number" placeholder={t("estatePage:filter.priceTill") || ""} value={filter.priceTill} onChange={e => setFilter({...filter, priceTill: e.target.value})}/>
                            </div>

                        </div>
                        {type &&
                            <div className={style.row} style={{ marginTop: '20px' }}>
                                {type === '1' &&
                                    <>
                                        <div className={style.input + " " + style.small}>
                                            <label htmlFor="floor">{t("estatePage:filter.floors")}</label>
                                            <input type="number" id={"floor"} value={filter.floorFrom} onChange={e => setFilter({...filter, floorFrom: e.target.value})} placeholder={t("estatePage:filter.from") || ""}/>
                                        </div>
                                        <div className={style.input + " " + style.small}>
                                            <input type="number" value={filter.floorTill} onChange={e => setFilter({...filter, floorTill: e.target.value})} placeholder={t("estatePage:filter.till") || ""}/>
                                        </div>
                                    </>
                                }
                                {(type === '2' || type === '10') &&
                                <>
                                    <div className={style.input + " " + style.small}>
                                        <label htmlFor="floor">{t("estatePage:filter.floor")}</label>
                                        <input type="number" id={"floor"} value={filter.floorFrom} onChange={e => setFilter({...filter, floorFrom: e.target.value})} placeholder={t("estatePage:filter.from") || ""}/>
                                    </div>
                                    <div className={style.input + " " + style.small}>
                                        <input type="number" value={filter.floorTill} onChange={e => setFilter({...filter, floorTill: e.target.value})} placeholder={t("estatePage:filter.till") || ""}/>
                                    </div>
                                </>
                                }
                                {(type === '1' || type === '2') &&
                                <>
                                    <div className={style.input + " " + style.small}>
                                        <label htmlFor="rooms">{t("estatePage:filter.rooms")}</label>
                                        <input type="number" id={"rooms"} value={filter.roomsFrom} onChange={e => setFilter({...filter, roomsFrom: e.target.value})} placeholder={t("estatePage:filter.from") || ""}/>
                                    </div>
                                    <div className={style.input + " " + style.small}>
                                        <input type="number" value={filter.roomsTill} onChange={e => setFilter({...filter, roomsTill: e.target.value})} placeholder={t("estatePage:filter.till") || ""}/>
                                    </div>
                                </>
                                }
                                {(type === '1' || type === '2' || type === '5')  &&
                                <>
                                    <div className={style.input + " " + style.small}>
                                        <label htmlFor="livingArea">
                                            {type === "5" ? t("estatePage:filter.roomArea") : t("estatePage:filter.livingArea")}
                                        </label>
                                        <input type="number" id={"livingArea"} value={filter.livingAreaFrom} onChange={e => setFilter({...filter, livingAreaFrom: e.target.value})} placeholder={t("estatePage:filter.from") || ""}/>
                                    </div>
                                    <div className={style.input + " " + style.small}>
                                        <input type="number" value={filter.livingAreaTill} onChange={e => setFilter({...filter, livingAreaTill: e.target.value})} placeholder={t("estatePage:filter.till") || ""}/>
                                    </div>
                                </>
                                }
                                {(type === '1' || type === '3' || type === '4' || type === '5' || type === '6' || type === '7' || type === '9' || type === '10') &&
                                <>
                                    <div className={style.input + " " + style.small}>
                                        <label htmlFor="landArea">{t("estatePage:filter.landArea")}</label>
                                        <input type="number" id={"landArea"} value={filter.landAreaFrom} onChange={e => setFilter({...filter, landAreaFrom: e.target.value})} placeholder={t("estatePage:filter.from") || ""}/>
                                    </div>
                                    <div className={style.input + " " + style.small}>
                                        <input type="number" value={filter.landAreaTill} onChange={e => setFilter({...filter, landAreaTill: e.target.value})} placeholder={t("estatePage:filter.till") || ""}/>
                                    </div>
                                </>
                                }
                                {type === '2' &&
                                <>
                                    <div className={style.input + " "} style={{ flex: "1" }}>
                                        <label htmlFor="series">{t("estatePage:filter.series")}</label>
                                        <Select
                                            options={Object.keys(series).map((key: string) => ({ option: series[key][i18n.language], value: key }))}
                                            placeHolder={"-"}
                                            onSelect={(seriesKey: string) => setFilter({...filter, series: series[seriesKey]?.en || ''})}
                                            valueActual={Object.keys(series).find((key: string) => series[key].en === filter.series) || ""}
                                        />
                                    </div>
                                </>
                                }
                                {type === '8' &&
                                <>
                                    <div className={style.input + " " + style.small}>
                                        <label htmlFor="gateHeight">{t("estatePage:filter.gateHeight")}</label>
                                        <input type="number" id={"gateHeight"} value={filter.gateHeightFrom} onChange={e => setFilter({...filter, gateHeightFrom: e.target.value})} placeholder={t("estatePage:filter.from") || ""}/>
                                    </div>
                                    <div className={style.input + " " + style.small}>
                                        <input type="number" value={filter.gateHeightTill} onChange={e => setFilter({...filter, gateHeightTill: e.target.value})} placeholder={t("estatePage:filter.till") || ""}/>
                                    </div>
                                </>
                                }
                                {type === '3' &&
                                <>
                                    <div className={style.input + " "} style={{ flex: "1" }}>
                                        <label htmlFor="series">{t("estatePage:filter.assignment")}</label>
                                        <Select
                                            options={Object.keys(assignment).map((key: string) => ({ option: assignment[key][i18n.language], value: key }))}
                                            placeHolder={"-"}
                                            onSelect={(assignmentKey: string) => setFilter({...filter, assignment: assignment[assignmentKey]?.en || ''})}
                                            valueActual={Object.keys(assignment).find((key: string) => assignment[key].en === filter.assignment) || ""}
                                        />
                                    </div>
                                </>
                                }
                            </div>
                        }
                        <button className={style.reset} onClick={() => reset()}>{t("estatePage:filter.reset")}</button>
                    </>
                }
                <div className={style.row + " " + style.mobSubmit}>
                    <button type={"submit"}>{t("estatePage:filter.search")}</button>
                </div>
            </form>

            <EstatesMap googleApi={googleApi} />

            <div className={style.sort}>
                <label htmlFor="sort">{t("estatePage:filter.sort")}</label>
                <Select
                    options={[{option: t("estatePage:filter.priceDown"), value: "price:desc"},
                        {option: t("estatePage:filter.priceUp"), value: "price:asc"},
                        {option: t("estatePage:filter.dateDown"), value: "createdAt:desc"},
                        {option: t("estatePage:filter.dateUp"), value: "createdAt:asc"}]}
                    placeHolder={""}
                    ignoreActual={true}
                    onSelect={(value: string) => {changeFilter({ ...filter, sort: value })}}
                    valueActual={filter.sort}
                />
            </div>
        </div>
    )
}

export default FilterSection;


interface ITypes {
    [key: string]: {
        [key: string]: string,
        lv: string,
        ru: string,
        en: string,
    }
}

const types: ITypes = {
    '1': {
        lv: "Māja",
        ru: "Дом",
        en: "House"
    },
    '2': {
        lv: "Dzīvoklis",
        ru: "Квартира",
        en: "Flat"
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
        lv: "Garāža",
        ru: "Гараж",
        en: "Garage"
    },
    '9': {
        lv: "Autostāvvieta",
        ru: "Стоянка",
        en: "Parking"
    },
    '10': {
        lv: "Restorāni, kafejnīcas, biroji",
        ru: "Рестораны, кафе, офисы",
        en: "Restaurants, cafes, offices"
    },
    '11': {
        lv: "Mežs",
        ru: "Лес",
        en: "Forest"
    }
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

export interface Filter {
    search: string,
    rent: boolean | null,
    type: string,
    city: string,
    district: string,
    priceFrom: string,
    priceTill: string,
    roomsFrom: string,
    roomsTill: string,
    floorFrom: string,
    floorTill: string,
    livingAreaFrom: string,
    livingAreaTill: string,
    landAreaFrom: string,
    landAreaTill: string,
    series: string,
    gateHeightFrom: string,
    gateHeightTill: string,
    sort: string,
    assignment: string
}

const emptyFilter: Filter = {
    search: '',
    rent: null,
    type: '',
    city: '',
    district: '',
    priceFrom: '',
    priceTill: '',
    roomsFrom: '',
    roomsTill: '',
    floorFrom: '',
    floorTill: '',
    livingAreaFrom: '',
    livingAreaTill: '',
    landAreaFrom: '',
    landAreaTill: '',
    series: '',
    gateHeightFrom: '',
    gateHeightTill: '',
    sort: 'createdAt:desc',
    assignment: ''
}
