import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import MainContainer from "../components/MainContainer";


export default function Policies() {

    const { t, i18n } = useTranslation('policy')

    return (
      <MainContainer
        title={t("policy.title")}
        description={t("policy.title")}
        headerBackgroundDefault={true}
      >
          <div className={"minusHeader"}>
              <div className={'wrapper pt-10 text-[#133348]'}>
                  <h2 className={'!text-3xl font-semibold mb-4'}>{t('policy.title')}</h2>

                  <h3 className={'!text-xl font-semibold mt-2'}>{t('policy._1')}</h3>
                  <div>{t('policy._1_title')}</div>

                  <h3 className={'!text-xl font-semibold mt-2'}>{t('policy._2')}</h3>
                  <ul className={'list-disc pl-6'}>
                      <li>{t('policy._2_1')}</li>
                      <li>{t('policy._2_2')}</li>
                  </ul>

                  <h3 className={'!text-xl font-semibold mt-2'}>{t('policy._3')}</h3>
                  <ul className={'list-disc pl-6'}>
                      <li>{t('policy._3_1')}</li>
                      <li>{t('policy._3_2')}</li>
                  </ul>

                  <h3 className={'!text-xl font-semibold mt-2'}>{t('policy._4')}</h3>
                  <ul className={'list-disc pl-6'}>
                      <li>{t('policy._4_1')}</li>
                      <li>{t('policy._4_2')}</li>
                      <li>{t('policy._4_3')}</li>
                      <li>{t('policy._4_4')}</li>
                  </ul>

                  <h3 className={'!text-xl font-semibold mt-2'}>{t('policy._5')}</h3>
                  <div>{t('policy._5_title')}</div>

                  <h3 className={'!text-xl font-semibold mt-2'}>{t('policy._6')}</h3>
                  <div>{t('policy._6_title')}</div>
                  <ul className={'list-disc pl-6'}>
                      <li>{t('policy._6_1')}</li>
                      <li>{t('policy._6_2')}</li>
                      <li>{t('policy._6_3')}</li>
                  </ul>
                  <div>{t('policy._6_last')}</div>

                  <h3 className={'!text-xl font-semibold mt-2'}>{t('policy._7')}</h3>
                  <div>{t('policy._7_title')}</div>
                  <ul className={'list-disc pl-6'}>
                      <li>{t('policy._7_1')}</li>
                      <li>{t('policy._7_2')}</li>
                      <li>{t('policy._7_3')}</li>
                  </ul>
                  <div>{t('policy._7_last')}</div>

                  <h3 className={'!text-xl font-semibold mt-2'}>{t('policy._8')}</h3>
                  <div>{t('policy._8_title')}</div>

                  <h2 className={'!text-3xl font-semibold mt-4 mb-3'}>{t('policy.cookieTitle')}</h2>

                  <h3 className={'!text-xl font-semibold mt-2'}>{t('policy.cookies._1')}</h3>
                  <div>{t('policy.cookies._1_title')}</div>

                  <h3 className={'!text-xl font-semibold mt-2'}>{t('policy.cookies._2')}</h3>
                  <ul className={'list-disc pl-6'}>
                      <li>{t('policy.cookies._2_1')}</li>
                      <li>{t('policy.cookies._2_2')}</li>
                  </ul>

                  <h3 className={'!text-xl font-semibold mt-2'}>{t('policy.cookies._3')}</h3>
                  <div>{t('policy.cookies._3_title')}</div>

                  <h3 className={'!text-xl font-semibold mt-2'}>{t('policy.cookies._4')}</h3>
                  <div>{t('policy.cookies._4_title')}</div>

                  <h3 className={'!text-xl font-semibold mt-2'}>{t('policy.cookies._5')}</h3>
                  <div>{t('policy.cookies._5_title')}</div>

                  <br/><br/><br/>

                  <div>{t('policy.info')} info@maksv.lv</div>
                  <br/>
                  <div>{t('policy.lastUpdate')} 06.05.2025</div>
              </div>
          </div>
      </MainContainer>
    )
}

export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
}
