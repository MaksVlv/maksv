import React, { useState, useEffect } from "react";
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import MainContainer from "../components/MainContainer";
import axios from "axios";
import { IEstate } from "../types";
import SliderSection from '../components/main/slider/Slider';
import SliderAboutUs from '../components/main/sliderOffer/SliderOffer';
import InfoSection from '../components/main/info/InfoSection';
import AddEstateSection from '../components/main/addEstate/AddEsateSection';


interface HomeProps {
    estate: IEstate[]
}

export default function Home({ estate }: HomeProps) {

    const { t } = useTranslation();

    return (
        <MainContainer
            title={t("homePage:seo.title")}
            description={t("homePage:seo.description")}
            keywords={t("homePage:seo.keywords")}
        >
            <SliderSection data={estate}/>
            <SliderAboutUs />
            <InfoSection />
            <AddEstateSection />
        </MainContainer>
    )
}

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
    const { data } = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + 'estate?size=4')

    const estate = data.data

    return {
        props: {
            ...(await serverSideTranslations(locale as string)),
            estate,
        },
    };
}
