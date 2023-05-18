import React from "react";
import styles from './info.module.scss';
import { useTranslation } from "next-i18next";



export default function Info() {

    const { t } = useTranslation();

    return (
        <div className={styles.infoSection + " wrapper"}>
            <h2>{t("evaluationPage:info.title")}</h2>
            <ul>
                <li>{t("evaluationPage:info.s1")}</li>
                <li>{t("evaluationPage:info.s2")}</li>
                <li>{t("evaluationPage:info.s3")}</li>
                <li>{t("evaluationPage:info.s4")}</li>
                <li>{t("evaluationPage:info.s5")}</li>
                <li>{t("evaluationPage:info.s6")}</li>
            </ul>
            <h3>{t("evaluationPage:info.h3")}</h3>
            <ul>
                <li>{t("evaluationPage:info.s7")}</li>
                <li>{t("evaluationPage:info.s8")}</li>
                <li>{t("evaluationPage:info.s9")}</li>
            </ul>
            <p>{t("evaluationPage:info.p")}</p>
            <ul>
                <li>{t("evaluationPage:info.s10")}</li>
                <li>{t("evaluationPage:info.s11")}</li>
                <li>{t("evaluationPage:info.s12")}</li>
                <li>{t("evaluationPage:info.s13")}</li>
                <li>{t("evaluationPage:info.s14")}</li>
            </ul>
        </div>
    );
}
