import React, { forwardRef } from "react";
import style from './estates.module.scss'
import { useTranslation } from "next-i18next";
import { City, District, LandArea, Floor, LivingArea, Rooms, Series, GateHeight, Size } from '../../../assets/params';
import { IEstate } from '../../../types';
import Skeleton from 'react-loading-skeleton'
import Link from "next/link";
import {formatArea, hectaresBool} from "../../../utils/hectares";

interface EstatesProps {
    estate: IEstate[],
    loading: boolean
}

const Estates = forwardRef<HTMLDivElement, EstatesProps>(
({ estate, loading }, ref) => {

    const { t, i18n } = useTranslation();

    if (loading)
        return (
            <div ref={ref} className={style.estates + " wrapper"}>
                {
                    [1,2,3,4,5,6].map((i: number) => (
                        <div key={i} className={style.estate + " " + style.minusPad}>
                            <Skeleton width="100%" height="500px" />
                        </div>
                    ))
                }
            </div>
        )

    if (estate.length === 0)
        return (
            <div className={style.empty + " wrapper"}>
                <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="28.5" cy="28.5" r="27" stroke="#D9D9D9" strokeWidth="3"/>
                    <ellipse cx="18" cy="22" rx="4" ry="5" fill="#D9D9D9"/>
                    <ellipse cx="38" cy="22" rx="4" ry="5" fill="#D9D9D9"/>
                    <path d="M44.4239 34.9005L13.5592 42.4747" stroke="#D9D9D9" strokeWidth="3"/>
                </svg>
                <h3>{t("estatePage:empty")}</h3>
            </div>
        )

    return (
        <div ref={ref} className={style.estates + " wrapper"}>
            {
                estate.map((estate: IEstate, i: number) => (
                    <Link className={style.estate} key={i} href={{ pathname: `/estate/[id]`, query: { id: estate._id } }}>
                        <img src={estate.mainImage} alt={"Estate Image"} />
                        <p className={style.pSmall}>{estate.type[i18n.language]}</p>
                        <h3 className={estate.rent ? style.small : ''}>
                            {Number(estate.price.toFixed(2)).toLocaleString('lv', { style: 'currency', currency: 'EUR' })} {estate.rent ? t("params:month") : ''}
                        </h3>
                        <p>{estate.name[i18n.language]}</p>
                        <div className={style.params}>
                            {estate.city && (<div className={style.param}><span><City /></span>{estate.city.name[i18n.language]}</div>)}
                            {estate.district && (<div className={style.param}><span><District /></span>{estate.district.name[i18n.language]}</div>)}
                            {estate.landArea && (<div className={style.param}><span><LandArea /></span>{formatArea(estate.landArea)} {hectaresBool(estate.landArea) ? "ha" : "m²"}</div>)}
                            {estate.floor && (
                                <div className={style.param}><span><Floor /></span>{estate.floor} {
                                    estate.type.en === "Houses"
                                        ? i18n.language === "ru" ?
                                        estate.floor == 1 ?
                                            "этаж"
                                            :
                                            estate.floor == 2 || estate.floor == 3 || estate.floor == 4 ?
                                                "этажа"
                                                :
                                                t("params:floors")
                                        : i18n.language === "lv" ?
                                            estate.floor == 1 ?
                                                "stāvs"
                                                :
                                                t("params:floors")
                                            : t("params:floors")
                                        : t("params:floor")
                                }</div>
                            )}
                            {estate.rooms && (
                                <div className={style.param}><span><Rooms /></span>{estate.rooms} {
                                    i18n.language === "ru" ?
                                        estate.rooms == "1" ?
                                            "комната"
                                            :
                                            estate.rooms == "4" || estate.rooms == "3" || estate.rooms == "2" ?
                                                "комнаты"
                                                :
                                                t("params:rooms")
                                        : i18n.language === "lv" ?
                                        estate.rooms == "1" ?
                                            "istaba"
                                            :
                                            t("params:rooms")
                                        : t("params:rooms")
                                }</div>
                            )}
                            {estate.livingArea && (<div className={style.param}><span><LivingArea /></span>{estate.livingArea} m²</div>)}
                            {estate.series && (<div className={style.param}><span><Series /></span>{estate.series[i18n.language]}</div>)}
                            {estate.assignment && (<div className={style.param}><span><Series /></span>{estate.assignment[i18n.language]}</div>)}
                            {estate.gateHeight && (<div className={style.param}><span><GateHeight /></span>{estate.gateHeight} m</div>)}
                            {estate.size && (<div className={style.param}><span><Size /></span>{estate.size}</div>)}
                            {(estate.type.en === "Flats" || estate.type.en === "Land") && (
                                <div className={style.param}>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="25px" width="25px" version="1.1" id="Layer_1" viewBox="0 0 291.929 291.929" xmlSpace="preserve">
                                            <g>
                                                <path d="M264.95,191.544h-42.461c-9.537,0-10.403,3.957-11.689,12.427   c-3.474,20.405-22.958,32.887-46.354,32.887c-26.861,0-48.479-21.135-50.22-45.379h60.04c7.367,0,12.564-2.544,12.564-12.327   V166.99c0-9.756-5.197-12.017-12.564-12.017h-60.468v-18.126h60.468c7.367,0,12.564-2.535,12.564-12.327v-12.163   c0-9.765-5.197-12.327-12.564-12.327h-59.602c3.036-22.101,23.934-45.388,49.5-45.388c23.396,0,36.662,9.218,45.78,23.241   c3.465,5.106,3.902,13.166,13.002,13.166h41.877c9.966,0,13.439-3.556,13.439-13.74C272.627,23.35,219.061,0,165.321,0   C114.217,0,51.095,34.583,49.791,100.021h-23.56c-7.786,0-12.564,2.544-12.564,12.327v12.163c0,9.774,4.769,12.327,12.564,12.327   H41.22v18.117H26.231c-7.786,0-12.564,2.544-12.564,12.327v11.88c0,9.756,4.769,12.327,12.564,12.327h23.533v1.714   c0,66.705,63.131,98.726,114.682,98.726c53.739,0,113.496-32.267,113.496-87.101C277.942,194.634,274.478,191.544,264.95,191.544z"/>
                                            </g>
                                        </svg>
                                    </span>
                                    {
                                        //@ts-ignore
                                        Number((estate.price / (estate.livingArea || estate.landArea)).toFixed(2)).toLocaleString('lv', { style: 'currency', currency: 'EUR' })
                                    }/m²
                                </div>
                            )}
                        </div>
                    </Link>
                ))
            }
        </div>
    )
})

export default Estates;
