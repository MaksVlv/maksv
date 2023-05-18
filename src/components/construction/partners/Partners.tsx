import React from "react";
import styles from './partners.module.scss';
import { useTranslation } from "next-i18next";



export default function Partners() {

    const { t } = useTranslation();


    return (
        <div className={styles.achievements}>
            <div className={styles.block + " wrapper"}>
                <h2>{t("constructionPage:partners")}</h2>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <h4>Būvserviss SIA</h4>
                    </div>
                    <div className={styles.stat}>
                        <h4>EVA-SAT SIA</h4>
                    </div>
                    <div className={styles.stat}>
                        <h4>SIA “Krūza”</h4>
                    </div>
                    <div className={styles.stat}>
                        <h4>LASD LV SIA</h4>
                    </div>
                    <div className={styles.stat}>
                        <h4>PRODEX SIA</h4>
                    </div>
                    <div className={styles.stat}>
                        <h4>METĀLU CENTRS SIA</h4>
                    </div>
                    <div className={styles.stat}>
                        <h4>NĀKOTNE SIA</h4>
                    </div>
                    <div className={styles.stat}>
                        <h4>ONNINEN SIA</h4>
                    </div>
                    <div className={styles.stat}>
                        <h4>OTA 13 SIA</h4>
                    </div>
                    <div className={styles.stat}>
                        <h4>PRESKO SIA</h4>
                    </div>
                    <div className={styles.stat}>
                        <h4>PRO WOOD SIA</h4>
                    </div>
                    <div className={styles.stat}>
                        <h4>SOLO F SIA</h4>
                    </div>
                    <div className={styles.stat}>
                        <h4>MĀRUPES METĀLMEISTARS SIA</h4>
                    </div>
                    <div className={styles.stat}>
                        <h4>STATS RENT</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
