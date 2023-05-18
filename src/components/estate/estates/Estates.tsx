import React, { forwardRef } from "react";
import style from './estates.module.scss'
import { useTranslation } from "next-i18next";
import { City, District, LandArea, Floor, LivingArea, Rooms, Series, GateHeight, Size } from '../../../assets/params';
import { IEstate } from '../../../types';
import Skeleton from 'react-loading-skeleton'
import Link from "next/link";
import {number} from "prop-types";

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
                        <h3>{Number(estate.price.toFixed(2)).toLocaleString('lv', { style: 'currency', currency: 'EUR' })} {estate.rent ? t("params:month") : ''}</h3>
                        <p>{estate.name[i18n.language]}</p>
                        <div className={style.params}>
                            {estate.city && (<div className={style.param}><span><City /></span>{estate.city.name[i18n.language]}</div>)}
                            {estate.district && (<div className={style.param}><span><District /></span>{estate.district.name[i18n.language]}</div>)}
                            {estate.landArea && (<div className={style.param}><span><LandArea /></span>{estate.landArea} m²</div>)}
                            {estate.floor && (<div className={style.param}><span><Floor /></span>{estate.floor} {estate.type.en === "Houses" ? t("params:floors") : t("params:floor")}</div>)}
                            {estate.rooms && (<div className={style.param}><span><Rooms /></span>{estate.rooms} {t("params:rooms")}</div>)}
                            {estate.livingArea && (<div className={style.param}><span><LivingArea /></span>{estate.livingArea} m²</div>)}
                            {estate.series && (<div className={style.param}><span><Series /></span>{estate.series[i18n.language]}</div>)}
                            {estate.gateHeight && (<div className={style.param}><span><GateHeight /></span>{estate.gateHeight} m</div>)}
                            {estate.size && (<div className={style.param}><span><Size /></span>{estate.size}</div>)}
                        </div>
                    </Link>
                ))
            }
        </div>
    )
})

export default Estates;
