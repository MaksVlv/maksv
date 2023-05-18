import React, { FormEvent, useRef, useState } from "react";
import styles from './form.module.scss';
import { useTranslation } from "next-i18next";
import emailjs from '@emailjs/browser';

interface FormProps {
    emailJSPublic: string
}

export default function Form({ emailJSPublic }: FormProps) {

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

        emailjs.sendForm('service_ldtnsfx', 'template_hmmlcrn', formRef.current, emailJSPublic)
            .then((_res) => {
                sent();
            }, (_err) => {
                error();
            });
    }

    return (
        <form onSubmit={e => onSubmit(e)} className={styles.form + " wrapper"} ref={formRef}>
            <h2>{t("homePage:button.contactUs")}</h2>
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
    );
}
