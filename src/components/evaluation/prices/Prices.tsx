import React from "react";
import { useTranslation } from "next-i18next";
import styles from './prices.module.scss';
import Link from "next/link";



export default function Prices() {

    const { t } = useTranslation();


    return (
        <div className={styles.pricesSection + " wrapper"} id={"prices"}>
            <h2>{t("evaluationPage:prices.title")}</h2>
            <div className={styles.prices}>
                <div className={styles.table}>
                    <div className={styles.row + " " + styles.title}>
                        <div className={styles.name}>{t("evaluationPage:prices.ser")}</div>
                        <div className={styles.price}>{t("evaluationPage:prices.price")}</div>
                        <div className={styles.range}>{t("evaluationPage:prices.range")}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.name}>{t("evaluationPage:prices.apbuve")}</div>
                        <div className={styles.price}>180€</div>
                        <div className={styles.range}>3-4 {t("evaluationPage:prices.workDays")}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.name}>{t("evaluationPage:prices.lauk")}</div>
                        <div className={styles.price}>220-250€</div>
                        <div className={styles.range}>3-4 {t("evaluationPage:prices.workDays")}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.name}>{t("evaluationPage:prices.zeme")}</div>
                        <div className={styles.price}>250€</div>
                        <div className={styles.range}>5-7 {t("evaluationPage:prices.workDays")}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.name}>{t("evaluationPage:prices.lauk2")}</div>
                        <div className={styles.price}>350€</div>
                        <div className={styles.range}>5-7 {t("evaluationPage:prices.workDays")}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.name}>{t("evaluationPage:prices.h100")}</div>
                        <div className={styles.price}>215€</div>
                        <div className={styles.range}>5-7 {t("evaluationPage:prices.workDays")}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.name}>{t("evaluationPage:prices.h200")}</div>
                        <div className={styles.price}>250€</div>
                        <div className={styles.range}>5-7 {t("evaluationPage:prices.workDays")}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.name}>{t("evaluationPage:prices.h300")}</div>
                        <div className={styles.price}>320€</div>
                        <div className={styles.range}>5-8 {t("evaluationPage:prices.workDays")}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.name}>{t("evaluationPage:prices.h500")}</div>
                        <div className={styles.price}>450€</div>
                        <div className={styles.range}>7-10 {t("evaluationPage:prices.workDays")}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.name}>{t("evaluationPage:prices.future")}</div>
                        <div className={styles.price}>+100€</div>
                        <div className={styles.range}></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.name}>{t("evaluationPage:prices.flat")}</div>
                        <div className={styles.price}>130€</div>
                        <div className={styles.range}>2-3 {t("evaluationPage:prices.workDays")}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.name}>{t("evaluationPage:prices.spec")}</div>
                        <div className={styles.price}>150€</div>
                        <div className={styles.range}>3-4 {t("evaluationPage:prices.workDays")}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.name}>{t("evaluationPage:prices.new")}</div>
                        <div className={styles.price}>170€</div>
                        <div className={styles.range}>3-4 {t("evaluationPage:prices.workDays")}</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.name}>{t("evaluationPage:prices.park")}</div>
                        <div className={styles.price}>+50€</div>
                        <div className={styles.range}></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.name}>{t("evaluationPage:prices.future2")}</div>
                        <div className={styles.price}>+70€</div>
                        <div className={styles.range}></div>
                    </div>
                </div>
                <div className={styles.contactUs}>
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
                            <Link href={"tel:+37167818686"}>+371 67818686</Link>
                        </p>
                        <p>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.4643 16.1049C14.5656 16.9689 13.3446 17.5 11.9995 17.5C9.23806 17.5 6.99949 15.2614 6.99949 12.5C6.99949 9.73858 9.23806 7.5 11.9995 7.5C13.1251 7.5 14.1638 7.87194 14.9995 8.49963V7.5H16.9995V12.5C16.9995 14.9709 17.189 15.5 17.9995 15.5C19.3038 15.5 19.9995 14.8832 19.9995 12.5C19.9995 7.21065 17.3465 4.5 11.9996 4.5C8.53557 4.50044 5.46535 6.73026 4.39334 10.0243C3.32133 13.3182 4.49111 16.928 7.29139 18.9671C10.0917 21.0062 13.8862 21.0114 16.6921 18.98L17.8649 20.6C14.3576 23.1393 9.61443 23.1328 6.11408 20.5839C2.61373 18.0349 1.15151 13.5228 2.49152 9.40532C3.83153 5.28783 7.66931 2.50054 11.9995 2.5C18.4609 2.5 21.9995 6.1156 21.9995 12.5C21.9995 16.0449 20.3584 17.5 17.9995 17.5C16.6556 17.5 15.8865 17.0667 15.4643 16.1049ZM11.9995 15.5C13.6563 15.5 14.9995 14.1569 14.9995 12.5C14.9995 10.8431 13.6563 9.5 11.9995 9.5C10.3426 9.5 8.99949 10.8431 8.99949 12.5C8.99949 14.1569 10.3426 15.5 11.9995 15.5Z" fill="#133348"/>
                            </svg>
                            <Link href={"mailto:info@maksv.lv"}>info@maksv.lv</Link>
                        </p>
                        <p>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M19.6342 5.0355C17.6652 3.06425 15.0468 1.97819 12.257 1.97705C6.50877 1.97705 1.8303 6.65513 1.82806 12.4051C1.82726 14.2432 2.30749 16.0373 3.22015 17.6189L1.7406 23.023L7.26911 21.5728C8.79235 22.4036 10.5074 22.8416 12.2528 22.8421H12.2571C12.2567 22.8421 12.2574 22.8421 12.2571 22.8421C18.0047 22.8421 22.6835 18.1636 22.686 12.4135C22.687 9.62684 21.6032 7.00667 19.6342 5.0355ZM12.257 21.0809H12.2535C10.6982 21.0803 9.17263 20.6624 7.84176 19.8726L7.52527 19.6848L4.24457 20.5454L5.12028 17.3467L4.91416 17.0187C4.04649 15.6387 3.58824 14.0436 3.58891 12.4057C3.59078 7.62655 7.47934 3.73841 12.2605 3.73841C14.5758 3.73913 16.7521 4.64197 18.3887 6.2804C20.0252 7.91882 20.926 10.0967 20.9251 12.4128C20.9231 17.1923 17.0347 21.0809 12.257 21.0809Z" fill="#133348"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M17.0117 14.5892C16.7511 14.4587 15.4699 13.8284 15.2311 13.7414C14.9922 13.6544 14.8185 13.611 14.6448 13.8718C14.4711 14.1326 13.9717 14.7196 13.8197 14.8936C13.6677 15.0674 13.5156 15.0893 13.2551 14.9587C12.9946 14.8283 12.1549 14.5532 11.1596 13.6654C10.3849 12.9744 9.86199 12.1211 9.70993 11.8602C9.55795 11.5994 9.69376 11.4584 9.82423 11.3284C9.94145 11.2116 10.0848 11.0241 10.2151 10.8719C10.3454 10.7198 10.3888 10.611 10.4757 10.4372C10.5626 10.2633 10.5192 10.1111 10.454 9.98068C10.3888 9.85025 9.8677 8.56763 9.65058 8.04579C9.439 7.53775 9.2242 7.60658 9.06422 7.5985C8.91245 7.59092 8.73851 7.58936 8.56481 7.58936C8.39112 7.58936 8.10876 7.65459 7.86996 7.91541C7.63111 8.17631 6.95789 8.80678 6.95789 10.0893C6.95789 11.3719 7.89163 12.611 8.02193 12.7849C8.15219 12.9589 9.85941 15.5908 12.4734 16.7195C13.0951 16.9881 13.5805 17.1484 13.9589 17.2684C14.5832 17.4668 15.1512 17.4388 15.6002 17.3717C16.1009 17.2969 17.142 16.7413 17.3591 16.1327C17.5763 15.524 17.5763 15.0022 17.5111 14.8935C17.446 14.7849 17.2722 14.7196 17.0117 14.5892Z" fill="#133348"/>
                            </svg>
                            <Link href={"https://wa.me/+37167818686"}>+371 67818686</Link>
                        </p>
                    </div>
                    <Link href={"/contacts"} className={styles.button}>{t("homePage:button.contactUs")}</Link>
                </div>
            </div>
        </div>
    )
}
