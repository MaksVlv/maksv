import React from "react";
import { useTranslation } from 'next-i18next';
import style from './headerSection.module.scss'
import Image from "next/image";
import HeaderPhoto from "../../../assets/estate/headerSection.png";


const HeaderSection = () => {

    const { t } = useTranslation()


    return (
        <div className={style.headerSection}>
            <Image src={HeaderPhoto} alt={"HeaderPhoto"} />
            <div className={style.buttonBlock + " wrapper"}>
                <h1>{t("estatePage:headerSection.h1")}</h1>
                <p>{t("estatePage:headerSection.p1")}</p>
                <p dangerouslySetInnerHTML={{ __html: t("estatePage:headerSection.p2") || "<strong>Maks V</strong>" }}/>
            </div>
        </div>
    )
}

export default HeaderSection;
