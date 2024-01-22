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
import { useRouter } from "next/router";


export default function Estate({ googleApi }: { googleApi: string }) {

    const { t } = useTranslation();
    const router = useRouter();

    const [estates, setEstates] = useState<IEstate[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [updateCount, setUpdateCount] = useState<number>(0);
    const [pagination, setPagination] = useState({
        pages: 0,
        page: 0,
        size: 12,
        count: 0
    });
    const [filter, setFilter] = useState<Filter>(emptyFilter);
    const estatesSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fil = {
            page: router.query.page || 0,
            size: router.query.size || 12,
            search: router.query.search || '',
            rent: router.query.rent === "null" ? null : router.query.rent === "false" ? false : router.query.rent === "true" ? true : null,
            type: router.query.type || "",
            city: router.query.city || "",
            district: router.query.district || "",
            priceFrom: router.query.priceFrom || "",
            priceTill: router.query.priceTill || "",
            roomsFrom: router.query.roomsFrom || "",
            roomsTill: router.query.roomsTill || "",
            floorFrom: router.query.floorFrom || "",
            floorTill: router.query.floorTill || "",
            livingAreaFrom: router.query.livingAreaFrom || "",
            livingAreaTill: router.query.livingAreaTill || "",
            landAreaFrom: router.query.landAreaFrom || "",
            landAreaTill: router.query.landAreaTill || "",
            series: router.query.series || "",
            gateHeightFrom: router.query.gateHeightFrom || "",
            gateHeightTill: router.query.gateHeightTill || "",
            sort:  router.query.sort || 'createdAt:desc',
            assignment:  router.query.assignment || '',
        }
        axios.get(`estate?size=${fil.size}&page=${fil.page}&search=${fil.search}&rent=${fil.rent}&type=${fil.type}&city=${fil.city}&district=${fil.district}&priceFrom=${fil.priceFrom}&priceTill=${fil.priceTill}&floorFrom=${fil.floorFrom}&floorTill=${fil.floorTill}&roomsFrom=${fil.roomsFrom}&roomsTill=${fil.roomsTill}&livingAreaFrom=${fil.livingAreaFrom}&livingAreaTill=${fil.livingAreaTill}&landAreaFrom=${fil.landAreaFrom}&landAreaTill=${fil.landAreaTill}&gateHeightFrom=${fil.gateHeightFrom}&gateHeightTill=${fil.gateHeightTill}&series=${fil.series}&sort=${fil.sort}&assignment=${fil.assignment}`)
            .then(res => {
                setEstates(res.data.data);
                setPagination({pages: res.data.pages, count: res.data.count, size: Number(fil.size) || 12, page: Number(fil.page) || 0});
                setUpdateCount(1);
            }, _err => {
                toast.error("Error occurred with loading estates")
            }).finally(() => setLoading(false))
        //@ts-ignore
        setFilter({...fil});
    }, [router.query])

    useEffect(() => {
        if (updateCount) {
            //@ts-ignore
            const queryParams = new URLSearchParams({
                ...filter,
                ...pagination
            });

            router.push({pathname: router.pathname, query: queryParams.toString()}, {
                pathname: router.pathname,
                query: queryParams.toString()
            }, {scroll: false});
        }
    }, [pagination.page])

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
            <FilterSection googleApi={googleApi} pagination={pagination} filterStart={filter} onFilterSubmit={(filter: Filter) => {setFilter(filter); setPagination({...pagination, page: 0})}}/>
            <Estates estate={estates} loading={loading} ref={estatesSectionRef}/>
            <Pagination count={pagination.count} totalPages={pagination.pages} activePage={pagination.page + 1} onPageChange={(page: number) => pageChange(page)}/>
        </MainContainer>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
            googleApi: process.env.GOOGLE_API
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
    sort: 'createdAt:desc',
    assignment: ''
}
