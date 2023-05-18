import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import axios from "axios";

interface Id {
    _id: string
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/estate/ids`);
    const ids = data as Id[]

    const fieldsLv = ids.map((id: Id) => ({
        loc: `https://maksv.lv/estate/${id._id}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.7
    }))
    const fieldsEn = ids.map((id: Id) => ({
        loc: `https://maksv.lv/en/estate/${id._id}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.7
    }))
    const fieldsRu = ids.map((id: Id) => ({
        loc: `https://maksv.lv/ru/estate/${id._id}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.7
    }))

    return getServerSideSitemapLegacy(ctx, fieldsLv.concat(fieldsEn).concat(fieldsRu) as ISitemapField[])
}


export default function Sitemap() {}
