import React from "react";
import styles from './header.module.scss';
import { useTranslation } from "next-i18next";
import Image from "next/image";
import HeaderImage from '../../../assets/construction/headerImage.png';

export default function HeaderSection() {

    const { t } = useTranslation();


    return (
        <div className={styles.headerSection}>
            <Image src={HeaderImage} alt="Header image"/>
            <div className={styles.info + " wrapper"}>
                <h1>{t("constructionPage:title")}</h1>
                <p>{t("constructionPage:p")}</p>
            </div>
        </div>
    );
}
