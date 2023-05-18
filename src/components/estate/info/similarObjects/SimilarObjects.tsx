import React, {useEffect, useState} from "react";
import { useTranslation } from "next-i18next";
import style from "./similarObjects.module.scss";
import { IEstate } from "../../../../types";
import { City, District, Floor, GateHeight, LandArea, LivingArea, Rooms, Series, Size } from "../../../../assets/params";
import axios from "axios";

interface SimilarObjectsProps {
    estate: IEstate
}

export default function SimilarObjects({ estate }: SimilarObjectsProps) {

    const { t, i18n } = useTranslation();

    const [estates, setEstates] = useState<IEstate[]>([]);

    useEffect(() => {
        axios.get(`estate?size=3&type=${estate.type.en}&no=${estate._id}`).then(res => {
            setEstates(res.data.data);
        })
    }, [])

    const onButtonClick = (id: string) => {
        window.location.href = `/estate/${id}`;
    }

    return (
        <div className={style.similarSection + " wrapper"}>
            {estates.length > 0 &&
                <>
                    <h3>{t("estatePage:info.similar")}</h3>
                    <div className={style.estates}>
                    {estates.map((estate: IEstate, i: number) => (
                        <button className={style.estate} key={i} onClick={() => onButtonClick(estate._id)}>
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
                        </button>
                        ))
                    }

                    </div>
                </>
            }
        </div>
    )
}
