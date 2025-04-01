import React, {useEffect} from "react";
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { IEstate } from '../../types';
import MainContainer from "../../components/MainContainer";
import HeaderSection from "../../components/estate/info/headerSection/HeaderSection";
import ObjectSection from "../../components/estate/info/objectSection/ObjectSection";
import Description from "../../components/estate/info/description/Description";
import SimilarObjects from "../../components/estate/info/similarObjects/SimilarObjects";
import axios from "axios";

interface EstatePageProps {
    estate: IEstate,
    googleApi: string
}

export default function EstatePage({ estate, googleApi }: EstatePageProps) {

    const { i18n } = useTranslation();

    return (
        <MainContainer
            title={`${estate.name[i18n.language]} | MaksV`}
            description={estate.description[i18n.language]}
            ogImage={estate.mainImage}
            headerBackgroundDefault={true}
        >
            <div className={"minusHeader"}>
                <HeaderSection estate={estate} />
                <ObjectSection estate={estate} />
                <Description estate={estate} googleApi={googleApi} />
                <SimilarObjects estate={estate} />
            </div>
        </MainContainer>
    );
}


export async function getServerSideProps({ locale, params }: GetServerSidePropsContext) {
    try {
        const { id }: any = params;

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/estate/info?id=${id}`);
        const estate = data;

        return {
            props: {
                ...(await serverSideTranslations(locale as string)),
                estate,
                googleApi: process.env.GOOGLE_API
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}
