import React, { useState, useEffect, useRef } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import MainContainer from "../components/MainContainer";
import HeaderSection from "../components/estate/headerSection/HeaderSection";
import FilterSection from "../components/estate/filter/Filter";
import { Filter } from "../components/estate/filter/Filter";
import Estates from "../components/estate/estates/Estates";
import Pagination from "../components/estate/pagination/Pagination";
import { IEstate } from '../types';
import axios from "axios";
import { toast } from "react-toastify";


export default function Estate() {

    const { t } = useTranslation();

    const [estates, setEstates] = useState<IEstate[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [pagination, setPagination] = useState({
        pages: 0,
        page: 0,
        size: 6
    });
    const [filter, setFilter] = useState<Filter>(emptyFilter);
    const estatesSectionRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        setLoading(true);
        axios.get(`estate?size=${pagination.size}&page=${pagination.page}&search=${filter.search}&rent=${filter.rent}&type=${filter.type}&city=${filter.city}&district=${filter.district}&priceFrom=${filter.priceFrom}&priceTill=${filter.priceTill}&floorFrom=${filter.floorFrom}&floorTill=${filter.floorTill}&roomsFrom=${filter.roomsFrom}&roomsTill=${filter.roomsTill}&livingAreaFrom=${filter.livingAreaFrom}&livingAreaTill=${filter.livingAreaTill}&landAreaFrom=${filter.landAreaFrom}&landAreaTill=${filter.landAreaTill}&gateHeightFrom=${filter.gateHeightFrom}&gateHeightTill=${filter.gateHeightTill}&series=${filter.series}&sort=${filter.sort}`)
            .then(res => {
            setEstates(res.data.data);
            setPagination({...pagination, pages: res.data.pages});
        }, _err => {
            toast.error("Error occurred with loading estates")
        }).finally(() => setLoading(false))
    }, [pagination.page, filter])

    const pageChange = (page: number) => {
        setPagination({ ...pagination, page: page - 1 });
        if (estatesSectionRef.current) {
            const offset = 200;
            const elementPosition = estatesSectionRef.current.offsetTop - offset;

            window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
            });
        }
    }


    return (
        <MainContainer
            title={t("estatePage:seo.title")}
            description={t("estatePage:seo.description")}
            keywords={t("estatePage:seo.keywords")}
        >
            <HeaderSection />
            <FilterSection onFilterSubmit={(filter: Filter) => {setFilter(filter); setPagination({...pagination, page: 0})}}/>
            <Estates estate={estates} loading={loading} ref={estatesSectionRef}/>
            <Pagination totalPages={pagination.pages} activePage={pagination.page + 1} onPageChange={(page: number) => pageChange(page)}/>
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

const emptyFilter = {
    search: '',
    rent: null,
    type: '',
    city: '',
    district: '',
    priceFrom: '',
    priceTill: '',
    roomsFrom: '',
    roomsTill: '',
    floorFrom: '',
    floorTill: '',
    livingAreaFrom: '',
    livingAreaTill: '',
    landAreaFrom: '',
    landAreaTill: '',
    series: '',
    gateHeightFrom: '',
    gateHeightTill: '',
    sort: 'createdAt:desc'
}
