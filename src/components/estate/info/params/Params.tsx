import React from "react";
import { City, District, Floor, GateHeight, LandArea, LivingArea, Rooms, Series, Size, Cadastral } from "../../../../assets/params";
import { useTranslation } from "next-i18next";
import { IEstate } from "../../../../types";
import style from "./params.module.scss";
import { formatArea, hectaresBool } from "../../../../utils/hectares";


interface ParamsProps {
    estate: IEstate,
    dark?: boolean
}

export default function Params ({ estate, dark }: ParamsProps) {

    const { t, i18n } = useTranslation()


    return (
        <div className={style.params}>
            {(estate.landArea || (Number(estate.landArea) > 0)) && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>{estate.type.en !== "Parking" && estate.type.en !== "Restaurants, cafes, offices" ? t("estatePage:filter.landArea") : t("estatePage:filter.landArea2")}</div>
                    <div className={style.value + ` ${dark ? style.dark : ""}`}>
                        <span><LandArea /></span>{formatArea(estate.landArea)} {hectaresBool(estate.landArea) ? "ha" : "m²"}
                    </div>
                </div>
            )}
            {estate.floor && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>
                        {estate.type.en === "House" ?
                            t("params:floors")
                            :
                            t("params:floor")
                        }
                    </div>
                    <div className={style.value + ` ${dark ? style.dark : ""}`}>
                        <span><Floor /></span>{estate.floor} {
                        estate.type.en === "House"
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
                    }
                    </div>
                </div>
            )}
            {estate.rooms && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>{t("estatePage:filter.rooms")}</div>
                    <div className={style.value + ` ${dark ? style.dark : ""}`}>
                        <span><Rooms /></span>{estate.rooms} {
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
                    }
                    </div>
                </div>
            )}
            {(estate.livingArea || (Number(estate.livingArea) > 0)) && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>
                        {estate.type.en === "Commercial object" ? t("estatePage:filter.roomArea") : t("estatePage:filter.livingArea")}
                    </div>
                    <div className={style.value + ` ${dark ? style.dark : ""}`}>
                        <span><LivingArea /></span>{estate.livingArea} m²
                    </div>
                </div>
            )}
            {estate.series && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>{t("estatePage:filter.series")}</div>
                    <div className={style.value + ` ${dark ? style.dark : ""}`}>
                        <span><Series /></span>{estate.series[i18n.language]}
                    </div>
                </div>
            )}
            {estate.gateHeight && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>{t("estatePage:filter.gateHeight")}</div>
                    <div className={style.value + ` ${dark ? style.dark : ""}`}>
                        <span><GateHeight /></span>{estate.gateHeight} m
                    </div>
                </div>
            )}
            {estate.size && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>{t("estatePage:filter.size")}</div>
                    <div className={style.value + ` ${dark ? style.dark : ""}`}>
                        <span><Size /></span>{estate.size}
                    </div>
                </div>
            )}
            {estate.cadastralNumber && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>{t("estatePage:filter.cadastral")}</div>
                    <div className={style.value + ` ${dark ? style.dark : ""}`}>
                        <span><Cadastral /></span>{estate.cadastralNumber}
                    </div>
                </div>
            )}
            {estate.assignment && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>{t("estatePage:filter.assignment")}</div>
                    <div className={style.value + ` ${dark ? style.dark : ""}`}>
                        <span><Series /></span>{estate.assignment[i18n.language]}
                    </div>
                </div>
            )}
        </div>
    )
}
