import { useEffect } from "react";
import '@/styles/globals.css'
import { useRouter } from "next/router";
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-image-gallery/styles/css/image-gallery.css";
import 'react-loading-skeleton/dist/skeleton.css'
import { ToastContainer } from 'react-toastify';
import { appWithTranslation } from 'next-i18next';
import { GoogleAnalytics } from "nextjs-google-analytics";
import Cookies from 'js-cookie';
import axios from "axios";
import {Hotjar} from "@/components/analytics/Hotjar";
import GTM from "@/components/analytics/GTM";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();

    useEffect(() => {
        const lang = Cookies.get('language');

        if (!router.pathname.includes('admin'))
            router.push(router.asPath, router.asPath, { locale: lang });
    }, []);

    return (
        <>
            <GoogleAnalytics gaMeasurementId={"G-SEE6PLQD7W"}/>
            <Hotjar />
            <GTM />
            <Component {...pageProps} />
            <ToastContainer />
        </>
    )
}

export default appWithTranslation(App);
