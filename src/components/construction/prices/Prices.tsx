import React  from "react";
import styles from './prices.module.scss';
import { useTranslation } from "next-i18next";


export default function Prices() {

    const { t } = useTranslation();


    return (
        <div className={styles.prices}>
            <div className={styles.block + " wrapper"}>
                <h2>{t("constructionPage:prices.title")}</h2>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.6631 9.84033C29.6631 11.106 28.6084 12.0903 27.4131 12.0903H2.66309C1.39746 12.0903 0.413086 11.106 0.413086 9.84033V3.09033C0.413086 1.89502 1.39746 0.840332 2.66309 0.840332H27.4131C28.6084 0.840332 29.6631 1.89502 29.6631 3.09033V9.84033ZM31.9131 5.34033C34.374 5.34033 36.4131 7.37939 36.4131 9.84033V14.3403C36.4131 18.1372 33.3896 21.0903 29.6631 21.0903H18.4131V23.3403C19.6084 23.3403 20.6631 24.395 20.6631 25.5903V34.5903C20.6631 35.856 19.6084 36.8403 18.4131 36.8403H13.9131C12.6475 36.8403 11.6631 35.856 11.6631 34.5903V25.5903C11.6631 24.395 12.6475 23.3403 13.9131 23.3403V21.0903C13.9131 18.6294 15.8818 16.5903 18.4131 16.5903H29.6631C30.8584 16.5903 31.9131 15.606 31.9131 14.3403V5.34033Z" fill="#FFC233"/>
                        </svg>
                        <h4>{t("constructionPage:prices.fix")}</h4>
                        <p>400-700 € m2</p>
                    </div>
                    <div className={styles.stat}>
                        <svg fill="#FFC233" xmlns="http://www.w3.org/2000/svg" width="36px" height="36px" viewBox="0 0 406.191 406.19">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                            <g id="SVGRepo_iconCarrier"><g><g><g id="Layer_5_64_"><g>
                                <path d="M73.574,272.369c-2.75,0-5,2.25-5,5v123.818c0,2.75,2.25,5,5,5h111.053c2.75,0,5.227-2.236,5.503-4.975l3.032-40.92 c0.33-2.729,3.975-2.744,4.428-0.032l4.344,40.985c0.424,2.717,3.021,4.939,5.771,4.939h26.581c2.75,0,5.206-2.239,5.457-4.979 l4.792-64.237c0.312-2.729,3.943-2.75,4.408-0.038l7.467,64.312c0.404,2.719,2.986,4.943,5.736,4.943h13.797 c2.75,0,5.324-2.227,5.721-4.946l1.836-23.647c0.722-2.651,4.092-2.713,5.045-0.133l3.629,23.848 c0.601,2.686,3.339,4.882,6.089,4.882h34.354c2.75,0,5-2.25,5-5V277.37c0-2.75-2.25-5-5-5L73.574,272.369L73.574,272.369z"/>
                                <path d="M332.617,255.48c2.75,0,5-2.25,5-5v-52.938c0-2.75-2.25-5-5-5H73.574c-2.75,0-5,2.25-5,5v52.938c0,2.75,2.25,5,5,5 H332.617z"/>
                                <path d="M234.406,0h-62.621c-5.922,0-10.768,4.846-10.768,10.77l8.775,154.117c0,5.922,4.846,10.768,10.769,10.768h45.068 c5.924,0,10.771-4.846,10.771-10.768l8.774-154.117C245.173,4.846,240.327,0,234.406,0z"/>
                            </g></g></g></g></g>
                        </svg>
                        <h4>{t("constructionPage:prices.renovation")}</h4>
                        <p>700-1500 € m2</p>
                    </div>
                    <div className={styles.stat}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="36px" height="36px">
                            <path d="M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z"  fill="#FFC233"/>
                        </svg>
                        <h4>{t("constructionPage:prices.private")}</h4>
                        <p>1200-2000 € m2</p>
                    </div>
                </div>
            </div>
        </div>
    );
}