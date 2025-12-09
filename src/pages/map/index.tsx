import { EstatesMap } from '@/components/estate/filter/EstatesMap';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Estate({ googleApi }: { googleApi: string }) {
  return <EstatesMap googleApi={googleApi} isFullScreen={true} />;
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      googleApi: process.env.GOOGLE_API,
    },
  };
}
