import React from "react";
import styles from './contacts.module.scss';
import Image from "next/image";
import ContactsImage from '../../../assets/contacts/contacts.png';
import {useTranslation} from "next-i18next";
import Link from "next/link";

export default function Contacts() {

    const { t } = useTranslation();

    return (
        <div className={styles.contacts + " wrapper"}>
            <div className={styles.info}>
                <h2>{t("contactsPage:header.title")}</h2>
                <p>{t("contactsPage:p")}</p>
                <div className={styles.data}>
                    <div className={styles.block}>
                        <Link href={"https://goo.gl/maps/NDsMu6p2Ne5XRHCU8"} target={"_blank"}>
                            <svg width="41" height="33" viewBox="0 0 41 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.25 6.78711V31.1152C0.25 31.959 1.02344 32.5215 1.72656 32.1699L11.5 27.7402V0.740234L1.65625 4.67773C0.8125 5.0293 0.25 5.87305 0.25 6.78711ZM13.75 27.7402L27.25 32.2402V5.24023L13.75 0.740234V27.7402ZM39.2031 0.880859L29.5 5.24023V32.2402L39.2734 28.373C40.1172 28.0215 40.75 27.1777 40.75 26.2637V1.93555C40.75 1.0918 39.9062 0.529297 39.2031 0.880859Z" fill="#FFCA50"/>
                            </svg>
                            <div>
                                <h3>{t("contactsPage:address")}</h3>
                                <div className={styles.dataParam}>G. Zemgala gatve 68, Rīga,1039 LV, Latvija</div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.block}>
                        <Link href={"tel:+37167818686"}>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M33.9512 2.25391L26.8418 0.613281C26.0898 0.408203 25.2695 0.818359 24.9277 1.57031L21.6465 9.22656C21.373 9.91016 21.5781 10.6621 22.125 11.1406L26.2949 14.5586C23.834 19.7539 19.5273 24.1289 14.1953 26.6582L10.7773 22.4883C10.2988 21.9414 9.54688 21.7363 8.86328 22.0098L1.20703 25.291C0.455078 25.6328 0.113281 26.4531 0.25 27.2051L1.89062 34.3145C2.0957 35.0664 2.71094 35.5449 3.53125 35.5449C21.0312 35.5449 35.25 21.3945 35.25 3.82617C35.25 3.07422 34.7031 2.45898 33.9512 2.25391Z" fill="#FFCA50"/>
                            </svg>
                            <div>
                                <h3>{t("contactsPage:tel")}</h3>
                                <div className={styles.dataParam}>+371 67818686</div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.block}>
                        <Link href={"mailto:info@maksv.lv"}>
                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31.6667 4.75H6.33333C2.85 4.75 0 7.6 0 11.0833V26.9167C0 30.4 2.85 33.25 6.33333 33.25H31.6667C35.15 33.25 38 30.4 38 26.9167V11.0833C38 7.6 35.15 4.75 31.6667 4.75ZM34.2 13.9333L21.6917 22.325C20.9 22.8 19.95 23.1167 19 23.1167C18.05 23.1167 17.1 22.8 16.3083 22.325L3.8 13.9333C3.16667 13.4583 3.00833 12.5083 3.48333 11.7167C3.95833 11.0833 4.90833 10.925 5.7 11.4L18.2083 19.7917C18.6833 20.1083 19.475 20.1083 19.95 19.7917L32.4583 11.4C33.25 10.925 34.2 11.0833 34.675 11.875C34.9917 12.5083 34.8333 13.4583 34.2 13.9333Z" fill="#FFCA50"/>
                            </svg>
                            <div>
                                <h3>{t("contactsPage:email")}</h3>
                                <div className={styles.dataParam}>info@maksv.lv</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.image}>
                <Image src={ContactsImage} alt="Contact Image"/>
            </div>
        </div>
    );
}
