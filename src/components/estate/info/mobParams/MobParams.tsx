import React from "react";
import {
    Cadastral,
    City,
    District,
    Floor,
    GateHeight,
    LandArea,
    LivingArea,
    Rooms,
    Series,
    Size
} from "../../../../assets/params";
import { useTranslation } from "next-i18next";
import { IEstate } from "../../../../types";
import style from "./mobParams.module.scss";
import {formatArea, hectaresBool} from "../../../../utils/hectares";


interface MobParamsProps {
    estate: IEstate
}

export default function MobParams ({ estate }: MobParamsProps) {

    const { t, i18n } = useTranslation()

    return (
        <div className={style.mobParams}>
            {(estate.landArea || (Number(estate.landArea) > 0)) && (
                <div className={style.param}>
                    <div className={style.label}>{estate.type.en !== "Parking" && estate.type.en !== "Restaurants, cafes, offices" ? t("estatePage:filter.landArea") : t("estatePage:filter.landArea2")}:</div>
                    <div className={style.value}>
                        <span><LandArea /></span>{formatArea(estate.landArea)} {hectaresBool(estate.landArea) ? "ha" : "m²"}
                    </div>
                </div>
            )}
            {estate.floor && (
                <div className={style.param}>
                    <div className={style.label}>{estate.type.en === "House" ? t("params:floors") : t("params:floor")}:</div>
                    <div className={style.value}>
                        <span><Floor /></span>{estate.floor}
                    </div>
                </div>
            )}
            {estate.rooms && (
                <div className={style.param}>
                    <div className={style.label}>{t("estatePage:filter.rooms")}:</div>
                    <div className={style.value}>
                        <span><Rooms /></span>{estate.rooms}
                    </div>
                </div>
            )}
            {(estate.livingArea || (Number(estate.livingArea) > 0)) && (
                <div className={style.param}>
                    <div className={style.label}>
                        {estate.type.en === "Commercial object" ? t("estatePage:filter.roomArea") : t("estatePage:filter.livingArea")}
                        :
                    </div>
                    <div className={style.value}>
                        <span><LivingArea /></span>{estate.livingArea} m²
                    </div>
                </div>
            )}
            {estate.series && (
                <div className={style.param}>
                    <div className={style.label}>{t("estatePage:filter.series")}:</div>
                    <div className={style.value}>
                        <span><Series /></span>{estate.series[i18n.language]}
                    </div>
                </div>
            )}
            {estate.gateHeight && (
                <div className={style.param}>
                    <div className={style.label}>{t("estatePage:filter.gateHeight")}:</div>
                    <div className={style.value}>
                        <span><GateHeight /></span>{estate.gateHeight} m
                    </div>
                </div>
            )}
            {estate.size && (
                <div className={style.param}>
                    <div className={style.label}>{t("estatePage:filter.size")}:</div>
                    <div className={style.value}>
                        <span><Size /></span>{estate.size}
                    </div>
                </div>
            )}
            {estate.cadastralNumber && (
                <div className={style.param}>
                    <div className={style.label}>{t("estatePage:filter.cadastral")}:</div>
                    <div className={style.value}>
                        <span><Cadastral /></span>{estate.cadastralNumber}
                    </div>
                </div>
            )}
            {estate.assignment && (
                <div className={style.param}>
                    <div className={style.label}>{t("estatePage:filter.assignment")}:</div>
                    <div className={style.value}>
                        <span><Series /></span>{estate.assignment[i18n.language]}
                    </div>
                </div>
            )}
            <div className={style.param}>
                <div className={style.label}>{t("estatePage:filter.price")}:</div>
                <div className={style.value + " " + style.bold}>
                    {
                        Number(estate.price.toFixed(2)).toLocaleString('lv', { style: 'currency', currency: 'EUR' })
                    }
                    {
                        estate.rent ? " " + t("params:month") : ''
                    }
                    {
                        estate.type.en === "Flat" || estate.type.en === "Land" ?
                            //@ts-ignore
                            <span>({Number((estate.price / (estate.livingArea || estate.landArea)).toFixed(2)).toLocaleString('lv', { style: 'currency', currency: 'EUR' })}/m²)</span>
                            :
                            ""
                    }
                </div>
            </div>
        </div>
    )
}
