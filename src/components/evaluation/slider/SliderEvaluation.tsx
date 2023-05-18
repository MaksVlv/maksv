import React, {useRef, useState} from "react";
import { useTranslation } from "next-i18next";
import Slider from 'react-slick';
import styles from './sliderEvaluation.module.scss';
import First from "../../../assets/evaluation/first.png";
import Second from "../../../assets/evaluation/second.png";
import Third from "../../../assets/evaluation/third.png";
import Lapa from "../../../assets/evaluation/lapa.png";
import Lapa2 from "../../../assets/evaluation/lapa2.png";
import Image from "next/image";


const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    arrows: false
};


export default function SliderEvaluation() {

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
        <div className={styles.sliderAbout}>
            <div className={styles.lapaRight}>
                <Image src={Lapa} alt={"Lapa"}/>
            </div>
            <div className={styles.lapaLeft}>
                <Image src={Lapa2} alt={"Lapa2"}/>
            </div>
            <div className={"wrapper"} style={{ position: "relative" }}>
                <h2>{t("evaluationPage:header.title")}</h2>
                <div className={styles.slideChange}>
                    <button onClick={() => handleSliderButtonClick(0)} className={activeSlide === 0 ? styles.active : ""}>{t("evaluationPage:header.eval.title")}</button>
                    <button onClick={() => handleSliderButtonClick(1)} className={activeSlide === 1 ? styles.active : ""}>{t("evaluationPage:header.exp.title")}</button>
                    <button onClick={() => handleSliderButtonClick(2)} className={activeSlide === 2 ? styles.active : ""}>{t("evaluationPage:header.sug.title")}</button>
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
                            <Image src={First} alt="Estate"/>
                            <div className={styles.info}>
                                <h3>{t("evaluationPage:header.eval.h3")}</h3>
                                <p>{t("evaluationPage:header.eval.p1")}</p>
                                <p>{t("evaluationPage:header.eval.p2")}</p>
                            </div>
                        </div>
                    </div>
                    <div className={"wrapper"}>
                        <div className={styles.slide}>
                            <Image src={Second} alt="Estate"/>
                            <div className={styles.info}>
                                <h3>{t("evaluationPage:header.exp.h3")}</h3>
                                <p>{t("evaluationPage:header.exp.p1")}</p>
                            </div>
                        </div>
                    </div>
                    <div className={"wrapper"}>
                        <div className={styles.slide}>
                            <Image src={Third} alt="Estate"/>
                            <div className={styles.info}>
                                <h3>{t("evaluationPage:header.sug.h3")}</h3>
                                <p>{t("evaluationPage:header.sug.p1")}</p>
                            </div>
                        </div>
                    </div>
                </Slider>
                <div className={styles.progress + " wrapper"}>
                    {activeSlide === 0 && <p>{t("evaluationPage:header.eval.title")}</p>}
                    {activeSlide === 1 && <p>{t("evaluationPage:header.exp.title")}</p>}
                    {activeSlide === 2 && <p>{t("evaluationPage:header.sug.title")}</p>}
                    <progress value={activeSlide + 1} max={3}/>
                </div>
            </div>
        </div>
    )
}
