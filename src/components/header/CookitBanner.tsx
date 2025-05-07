import styles from "./header.module.scss";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {useTranslation} from "next-i18next";
import Link from "next/link";

export const CookieBanner = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { t, i18n } = useTranslation('policy')

    useEffect(() => {
        if (!window.localStorage.getItem("cookies_makvs")) {
            setIsOpen(true);
        }
    }, []);

    const onAgreeClick = () => {
        window.localStorage.setItem("cookies_makvs", "true");
        setIsOpen(false);
    }

    return (
      <>
          {isOpen && createPortal(
            <div className={'fixed bottom-0 w-full bg-[#133348] py-4 z-50 border-t border-white'}>
                <div className={'wrapper text-white flex flex-col lg:flex-row justify-between gap-2 lg:gap-8 items-center'}>
                    <div className={'flex flex-col gap-2'}>
                        <div className={'font-semibold text-2xl'}>{t('cookie.title')}</div>
                        <div>{t('cookie.text')}</div>
                    </div>

                    <div className={'w-full lg:w-fit flex flex-col gap-2'}>
                        <button className={'w-full lg:w-fit order-2 lg:order-1 py-3 px-24 bg-[#FFC53C] rounded-[18px] whitespace-nowrap hover:bg-white hover:text-[#FFC53C] border border-[#FFC53C]'} onClick={() => onAgreeClick()}>{t('cookie.button')}</button>
                        <Link className={'underline order-1 lg:order-2 text-center font-semibold lg:font-normal'} href={'/policies'}>{t('cookie.policy')}</Link>
                    </div>
                </div>
            </div>
            , document.body
          )}
      </>
    )
}