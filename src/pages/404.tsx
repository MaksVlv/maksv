import Link from "next/link";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";

export default function NotFound() {

  const router = useRouter();
  const { t } = useTranslation('system');

  return <div className={'wrapper min-h-screen flex flex-col justify-center relative overflow-hidden'}>
    <div className={'flex flex-col max-w-[515px]'}>
      <div className={'relative z-20 mb-8 flex justify-center md:justify-start mt-3'}>
        <img src={'/logo_black.svg'} className={'w-[255px] md:w-[355px]'} alt={'logo'}/>
      </div>

      <img src={'/bg_404.png'} alt={'img'}
           className={'md:absolute z-10 w-full md:w-2/3 right-0 top-1/2 md:-translate-y-1/2 mb-4 md:mb-0'}/>

      <div className={'flex flex-col relative z-20'}>
        <h1 className={'text-[#133348] text-2xl md:text-4xl font-semibold mb-3 md:mb-4'}>{t('notFound.title')}</h1>

        <p className={'text-[#133348] mb-8'}>{t('notFound.text')}</p>

        <div className={'flex flex-col items-center md:w-fit mb-4'}>
          <Link href={`https://www.maksv.lv/${router.locale === "lv" ? '' : router.locale + '/'}`}
                className={'w-full lg:w-fit py-3 px-24 bg-[#FFD700] text-white whitespace-nowrap hover:bg-white hover:text-[#FFD700] border border-[#FFD700] mb-3 text-center'}>{t('notFound.button')}</Link>
        </div>
      </div>
    </div>
  </div>
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}