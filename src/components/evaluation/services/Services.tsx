import React from "react";
import { useTranslation } from "next-i18next";
import styles from './services.module.scss';



export default function Services() {

    const { t } = useTranslation();


    return (
        <div className={styles.services + " wrapper"}>
            <h2>{t("evaluationPage:services.title")}</h2>
            <p>{t("evaluationPage:services.p")}</p>
            <div className={styles.blocks}>
                <div className={styles.block}>
                    <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 29.0469V32C0.5 34.5312 6.54688 36.5 14 36.5C21.4531 36.5 27.5 34.5312 27.5 32V29.0469C24.5469 31.0859 19.2734 32 14 32C8.65625 32 3.38281 31.0859 0.5 29.0469ZM23 9.5C30.4531 9.5 36.5 7.53125 36.5 5C36.5 2.53906 30.4531 0.5 23 0.5C15.5469 0.5 9.5 2.53906 9.5 5C9.5 7.53125 15.5469 9.5 23 9.5ZM0.5 21.6641V25.25C0.5 27.7812 6.54688 29.75 14 29.75C21.4531 29.75 27.5 27.7812 27.5 25.25V21.6641C24.5469 24.0547 19.2734 25.25 14 25.25C8.65625 25.25 3.38281 24.0547 0.5 21.6641ZM29.75 22.4375C33.7578 21.6641 36.5 20.1875 36.5 18.5V15.5469C34.8125 16.6719 32.4219 17.4453 29.75 17.9375V22.4375ZM14 11.75C6.54688 11.75 0.5 14.2812 0.5 17.375C0.5 20.5391 6.54688 23 14 23C21.4531 23 27.5 20.5391 27.5 17.375C27.5 14.2812 21.4531 11.75 14 11.75ZM29.3984 15.7578C33.6172 14.9844 36.5 13.5078 36.5 11.75V8.79688C33.9688 10.5547 29.6797 11.4688 25.1797 11.75C27.2188 12.7344 28.7656 14.0703 29.3984 15.7578Z" fill="#FFCA50"/>
                    </svg>
                    <h3>{t("evaluationPage:services.first.h3")}</h3>
                    <p dangerouslySetInnerHTML={{ __html: t("evaluationPage:services.first.p") || "" }}/>
                </div>
                <div className={styles.block}>
                    <svg width="36" height="27" viewBox="0 0 36 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.3262 25.9233L0.978516 14.5757C0.294922 13.8921 0.294922 12.73 0.978516 12.0464L3.43945 9.58545C4.12305 8.90186 5.2168 8.90186 5.90039 9.58545L13.625 17.2417L30.0312 0.835449C30.7148 0.151855 31.8086 0.151855 32.4922 0.835449L34.9531 3.29639C35.6367 3.97998 35.6367 5.14209 34.9531 5.82568L14.8555 25.9233C14.1719 26.6069 13.0098 26.6069 12.3262 25.9233Z" fill="#FFCA50"/>
                    </svg>
                    <h3>{t("evaluationPage:services.second.h3")}</h3>
                    <p dangerouslySetInnerHTML={{ __html: t("evaluationPage:services.second.p") || "" }}/>
                </div>
                <div className={styles.block}>
                    <svg width="45" height="28" viewBox="0 0 45 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.5156 0C31.1484 0 31.7109 0.28125 32.1328 0.703125L35.9297 4.5V18.1406C35.7891 17.9297 35.5781 17.7891 35.4375 17.5781L25.1719 9.28125L27 7.59375C27.4922 7.17188 27.4922 6.46875 27.0703 6.04688C26.6484 5.55469 25.9453 5.55469 25.4531 5.97656L19.8984 11.1094C19.8281 11.1094 19.8281 11.1094 19.8281 11.1094C18.6328 12.1641 16.8047 11.8828 15.8906 10.8984C14.9062 9.84375 14.9062 8.08594 16.0312 6.96094L22.9922 0.632812C23.4141 0.210938 23.9062 0 24.4688 0H30.5156ZM38.25 4.57031H45V22.5703H40.5C39.2344 22.5703 38.25 21.5156 38.25 20.3203V4.57031ZM41.625 20.3203C42.1875 20.3203 42.75 19.7578 42.75 19.1953C42.75 18.5625 42.1875 18.0703 41.625 18.0703C40.9922 18.0703 40.5 18.5625 40.5 19.1953C40.5 19.7578 40.9922 20.3203 41.625 20.3203ZM0 22.5V4.57031H6.75V20.25C6.75 21.5156 5.69531 22.5 4.5 22.5H0ZM3.375 18.0703C2.74219 18.0703 2.25 18.5625 2.25 19.1953C2.25 19.7578 2.74219 20.3203 3.375 20.3203C3.9375 20.3203 4.5 19.7578 4.5 19.1953C4.5 18.5625 3.9375 18.0703 3.375 18.0703ZM33.9609 19.3359C34.9453 20.1094 35.0859 21.5156 34.3125 22.5L33.6797 23.3438C32.8359 24.3281 31.4297 24.4688 30.5156 23.6953L30.0938 23.3438L27.9141 26.0859C27 27.2109 25.3125 27.3516 24.1875 26.4375L22.9922 25.3828H22.9219C21.375 27.2812 18.5625 27.6328 16.5938 26.0156L10.2656 20.25H9V4.5L12.7969 0.703125C13.2188 0.28125 13.7812 0 14.4141 0H20.3203L14.5547 5.27344C12.5156 7.17188 12.375 10.4062 14.2031 12.4453C16.1016 14.4844 19.2656 14.6953 21.375 12.7266L23.4844 10.8281L33.9609 19.3359Z" fill="#FFCA50"/>
                    </svg>
                    <h3>{t("evaluationPage:services.third.h3")}</h3>
                    <p dangerouslySetInnerHTML={{ __html: t("evaluationPage:services.third.p") || "" }}/>
                </div>
                <div className={styles.block}>
                    <svg width="32" height="37" viewBox="0 0 32 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.9062 34.0498C31.3281 34.0498 31.75 34.4717 31.75 34.8936V36.2998H0.25V34.8936C0.25 34.4717 0.601562 34.0498 1.09375 34.0498H2.5V1.9873C2.5 1.07324 3.20312 0.299805 4.1875 0.299805H27.8125C28.7266 0.299805 29.5 1.07324 29.5 1.9873V34.0498H30.9062ZM9.25 5.64355V8.45605C9.25 8.94824 9.60156 9.2998 10.0938 9.2998H12.9062C13.3281 9.2998 13.75 8.94824 13.75 8.45605V5.64355C13.75 5.22168 13.3281 4.7998 12.9062 4.7998H10.0938C9.60156 4.7998 9.25 5.22168 9.25 5.64355ZM9.25 12.3936V15.2061C9.25 15.6982 9.60156 16.0498 10.0938 16.0498H12.9062C13.3281 16.0498 13.75 15.6982 13.75 15.2061V12.3936C13.75 11.9717 13.3281 11.5498 12.9062 11.5498H10.0938C9.60156 11.5498 9.25 11.9717 9.25 12.3936ZM12.9062 22.7998C13.3281 22.7998 13.75 22.4482 13.75 21.9561V19.1436C13.75 18.7217 13.3281 18.2998 12.9062 18.2998H10.0938C9.60156 18.2998 9.25 18.7217 9.25 19.1436V21.9561C9.25 22.4482 9.60156 22.7998 10.0938 22.7998H12.9062ZM18.25 34.0498V28.1436C18.25 27.7217 17.8281 27.2998 17.4062 27.2998H14.5938C14.1016 27.2998 13.75 27.7217 13.75 28.1436V34.0498H18.25ZM22.75 21.9561V19.1436C22.75 18.7217 22.3281 18.2998 21.9062 18.2998H19.0938C18.6016 18.2998 18.25 18.7217 18.25 19.1436V21.9561C18.25 22.4482 18.6016 22.7998 19.0938 22.7998H21.9062C22.3281 22.7998 22.75 22.4482 22.75 21.9561ZM22.75 15.2061V12.3936C22.75 11.9717 22.3281 11.5498 21.9062 11.5498H19.0938C18.6016 11.5498 18.25 11.9717 18.25 12.3936V15.2061C18.25 15.6982 18.6016 16.0498 19.0938 16.0498H21.9062C22.3281 16.0498 22.75 15.6982 22.75 15.2061ZM22.75 8.45605V5.64355C22.75 5.22168 22.3281 4.7998 21.9062 4.7998H19.0938C18.6016 4.7998 18.25 5.22168 18.25 5.64355V8.45605C18.25 8.94824 18.6016 9.2998 19.0938 9.2998H21.9062C22.3281 9.2998 22.75 8.94824 22.75 8.45605Z" fill="#FFCA50"/>
                    </svg>
                    <h3>{t("evaluationPage:services.fourth.h3")}</h3>
                    <p dangerouslySetInnerHTML={{ __html: t("evaluationPage:services.fourth.p") || "" }}/>
                </div>
            </div>
        </div>
    )
}
