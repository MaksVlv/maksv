import React, {useRef, useState} from "react";
import { useTranslation } from "next-i18next";
import Slider from 'react-slick';
import styles from './sliderOffer.module.scss';
import Link from "next/link";
import Estate0 from "../../../assets/offer/estate0.webp";
import Estate from "../../../assets/offer/estate.png";
import Estate2 from "../../../assets/offer/estate2.png";
import Estate3 from "../../../assets/offer/estate3.png";
import Image from "next/image";


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


export default function SliderOffer() {

    const { t } = useTranslation();
    const sliderRef = useRef<Slider>(null);
    const [activeSlide, setActiveSlide] = useState<number>(0);

    const beforeChangeHandler = (cur: number, next: number) => {
        setActiveSlide(next);
    };

    const handleSliderButtonClick = (index: number) => {
        if (sliderRef.current)
            sliderRef.current.slickGoTo(index);
    };

    return (
        <div className={styles.sliderAbout}
        >
            <div className={"wrapper"}>
                <h2>{t("homePage:offer.title")}</h2>
                <div className={styles.slideChange}>
                    <button onClick={() => handleSliderButtonClick(0)} className={activeSlide === 0 ? styles.active : ""}>{t("homePage:offer.sell.title")}</button>
                    <button onClick={() => handleSliderButtonClick(1)} className={activeSlide === 1 ? styles.active : ""}>{t("header:estate")}</button>
                    <button onClick={() => handleSliderButtonClick(2)} className={activeSlide === 2 ? styles.active : ""}>{t("header:evaluation")}</button>
                    <button onClick={() => handleSliderButtonClick(3)} className={activeSlide === 3 ? styles.active : ""}>{t("header:construction")}</button>
                </div>
            </div>
            <div style={{ margin: "auto", maxWidth: "1500px", position: "relative" }}>
                <Slider
                    {...settings}
                    beforeChange={beforeChangeHandler}
                    ref={sliderRef}
                >
                    <div className={"wrapper"}>
                        <div className={styles.slide}>
                            <Image src={Estate0} alt="Estate"/>
                            <div className={styles.info}>
                                <h3>{t("homePage:offer.sell.h3")}</h3>
                                <p>{t("homePage:offer.sell.p")}</p>
                                <Link href={"#ipasuma-agenti"} className={styles.button}>{t("homePage:button.info")}</Link>
                            </div>
                        </div>
                    </div>
                    <div className={"wrapper"}>
                        <div className={styles.slide}>
                            <Image src={Estate} alt="Estate"/>
                            <div className={styles.info}>
                                <h3>{t("homePage:offer.estate.h3")}</h3>
                                <p>{t("homePage:offer.estate.p")}</p>
                                <Link href={"/src/pages_backup_old/estate.tsx"} className={styles.button}>{t("homePage:button.info")}</Link>
                            </div>
                        </div>
                    </div>
                    <div className={"wrapper"}>
                        <div className={styles.slide}>
                            <Image src={Estate2} alt="Estate"/>
                            <div className={styles.info}>
                                <h3>{t("homePage:offer.evaluation.h3")}</h3>
                                <p>{t("homePage:offer.evaluation.p")}</p>
                                <Link href={"/src/pages_backup_old/evaluation.tsx"} className={styles.button}>{t("homePage:button.info")}</Link>
                            </div>
                        </div>
                    </div>
                    <div className={"wrapper"}>
                        <div className={styles.slide}>
                            <Image src={Estate3} alt="Estate"/>
                            <div className={styles.info}>
                                <h3>{t("homePage:offer.construction.h3")}</h3>
                                <p>{t("homePage:offer.construction.p")}</p>
                                <Link href={"/src/pages_backup_old/construction.tsx"} className={styles.button}>{t("homePage:button.info")}</Link>
                            </div>
                        </div>
                    </div>
                </Slider>
                <div className={styles.progress + " wrapper"}>
                    {activeSlide === 0 && <p>{t("homePage:offer.sell.title")}</p>}
                    {activeSlide === 1 && <p>{t("header:estate")}</p>}
                    {activeSlide === 2 && <p>{t("header:evaluation")}</p>}
                    {activeSlide === 3 && <p>{t("header:construction")}</p>}
                    <progress value={activeSlide + 1} max={4}/>
                </div>
            </div>
        </div>
    )
}
