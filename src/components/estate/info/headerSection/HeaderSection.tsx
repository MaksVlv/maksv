import React from "react";
import { useTranslation } from 'next-i18next';
import style from './headerSection.module.scss'
import { IEstate } from "../../../../types";
import Params from "../params/Params";


interface HeaderSectionProps {
    estate: IEstate
}

const HeaderSection = ({ estate }: HeaderSectionProps) => {

    const { t, i18n } = useTranslation()


    return (
        <div className={style.headerSection}>
            <img src={estate.mainImage} alt={"estate photo"} />
            {/*<svg className={style.wave} viewBox="0 0 1083 303" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*    <path d="M0 303C220.898 289.669 471.616 313.518 663 185C792.44 106.458 861.546 12.2108 1083 0V303H0Z" fill="white"/>*/}
            {/*</svg>*/}
            <div className={style.info + " wrapper"}>
                <h1>{estate.name[i18n.language]}</h1>
                <div className={style.params}>
                    <Params estate={estate} />
                </div>
            </div>
        </div>
    )
}

export default HeaderSection;
