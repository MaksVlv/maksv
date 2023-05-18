import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import styles from './infoSection.module.scss';
import { AboutUs, Estate, Evaluation, Construction } from '../../../assets/info';

export default function InfoSection() {

    const { t } = useTranslation();

    return (
        <div className={styles.infoSection + " wrapper"}>
            <div className={styles.block}>
                <div className={styles.info}>
                    <h2>{t("homePage:info.aboutUs.title")}</h2>
                    <p>{t("homePage:info.aboutUs.p")}</p>
                </div>
                <Image src={AboutUs} alt={"About us"}/>
            </div>
            <div className={styles.block}>
                <div className={styles.info}>
                    <h2>{t("homePage:info.estate.title")}</h2>
                    <p>{t("homePage:info.estate.p")}</p>
                </div>
                <Image src={Estate} alt={"About us"}/>
            </div>
            <div className={styles.block}>
                <div className={styles.info}>
                    <h2>{t("homePage:info.construction.title")}</h2>
                    <p>{t("homePage:info.construction.p")}</p>
                </div>
                <Image src={Construction} alt={"About us"}/>
            </div>
            <div className={styles.block}>
                <div className={styles.info}>
                    <h2>{t("homePage:info.evaluation.title")}</h2>
                    <p>{t("homePage:info.evaluation.p")}</p>
                </div>
                <Image src={Evaluation} alt={"About us"}/>
            </div>
        </div>
    )
}
