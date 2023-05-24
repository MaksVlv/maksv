import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { IEstate } from '../../../types';
import Slider from 'react-slick';
import styles from './slider.module.scss';
import Link from "next/link";
import { City, District, LandArea, Floor, LivingArea, Rooms, GateHeight, Series, Size } from '../../../assets/params';
import {formatArea, hectaresBool} from "../../../utils/hectares";


const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
};

interface SliderSectionProps {
    data: IEstate[]
}

export default function SliderSection({ data }: SliderSectionProps) {

    const { t, i18n } = useTranslation();

    const [isHovered, setIsHovered] = useState(false);
    const [time, setTime] = useState<number>(0);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        let intervalId: any;

        if (isHovered) {
            setTime(0);
        }

        if (!isHovered) {
            intervalId = setInterval(() => {
                setTime(prevState => prevState + 20);
            }, 20);
        }

        return () => clearInterval(intervalId);
    }, [isHovered]);

    const beforeChangeHandler = () => {
        setTime(0);
    };

    return (
        <div className={styles.slider}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
        >
            <Slider
                {...settings}
                // autoplay={!isHovered}
                beforeChange={beforeChangeHandler}
            >
                {data.map((estate, i) =>
                    <div className={styles.slide} key={i}>
                        <img src={estate.mainImage} alt={"estate"}/>
                        <div className={styles.buttonBlock + " wrapper"}>
                            <h1>{t("homePage:slider.h1")}</h1>
                            <Link href={`/estate/${estate._id}`} tabIndex={-1} className={styles.button}>{t("homePage:button.info")}</Link>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.name}>
                                <p>{estate.name[i18n.language]}</p>
                            </div>
                            <div className={styles.price}>
                                <p>{Number(estate.price.toFixed(2)).toLocaleString('lv', { style: 'currency', currency: 'EUR' })} {estate.rent ? t("params:month") : ''}</p>
                            </div>
                            <div className={styles.params}>
                                {estate.city && (<div className={styles.param}><span><City /></span>{estate.city.name[i18n.language]}</div>)}
                                {estate.district && (<div className={styles.param}><span><District /></span>{estate.district.name[i18n.language]}</div>)}
                                {estate.landArea && (<div className={styles.param}><span><LandArea /></span>{formatArea(estate.landArea)} {hectaresBool(estate.landArea) ? "ha" : "m²"}</div>)}
                                {estate.floor && (
                                    <div className={styles.param}><span><Floor /></span>{estate.floor} {
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
                                    <div className={styles.param}><span><Rooms /></span>{estate.rooms} {
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
                                {estate.livingArea && (<div className={styles.param}><span><LivingArea /></span>{estate.livingArea} m²</div>)}
                                {estate.series && (<div className={styles.param}><span><Series /></span>{estate.series[i18n.language]}</div>)}
                                {estate.assignment && (<div className={styles.param}><span><Series /></span>{estate.assignment[i18n.language]}</div>)}
                                {estate.gateHeight && (<div className={styles.param}><span><GateHeight /></span>{estate.gateHeight} m</div>)}
                                {estate.size && (<div className={styles.param}><span><Size /></span>{estate.size}</div>)}
                            </div>
                            <div className={styles.progress}>
                                <progress value={time} max={settings.autoplaySpeed}/>
                            </div>
                        </div>
                    </div>
                )}
            </Slider>
        </div>
    )
}
