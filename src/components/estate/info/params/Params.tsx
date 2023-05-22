import React from "react";
import { City, District, Floor, GateHeight, LandArea, LivingArea, Rooms, Series, Size, Cadastral } from "../../../../assets/params";
import { useTranslation } from "next-i18next";
import { IEstate } from "../../../../types";
import style from "./params.module.scss";


interface ParamsProps {
    estate: IEstate,
    dark?: boolean
}

export default function Params ({ estate, dark }: ParamsProps) {

    const { t, i18n } = useTranslation()


    return (
        <div className={style.params}>
            {estate.city && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>{t("estatePage:filter.city")}</div>
                    <div className={style.value + ` ${dark ? style.dark : ""}`}>
                        <span><City /></span>{estate.city.name[i18n.language]}
                    </div>
                </div>
            )}
            {estate.district && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>{t("estatePage:filter.district")}</div>
                    <div className={style.value + ` ${dark ? style.dark : ""}`}>
                        <span><District /></span>{estate.district.name[i18n.language]}
                    </div>
                </div>
            )}
            {estate.landArea && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>{estate.type.en !== "Parking" && estate.type.en !== "Restaurants, cafes, offices" ? t("estatePage:filter.landArea") : t("estatePage:filter.landArea2")}</div>
                    <div className={style.value + ` ${dark ? style.dark : ""}`}>
                        <span><LandArea /></span>{estate.landArea} m²
                    </div>
                </div>
            )}
            {estate.floor && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>{estate.type.en === "Houses" ? t("params:floors") : t("params:floor")}</div>
                    <div className={style.value + ` ${dark ? style.dark : ""}`}>
                        <span><Floor /></span>{estate.floor} {estate.type.en === "Houses" ? t("params:floors") : t("params:floor")}
                    </div>
                </div>
            )}
            {estate.rooms && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>{t("estatePage:filter.rooms")}</div>
                    <div className={style.value + ` ${dark ? style.dark : ""}`}>
                        <span><Rooms /></span>{estate.rooms} {t("params:rooms")}
                    </div>
                </div>
            )}
            {estate.livingArea && (
                <div className={style.param}>
                    <div className={style.label + ` ${dark ? style.dark : ""}`}>{t("estatePage:filter.livingArea")}</div>
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
        </div>
    )
}
