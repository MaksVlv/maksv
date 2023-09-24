import React, { FormEvent, useRef, useState } from "react";
import styles from './form.module.scss';
import { useTranslation } from "next-i18next";
import emailjs from '@emailjs/browser';
import Image from "next/image";
import { LogoSvg } from "../../../assets/logo/LogoSvg";
import { LogoSvgWhite } from "../../../assets/logo/LogoSvgWhite";
import formBg from "../../../assets/contacts/formBg.png";

interface FormProps {
    emailJSPublic: string,
    bg?: boolean,
}

export default function Form({ emailJSPublic, bg = false }: FormProps) {

    const { t } = useTranslation();
    const [formStatus, setFormStatus] = useState<String>("button");
    const formRef = useRef<HTMLFormElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const loading = () => {
        setFormStatus("buttonLoading");
    }
    const sent = () => {
        setFormStatus("buttonSend");
        if (buttonRef.current) {
            buttonRef.current.classList.add(styles.buttonSent)
            buttonRef.current.disabled = true
        }
    }
    const error = () => {
        if (buttonRef.current) {
            setFormStatus("buttonError")
            buttonRef.current.disabled = true
        }
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formRef.current) return;

        loading();

        emailjs.sendForm('service_ohgcgq5', 'template_uei3fr9', formRef.current, emailJSPublic)
            .then((_res) => {
                sent();
            }, (_err) => {
                error();
            });
    }

    return (
        <div id={"contact-me"} style={bg ? { paddingTop: "80px" } : {}}>
            <div className={styles.top + " " + (bg ? styles.bg : "")}>
                <div className={styles.formTop + " wrapper"}>
                    <h2>{t("contactsPage:top.title")}</h2>
                    <div className={styles.infoBlock}>
                        <div className={styles.logo}>
                            {bg ?
                                <LogoSvgWhite />
                                :
                                <LogoSvg />
                            }
                        </div>
                        <div className={styles.info}>
                            <div className={styles.line}>
                                <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M28.3346 35V31.6667C28.3346 29.8986 27.6323 28.2029 26.382 26.9526C25.1318 25.7024 23.4361 25 21.668 25H8.33464C6.56653 25 4.87083 25.7024 3.62059 26.9526C2.37035 28.2029 1.66797 29.8986 1.66797 31.6667V35" stroke="#133348" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14.9987 18.3333C18.6806 18.3333 21.6654 15.3486 21.6654 11.6667C21.6654 7.98477 18.6806 5 14.9987 5C11.3168 5 8.33203 7.98477 8.33203 11.6667C8.33203 15.3486 11.3168 18.3333 14.9987 18.3333Z" stroke="#133348" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M38.332 35.0001V31.6668C38.3309 30.1897 37.8393 28.7548 36.9343 27.5873C36.0293 26.4199 34.7622 25.5861 33.332 25.2168" stroke="#133348" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M26.668 5.2168C28.102 5.58397 29.373 6.41797 30.2807 7.58731C31.1884 8.75666 31.681 10.1948 31.681 11.6751C31.681 13.1554 31.1884 14.5936 30.2807 15.7629C29.373 16.9323 28.102 17.7663 26.668 18.1335" stroke="#133348" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {t("contactsPage:top.info.first")}
                            </div>
                            <div className={styles.line}>
                                <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.9987 3.33325L25.1487 13.7666L36.6654 15.4499L28.332 23.5666L30.2987 35.0333L19.9987 29.6166L9.6987 35.0333L11.6654 23.5666L3.33203 15.4499L14.8487 13.7666L19.9987 3.33325Z" stroke="#133348" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {t("contactsPage:top.info.second")}
                            </div>
                            <div className={styles.line}>
                                <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30 35C32.7614 35 35 32.7614 35 30C35 27.2386 32.7614 25 30 25C27.2386 25 25 27.2386 25 30C25 32.7614 27.2386 35 30 35Z" stroke="#133348" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z" stroke="#133348" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21.668 10H26.668C27.552 10 28.3999 10.3512 29.025 10.9763C29.6501 11.6014 30.0013 12.4493 30.0013 13.3333V25" stroke="#133348" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10 15V35" stroke="#133348" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {t("contactsPage:top.info.third")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom + " " + (bg ? styles.bg : "")}>
                {bg &&
                    <div className={styles.back}>
                        <Image src={formBg} alt={"formBg"} />
                    </div>
                }
                <form onSubmit={e => onSubmit(e)} className={styles.form + " wrapper"} ref={formRef}>
                    <h2>{t("contactsPage:bottom.title")}</h2>
                    <p>{t("contactsPage:bottom.p")}</p>
                    <div className={styles.row}>
                        <div className={styles.input}>
                            <label htmlFor="name">{t("contactsPage:form.name")}</label>
                            <input type="text" id={"name"} name={"name"} placeholder={t("contactsPage:form.namePlaceholder") || "Your Name / Surname"} required={true}/>
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="phone">{t("contactsPage:form.phone")}</label>
                            <input type="number" name={"phone"} id={"phone"} placeholder={t("contactsPage:form.phonePlaceholder") || "Your Phone Number"}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.input}>
                            <label htmlFor="email">{t("contactsPage:form.email")}</label>
                            <input type="email" name={"email"} id={"email"} placeholder={t("contactsPage:form.emailPlaceholder") || "Your email"} required={true}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.input}>
                            <label htmlFor="message">{t("contactsPage:form.message")}</label>
                            <textarea name="message" id="message" placeholder={t("contactsPage:form.messagePlaceholder") || "Let us know about your dreams"} required={true} />
                        </div>
                    </div>
                    <div className={styles.rowButton}>
                        <button type={"submit"} ref={buttonRef}>{t(`contactsPage:form.${formStatus}`)}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
