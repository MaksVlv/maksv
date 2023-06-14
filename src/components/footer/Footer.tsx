import React from "react";
import { useTranslation } from 'next-i18next';
import Logo from '@/assets/logo/logoBig.png';
import style from './footer.module.scss'
import Link from "next/link";
import Image from "next/image";


const Header = () => {

    const { t } = useTranslation()


    return (
        <footer className={style.footerContainer}>
            <div className={"wrapper " + style.footer}>
                <Image src={Logo} alt={"logo"} className={style.logo}/>
                <div className={style.links}>
                    <a href={"/estate"} className={style.link}>{t("header:estate")}</a>
                    <Link href={"/evaluation"} className={style.link}>{t("header:evaluation")}</Link>
                    <Link href={"/construction"} className={style.link}>{t("header:construction")}</Link>
                    <Link href={"/contacts"} className={style.link}>{t("header:contacts")}</Link>
                </div>
                <Link href={"https://goo.gl/maps/NDsMu6p2Ne5XRHCU8"} target={"_blank"} className={style.info}>G. Zemgala gatve 68, Rīga,1039 LV, Latvija</Link>
                <Link href={"tel:+37167818686"} className={style.info}>+371 67818686</Link>
                <Link href={"mailto:info@maksv.lv"} className={style.info}>info@maksv.lv</Link>
                <div className={style.info + " " + style.rights}>© {new Date().getFullYear()} Maks V. All rights are reserved </div>
                <div className={style.hr}/>
            </div>
        </footer>
    )
}

export default Header;
