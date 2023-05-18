import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import MainContainer from "../components/MainContainer";
import HeaderSection from "../components/contacts/headerSection/HeaderSection";
import ContactsSection from "../components/contacts/contacts/Contacts";
import Form from "../components/contacts/form/Form";
import HeaderImage from '../assets/contacts/headerSection.png';


interface ContactsProps {
    emailJSPublic: string
}

export default function Contacts({ emailJSPublic }: ContactsProps) {

    const { t } = useTranslation();

    return (
        <MainContainer
            title={t("contactsPage:seo.title")}
            description={t("contactsPage:seo.description")}
            keywords={t("contactsPage:seo.keywords")}
            headerBackgroundDefault={true}
        >
            <div className={"minusHeader"}>
                <HeaderSection
                    title={t("contactsPage:header.title")}
                    p={t("contactsPage:header.p")}
                    image={HeaderImage}
                />
                <ContactsSection />
                <Form emailJSPublic={emailJSPublic} />
            </div>
        </MainContainer>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
            emailJSPublic: process.env.EMAIL_JS_PUBLIC || ""
        },
    };
}
