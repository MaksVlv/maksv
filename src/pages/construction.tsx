import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import MainContainer from "../components/MainContainer";
import HeaderSection from "../components/construction/header/HeaderSection";
import SliderConstruction from "../components/construction/slider/SliderConstruction";
import Services from "../components/construction/services/Services";
import Prices from "../components/construction/prices/Prices";
import Partners from "../components/construction/partners/Partners";
import Achievements from "../components/evaluation/achievements/Achievements";


export default function Evaluation() {

    const { t } = useTranslation();

    return (
        <MainContainer
            title={t("constructionPage:seo.title")}
            description={t("constructionPage:seo.description")}
            keywords={t("constructionPage:seo.keywords")}
            headerBackgroundDefault={true}
        >
            <div className={"minusHeader"}>
                <HeaderSection />
                <SliderConstruction />
                <Services />
                <Achievements />
                <Prices />
                <Partners />

            </div>

        </MainContainer>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
}
