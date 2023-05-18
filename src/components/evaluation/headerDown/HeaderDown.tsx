import React from "react";
import styles from './headerDown.module.scss';
import Image, { StaticImageData } from "next/image";
import { useTranslation } from "next-i18next";


interface HeaderDownProps {
    title: string,
    p: string,
    image: StaticImageData
}

export default function HeaderDown({ title, p, image }: HeaderDownProps) {

    const { t } = useTranslation();

    return (
        <div className={styles.headerDown}>
            <Image src={image} alt={"Eval"}/>
            <div className={styles.info + " wrapper"}>
                <h1 dangerouslySetInnerHTML={{ __html: title || "" }}/>
                <p dangerouslySetInnerHTML={{ __html: p || "" }}/>
            </div>
        </div>
    );
}
