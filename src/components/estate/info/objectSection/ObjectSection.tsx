import React from "react";
import { useTranslation } from 'next-i18next';
import style from './objectSection.module.scss'
import Slider from './Slider'
import { IEstate } from "../../../../types";
import Link from "next/link";
import {useRouter} from "next/router";


interface ObjectSectionProps {
    estate: IEstate
}

const ObjectSection = ({ estate }: ObjectSectionProps) => {

    const router = useRouter()
    const { t, i18n } = useTranslation()


    return (
        <div className={style.objectSection + " wrapper"}>
            <div className={style.photos}>
                <div className={style.photoBlock}>
                    <Slider images={[estate.mainImage, ...estate.images]} />
                </div>
                <div className={style.contactUs}>
                    <h3>{t("estatePage:info.contactUs.title")}</h3>
                    <div>
                        <p>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_3781_10590)">
                                    <path d="M6.625 11.295C8.065 14.125 10.38 16.44 13.215 17.88L15.415 15.675C15.69 15.4 16.085 15.32 16.43 15.43C17.55 15.8 18.755 16 20 16C20.555 16 21 16.445 21 17V20.5C21 21.055 20.555 21.5 20 21.5C10.61 21.5 3 13.89 3 4.5C3 3.945 3.45 3.5 4 3.5H7.5C8.055 3.5 8.5 3.945 8.5 4.5C8.5 5.745 8.7 6.95 9.07 8.07C9.18 8.415 9.1 8.81 8.825 9.085L6.625 11.295Z" fill="#133348"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_3781_10590">
                                        <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <Link href={"tel:+37167818686"}>+371 67-818-686</Link>
                        </p>
                        <p>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.4643 16.1049C14.5656 16.9689 13.3446 17.5 11.9995 17.5C9.23806 17.5 6.99949 15.2614 6.99949 12.5C6.99949 9.73858 9.23806 7.5 11.9995 7.5C13.1251 7.5 14.1638 7.87194 14.9995 8.49963V7.5H16.9995V12.5C16.9995 14.9709 17.189 15.5 17.9995 15.5C19.3038 15.5 19.9995 14.8832 19.9995 12.5C19.9995 7.21065 17.3465 4.5 11.9996 4.5C8.53557 4.50044 5.46535 6.73026 4.39334 10.0243C3.32133 13.3182 4.49111 16.928 7.29139 18.9671C10.0917 21.0062 13.8862 21.0114 16.6921 18.98L17.8649 20.6C14.3576 23.1393 9.61443 23.1328 6.11408 20.5839C2.61373 18.0349 1.15151 13.5228 2.49152 9.40532C3.83153 5.28783 7.66931 2.50054 11.9995 2.5C18.4609 2.5 21.9995 6.1156 21.9995 12.5C21.9995 16.0449 20.3584 17.5 17.9995 17.5C16.6556 17.5 15.8865 17.0667 15.4643 16.1049ZM11.9995 15.5C13.6563 15.5 14.9995 14.1569 14.9995 12.5C14.9995 10.8431 13.6563 9.5 11.9995 9.5C10.3426 9.5 8.99949 10.8431 8.99949 12.5C8.99949 14.1569 10.3426 15.5 11.9995 15.5Z" fill="#133348"/>
                            </svg>
                            <Link href={"mailto:info@maksv.lv"}>info@maksv.lv</Link>
                        </p>
                    </div>
                    <Link href={`https://www.maksv.lv/${router.locale === "lv" ? '' : router.locale}#footer`} className={style.button}>{t("homePage:button.contactUs")}</Link>
                </div>
            </div>
        </div>
    )
}

export default ObjectSection;
