import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from '@/styles/global.module.scss';
import Header from './header/Header';
import Footer from './footer/Footer';

interface MainContainer {
    children?: React.ReactNode,
    title?: string | null,
    description?: string | null,
    keywords?: string | null,
    headerBackgroundDefault?: boolean
}

const MainContainer = ({ children, title, description, keywords, headerBackgroundDefault }: MainContainer) => {

    const router = useRouter();

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#FFF" />
                <meta name="author" content="maksv" />
                {title && <title>{ title }</title>}
                {description && <meta name="description" content={ description } />}
                {keywords && <meta name="keywords" content={ keywords } />}

                <meta property="og:type" content="website" />
                <meta property="og:url" content={"https://www.maksv.lv" + (router.locale === "lv" ? "" : "/" + router.locale) + router.pathname} />
                <meta property="og:image" content="https://www.maksv.lv/ogImage.jpg" />
                {title && <meta property="og:title" content={ title } />}
                {description && <meta property="og:description" content={ description } />}
                <meta property="og:locale" content={router.locale} />
                <meta property="og:site_name" content="Maksv Real estate" />

                <link rel="alternate" hrefLang="en" href={"https://www.maksv.lv" + router.pathname}/>
                <link rel="alternate" hrefLang="lv" href={"https://www.maksv.lv/lv" + router.pathname}/>
                <link rel="alternate" hrefLang="ru" href={"https://www.maksv.lv/ru" + router.pathname}/>
                <link rel="alternate" hrefLang="x-default" href="https://maksv.lv"/>

            </Head>
            <Header backgroundDefault={headerBackgroundDefault} />
            <div className={styles.mainBlock}>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default MainContainer;
