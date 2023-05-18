import React from "react";
import styles from './headerSection.module.scss';
import Image, { StaticImageData } from "next/image";
import {useTranslation} from "next-i18next";


interface HeaderSectionProps {
    title: string,
    p: string,
    image: StaticImageData
}

export default function HeaderSection({ title, p, image }: HeaderSectionProps) {

    const { t } = useTranslation();

    return (
        <div className={styles.headerSection}>
            <Image src={image} alt={"Contacts"}/>
            <div className={styles.info + " wrapper"}>
                <h1>{title}</h1>
                <p dangerouslySetInnerHTML={{ __html: p || "" }}/>
            </div>
        </div>
    );
}
