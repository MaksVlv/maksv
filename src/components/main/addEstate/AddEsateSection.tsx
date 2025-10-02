import React, {useRef, useState} from "react";
import { useTranslation } from "next-i18next";
import styles from './addEstateSection.module.scss';
import Link from "next/link";
import { AddEstate } from "../../../assets/info";
import Image from "next/image";


export default function AddEstateSection() {

    const { t } = useTranslation();

    return (
        <div className={styles.sliderAbout + " " + styles.add}
        >
            <div className={"wrapper"}>
                <h2>{t("homePage:sell.title")}</h2>
            </div>
            <div style={{ margin: "auto", maxWidth: "1500px", position: "relative" }}>
                <div className={"wrapper"}>
                    <div className={styles.slide}>
                        <Image src={AddEstate} alt="Estate"/>
                        <div className={styles.info}>
                            <h3>{t("homePage:sell.h3")}</h3>
                            <div>
                                <p>{t("homePage:sell.p1")}</p>
                                <p>{t("homePage:sell.p2")}</p>
                            </div>
                            <Link href={"/src/pages_backup_old/contacts.tsx"} className={styles.button}>{t("homePage:button.contactUs")}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
