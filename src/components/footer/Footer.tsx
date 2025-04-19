import React from "react";
import { useTranslation } from 'next-i18next';
import Logo from '@/assets/logo/logoBig.png';
import style from './footer.module.scss'
import Link from "next/link";
import Image from "next/image";


const Header = () => {

    const { t } = useTranslation()


    return (
        <footer className={style.footerContainer}>
            <div className={"wrapper " + style.footer}>
                <Image src={Logo} alt={"logo"} className={style.logo}/>
                <div className={style.links}>
                    <a href={"/estate"} className={style.link}>{t("header:estate")}</a>
                    <Link href={"/evaluation"} className={style.link}>{t("header:evaluation")}</Link>
                    <Link href={"/construction"} className={style.link}>{t("header:construction")}</Link>
                    <Link href={"/contacts"} className={style.link}>{t("header:contacts")}</Link>
                </div>
                <Link href={"https://goo.gl/maps/NDsMu6p2Ne5XRHCU8"} target={"_blank"} className={style.info}>G. Zemgala gatve 68, Rīga,1039 LV, Latvija</Link>
                <Link href={"tel:+37167818686"} className={style.info}>+371 67818686</Link>
                <Link href={"mailto:info@maksv.lv"} className={style.info}>info@maksv.lv</Link>
                <div className={'flex flex-col justify-between lg:flex-row gap-[75px] lg:gap-0 mb-[75px] lg:mb-0'}>
                    <div className={style.info + " " + style.rights}>© {new Date().getFullYear()} Maks V. All rights are
                        reserved
                    </div>
                    <a href="https://www.stepinweb.com/?utm_source=c8&utm_medium=websitefooter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="222" height="18" viewBox="0 0 222 18" fill="none">
                            <g clipPath="url(#clip0_23096_6050)">
                                <path
                                  d="M3.86325 12.7394L1.24023 3.12421H2.57907L4.77857 11.7194L6.88245 3.12421H8.69943L10.8033 11.7194L13.0028 3.12421H14.287L11.664 12.7394H9.86067L7.75679 4.25301L5.65291 12.7394H3.86325ZM18.6505 12.821C17.8854 12.821 17.2524 12.6669 16.7515 12.3586C16.2506 12.0413 15.8772 11.6061 15.6313 11.053C15.3854 10.4999 15.2624 9.86981 15.2624 9.16261C15.2624 8.44634 15.3899 7.81621 15.6449 7.27221C15.9091 6.71914 16.2916 6.28394 16.7925 5.96661C17.2934 5.64928 17.9082 5.49061 18.6368 5.49061C19.2015 5.49061 19.6842 5.59941 20.0849 5.81701C20.4948 6.02554 20.8318 6.30661 21.0959 6.66021C21.36 7.01381 21.5513 7.40368 21.6697 7.82981C21.7881 8.24688 21.8382 8.66848 21.82 9.09461C21.8108 9.17621 21.8017 9.25781 21.7926 9.33941C21.7926 9.42101 21.7881 9.50261 21.779 9.58421H16.4373C16.4737 10.0013 16.5785 10.3775 16.7515 10.713C16.9246 11.0485 17.1705 11.3159 17.4892 11.5154C17.808 11.7058 18.2042 11.801 18.6778 11.801C18.9146 11.801 19.1514 11.7738 19.3882 11.7194C19.6341 11.6559 19.8527 11.5517 20.044 11.4066C20.2443 11.2615 20.3855 11.0666 20.4675 10.8218H21.656C21.5467 11.2842 21.3418 11.665 21.0412 11.9642C20.7407 12.2543 20.3809 12.4719 19.962 12.617C19.543 12.753 19.1059 12.821 18.6505 12.821ZM16.4646 8.57781H20.6314C20.6223 8.16981 20.5312 7.81168 20.3582 7.50341C20.1851 7.19514 19.9483 6.95488 19.6478 6.78261C19.3563 6.61034 19.0057 6.52421 18.5958 6.52421C18.1496 6.52421 17.7716 6.61941 17.4619 6.80981C17.1614 7.00021 16.9291 7.24954 16.7652 7.55781C16.6012 7.86608 16.5011 8.20608 16.4646 8.57781ZM26.9053 12.821C26.5775 12.821 26.2724 12.7847 25.99 12.7122C25.7168 12.6306 25.4663 12.5173 25.2386 12.3722C25.0201 12.2271 24.8288 12.0594 24.6649 11.869L24.6102 12.7394H23.5036V3.12421H24.6649V6.60581C24.9017 6.24314 25.2386 5.96661 25.6758 5.77621C26.1221 5.58581 26.5775 5.49061 27.042 5.49061C27.7706 5.49061 28.3671 5.65381 28.8316 5.98021C29.2961 6.29754 29.6377 6.73274 29.8562 7.28581C30.0839 7.82981 30.1978 8.44634 30.1978 9.13541C30.1978 9.81541 30.0794 10.4365 29.8426 10.9986C29.6058 11.5517 29.246 11.9959 28.7633 12.3314C28.2806 12.6578 27.6613 12.821 26.9053 12.821ZM26.8917 11.801C27.4199 11.801 27.8389 11.6831 28.1485 11.4474C28.4582 11.2026 28.6813 10.8807 28.818 10.4818C28.9637 10.0829 29.0365 9.64314 29.0365 9.16261C29.0365 8.67301 28.9637 8.22874 28.818 7.82981C28.6813 7.43088 28.4537 7.11354 28.1349 6.87781C27.8161 6.64208 27.3926 6.52421 26.8644 6.52421C26.3908 6.52421 25.9855 6.65568 25.6485 6.91861C25.3206 7.18154 25.0701 7.51701 24.8971 7.92501C24.7241 8.33301 24.6375 8.75008 24.6375 9.17621C24.6375 9.63861 24.7104 10.0693 24.8561 10.4682C25.0109 10.8671 25.2523 11.189 25.5802 11.4338C25.9172 11.6786 26.3543 11.801 26.8917 11.801ZM34.5082 12.821C34.1803 12.821 33.8479 12.7893 33.5109 12.7258C33.1831 12.6623 32.8734 12.5535 32.5819 12.3994C32.2996 12.2453 32.0628 12.0367 31.8715 11.7738C31.6803 11.5109 31.5573 11.1845 31.5027 10.7946H32.6776C32.7687 11.0394 32.9144 11.2389 33.1147 11.393C33.3242 11.5381 33.5565 11.6423 33.8115 11.7058C34.0756 11.7693 34.3261 11.801 34.5629 11.801C34.7086 11.801 34.8771 11.7919 35.0683 11.7738C35.2596 11.7557 35.4418 11.7149 35.6148 11.6514C35.797 11.5789 35.9427 11.4746 36.052 11.3386C36.1704 11.2026 36.2296 11.0122 36.2296 10.7674C36.2296 10.5861 36.1886 10.4365 36.1066 10.3186C36.0247 10.2007 35.9108 10.1055 35.7651 10.033C35.6194 9.95141 35.4418 9.89248 35.2323 9.85621C34.8042 9.76554 34.3443 9.67941 33.8525 9.59781C33.3698 9.51621 32.9417 9.36208 32.5683 9.13541C32.4408 9.05381 32.3224 8.96314 32.2131 8.86341C32.1129 8.75461 32.0264 8.63674 31.9535 8.50981C31.8807 8.37381 31.8215 8.22874 31.7759 8.07461C31.7395 7.91141 31.7213 7.73461 31.7213 7.54421C31.7213 7.19061 31.7896 6.88688 31.9262 6.63301C32.0719 6.37008 32.2723 6.15701 32.5273 5.99381C32.7823 5.82154 33.0738 5.69461 33.4016 5.61301C33.7386 5.53141 34.0984 5.49061 34.4809 5.49061C34.9545 5.49061 35.378 5.56768 35.7514 5.72181C36.1339 5.86688 36.4482 6.08448 36.6941 6.37461C36.94 6.65568 37.0857 7.00474 37.1312 7.42181H36.052C35.9882 7.15888 35.8152 6.94581 35.5328 6.78261C35.2505 6.61034 34.8907 6.52421 34.4536 6.52421C34.3079 6.52421 34.1439 6.53781 33.9618 6.56501C33.7796 6.58314 33.6066 6.62848 33.4426 6.70101C33.2787 6.76448 33.1421 6.86421 33.0328 7.00021C32.9235 7.12714 32.8688 7.29941 32.8688 7.51701C32.8688 7.71648 32.9189 7.88421 33.0191 8.02021C33.1284 8.15621 33.2787 8.26501 33.4699 8.34661C33.6612 8.42821 33.8798 8.49621 34.1257 8.55061C34.4445 8.61408 34.7951 8.68208 35.1776 8.75461C35.5602 8.81808 35.8607 8.88608 36.0793 8.95861C36.3707 9.04928 36.6121 9.17621 36.8034 9.33941C37.0037 9.50261 37.1495 9.69754 37.2405 9.92421C37.3407 10.1509 37.3908 10.4138 37.3908 10.713C37.3908 11.1391 37.3043 11.4882 37.1312 11.7602C36.9673 12.0322 36.7442 12.2453 36.4618 12.3994C36.1795 12.5535 35.8653 12.6623 35.5192 12.7258C35.1822 12.7893 34.8452 12.821 34.5082 12.821ZM38.9727 12.7394V5.57221H40.1339V12.7394H38.9727ZM39.5465 4.51141C39.3097 4.51141 39.1184 4.43888 38.9727 4.29381C38.8361 4.14874 38.7678 3.96288 38.7678 3.73621C38.7678 3.50954 38.8406 3.32821 38.9864 3.19221C39.1321 3.04714 39.3188 2.97461 39.5465 2.97461C39.756 2.97461 39.9381 3.04714 40.0929 3.19221C40.2569 3.33728 40.3389 3.51861 40.3389 3.73621C40.3389 3.96288 40.2614 4.14874 40.1066 4.29381C39.9518 4.43888 39.7651 4.51141 39.5465 4.51141ZM44.8028 12.821C44.0468 12.821 43.514 12.617 43.2044 12.209C42.9038 11.801 42.7535 11.2207 42.7535 10.4682V6.59221H41.5786V5.57221H42.7535V3.42341H43.9148V5.57221H46.1279V6.59221H43.9148V10.3186C43.9148 10.5906 43.9375 10.8399 43.9831 11.0666C44.0286 11.2842 44.1242 11.461 44.27 11.597C44.4157 11.7239 44.6343 11.7919 44.9257 11.801C45.1352 11.801 45.3173 11.7647 45.4722 11.6922C45.6361 11.6197 45.7727 11.5335 45.882 11.4338L46.3875 12.277C46.2327 12.4039 46.0687 12.5082 45.8957 12.5898C45.7317 12.6714 45.5587 12.7303 45.3765 12.7666C45.2035 12.8029 45.0122 12.821 44.8028 12.821ZM50.7658 12.821C50.0007 12.821 49.3678 12.6669 48.8668 12.3586C48.3659 12.0413 47.9925 11.6061 47.7466 11.053C47.5007 10.4999 47.3777 9.86981 47.3777 9.16261C47.3777 8.44634 47.5052 7.81621 47.7603 7.27221C48.0244 6.71914 48.4069 6.28394 48.9078 5.96661C49.4087 5.64928 50.0235 5.49061 50.7521 5.49061C51.3168 5.49061 51.7995 5.59941 52.2003 5.81701C52.6101 6.02554 52.9471 6.30661 53.2112 6.66021C53.4753 7.01381 53.6666 7.40368 53.785 7.82981C53.9034 8.24688 53.9535 8.66848 53.9353 9.09461C53.9262 9.17621 53.9171 9.25781 53.9079 9.33941C53.9079 9.42101 53.9034 9.50261 53.8943 9.58421H48.5526C48.5891 10.0013 48.6938 10.3775 48.8668 10.713C49.0399 11.0485 49.2858 11.3159 49.6046 11.5154C49.9233 11.7058 50.3195 11.801 50.7931 11.801C51.0299 11.801 51.2667 11.7738 51.5035 11.7194C51.7494 11.6559 51.968 11.5517 52.1593 11.4066C52.3596 11.2615 52.5008 11.0666 52.5828 10.8218H53.7713C53.662 11.2842 53.4571 11.665 53.1566 11.9642C52.856 12.2543 52.4963 12.4719 52.0773 12.617C51.6583 12.753 51.2212 12.821 50.7658 12.821ZM48.5799 8.57781H52.7467C52.7376 8.16981 52.6465 7.81168 52.4735 7.50341C52.3004 7.19514 52.0636 6.95488 51.7631 6.78261C51.4716 6.61034 51.121 6.52421 50.7111 6.52421C50.2649 6.52421 49.8869 6.61941 49.5772 6.80981C49.2767 7.00021 49.0444 7.24954 48.8805 7.55781C48.7166 7.86608 48.6164 8.20608 48.5799 8.57781ZM59.4378 12.7394V5.57221H60.558L60.6127 6.42901C60.7675 6.21141 60.9406 6.03461 61.1318 5.89861C61.3322 5.76261 61.5508 5.66288 61.7876 5.59941C62.0335 5.52688 62.2931 5.49061 62.5663 5.49061C63.0672 5.49061 63.4725 5.59941 63.7822 5.81701C64.0918 6.02554 64.3241 6.30208 64.4789 6.64661C64.6428 6.40181 64.8296 6.19328 65.039 6.02101C65.2576 5.84874 65.499 5.71728 65.7631 5.62661C66.0363 5.53594 66.3369 5.49061 66.6648 5.49061C67.193 5.49061 67.6165 5.60394 67.9353 5.83061C68.2631 6.05728 68.5 6.36554 68.6457 6.75541C68.7914 7.13621 68.8643 7.56688 68.8643 8.04741V12.7394H67.703V8.63221C67.703 8.39648 67.6894 8.15621 67.662 7.91141C67.6438 7.66661 67.5892 7.43994 67.4981 7.23141C67.407 7.01381 67.2704 6.84154 67.0883 6.71461C66.9152 6.57861 66.6693 6.51061 66.3505 6.51061C66.05 6.51061 65.795 6.58314 65.5855 6.72821C65.3851 6.86421 65.2212 7.05008 65.0937 7.28581C64.9662 7.52154 64.8751 7.77541 64.8204 8.04741C64.7658 8.31034 64.7385 8.57328 64.7385 8.83621V12.7394H63.5772V8.61861C63.5772 8.39194 63.5636 8.15621 63.5363 7.91141C63.518 7.66661 63.468 7.43994 63.386 7.23141C63.3131 7.01381 63.1856 6.84154 63.0035 6.71461C62.8304 6.57861 62.5891 6.51061 62.2794 6.51061C61.8422 6.51061 61.5007 6.63754 61.2548 6.89141C61.0089 7.13621 60.8358 7.43994 60.7356 7.80261C60.6446 8.15621 60.599 8.50528 60.599 8.84981V12.7394H59.4378ZM73.0766 12.821C72.7487 12.821 72.4299 12.7802 72.1203 12.6986C71.8197 12.6079 71.5465 12.4765 71.3006 12.3042C71.0638 12.1229 70.8725 11.9007 70.7268 11.6378C70.5902 11.3658 70.5219 11.053 70.5219 10.6994C70.5219 10.2914 70.5947 9.94688 70.7404 9.66581C70.8953 9.38474 71.1002 9.16261 71.3552 8.99941C71.6102 8.83621 71.9062 8.71834 72.2432 8.64581C72.5802 8.57328 72.9308 8.53701 73.2952 8.53701H75.4127C75.4127 8.12901 75.3535 7.77541 75.2351 7.47621C75.1258 7.17701 74.9436 6.94581 74.6886 6.78261C74.4336 6.61034 74.0966 6.52421 73.6777 6.52421C73.4227 6.52421 73.1859 6.55141 72.9673 6.60581C72.7487 6.66021 72.562 6.74634 72.4072 6.86421C72.2523 6.98208 72.1385 7.14074 72.0656 7.34021H70.8224C70.8862 7.01381 71.0091 6.73728 71.1913 6.51061C71.3825 6.27488 71.6102 6.08448 71.8744 5.93941C72.1476 5.78528 72.439 5.67194 72.7487 5.59941C73.0584 5.52688 73.368 5.49061 73.6777 5.49061C74.716 5.49061 75.4537 5.79434 75.8908 6.40181C76.328 7.00928 76.5466 7.82981 76.5466 8.86341V12.7394H75.5766L75.5083 11.8282C75.308 12.1002 75.0666 12.3087 74.7843 12.4538C74.5019 12.5989 74.2105 12.6941 73.9099 12.7394C73.6185 12.7938 73.3407 12.821 73.0766 12.821ZM73.1859 11.801C73.6412 11.801 74.0329 11.7285 74.3608 11.5834C74.6977 11.4293 74.9573 11.2071 75.1395 10.917C75.3216 10.6269 75.4127 10.2733 75.4127 9.85621V9.50261H74.1422C73.8416 9.50261 73.5456 9.50714 73.2542 9.51621C72.9627 9.52528 72.6986 9.56154 72.4618 9.62501C72.225 9.68848 72.0337 9.79728 71.888 9.95141C71.7514 10.1055 71.6831 10.3277 71.6831 10.6178C71.6831 10.8898 71.7514 11.1119 71.888 11.2842C72.0337 11.4565 72.2204 11.5879 72.4481 11.6786C72.6849 11.7602 72.9308 11.801 73.1859 11.801ZM81.3648 12.821C80.6453 12.821 80.0533 12.6623 79.5888 12.345C79.1243 12.0186 78.7782 11.5834 78.5505 11.0394C78.3228 10.4863 78.209 9.86528 78.209 9.17621C78.209 8.48714 78.3228 7.86608 78.5505 7.31301C78.7782 6.75088 79.1289 6.30661 79.6025 5.98021C80.0761 5.65381 80.6817 5.49061 81.4194 5.49061C81.7018 5.49061 81.9841 5.52688 82.2665 5.59941C82.5579 5.66288 82.8311 5.76714 83.0861 5.91221C83.3412 6.04821 83.5598 6.23408 83.7419 6.46981V3.12421H84.9031V12.7394H83.7965L83.7419 11.665C83.578 11.937 83.3685 12.1591 83.1135 12.3314C82.8676 12.4946 82.5943 12.617 82.2938 12.6986C81.9932 12.7802 81.6836 12.821 81.3648 12.821ZM81.5287 11.801C82.0114 11.801 82.4167 11.6786 82.7446 11.4338C83.0725 11.189 83.3229 10.8626 83.496 10.4546C83.669 10.0466 83.7556 9.60234 83.7556 9.12181C83.7556 8.62314 83.669 8.17888 83.496 7.78901C83.3321 7.39914 83.0861 7.09088 82.7583 6.86421C82.4304 6.63754 82.016 6.52421 81.5151 6.52421C80.9959 6.52421 80.577 6.64208 80.2582 6.87781C79.9485 7.11354 79.7209 7.43541 79.5751 7.84341C79.4385 8.24234 79.3702 8.69114 79.3702 9.18981C79.3702 9.55248 79.4066 9.89248 79.4795 10.2098C79.5615 10.5181 79.6844 10.7946 79.8484 11.0394C80.0214 11.2751 80.2446 11.461 80.5178 11.597C80.791 11.733 81.128 11.801 81.5287 11.801ZM89.9786 12.821C89.2136 12.821 88.5806 12.6669 88.0797 12.3586C87.5787 12.0413 87.2053 11.6061 86.9594 11.053C86.7135 10.4999 86.5906 9.86981 86.5906 9.16261C86.5906 8.44634 86.7181 7.81621 86.9731 7.27221C87.2372 6.71914 87.6197 6.28394 88.1207 5.96661C88.6216 5.64928 89.2363 5.49061 89.965 5.49061C90.5296 5.49061 91.0123 5.59941 91.4131 5.81701C91.8229 6.02554 92.1599 6.30661 92.424 6.66021C92.6882 7.01381 92.8794 7.40368 92.9978 7.82981C93.1162 8.24688 93.1663 8.66848 93.1481 9.09461C93.139 9.17621 93.1299 9.25781 93.1208 9.33941C93.1208 9.42101 93.1162 9.50261 93.1071 9.58421H87.7655C87.8019 10.0013 87.9066 10.3775 88.0797 10.713C88.2527 11.0485 88.4986 11.3159 88.8174 11.5154C89.1362 11.7058 89.5323 11.801 90.0059 11.801C90.2427 11.801 90.4795 11.7738 90.7163 11.7194C90.9623 11.6559 91.1808 11.5517 91.3721 11.4066C91.5725 11.2615 91.7136 11.0666 91.7956 10.8218H92.9842C92.8749 11.2842 92.6699 11.665 92.3694 11.9642C92.0688 12.2543 91.7091 12.4719 91.2901 12.617C90.8712 12.753 90.434 12.821 89.9786 12.821ZM87.7928 8.57781H91.9595C91.9504 8.16981 91.8594 7.81168 91.6863 7.50341C91.5133 7.19514 91.2765 6.95488 90.9759 6.78261C90.6845 6.61034 90.3338 6.52421 89.924 6.52421C89.4777 6.52421 89.0997 6.61941 88.7901 6.80981C88.4895 7.00021 88.2573 7.24954 88.0933 7.55781C87.9294 7.86608 87.8292 8.20608 87.7928 8.57781ZM102.052 12.821C101.724 12.821 101.419 12.7847 101.137 12.7122C100.864 12.6306 100.613 12.5173 100.386 12.3722C100.167 12.2271 99.9758 12.0594 99.8119 11.869L99.7572 12.7394H98.6506V3.12421H99.8119V6.60581C100.049 6.24314 100.386 5.96661 100.823 5.77621C101.269 5.58581 101.724 5.49061 102.189 5.49061C102.918 5.49061 103.514 5.65381 103.979 5.98021C104.443 6.29754 104.785 6.73274 105.003 7.28581C105.231 7.82981 105.345 8.44634 105.345 9.13541C105.345 9.81541 105.226 10.4365 104.99 10.9986C104.753 11.5517 104.393 11.9959 103.91 12.3314C103.428 12.6578 102.808 12.821 102.052 12.821ZM102.039 11.801C102.567 11.801 102.986 11.6831 103.296 11.4474C103.605 11.2026 103.828 10.8807 103.965 10.4818C104.111 10.0829 104.184 9.64314 104.184 9.16261C104.184 8.67301 104.111 8.22874 103.965 7.82981C103.828 7.43088 103.601 7.11354 103.282 6.87781C102.963 6.64208 102.54 6.52421 102.011 6.52421C101.538 6.52421 101.132 6.65568 100.795 6.91861C100.468 7.18154 100.217 7.51701 100.044 7.92501C99.8711 8.33301 99.7845 8.75008 99.7845 9.17621C99.7845 9.63861 99.8574 10.0693 100.003 10.4682C100.158 10.8671 100.399 11.189 100.727 11.4338C101.064 11.6786 101.501 11.801 102.039 11.801ZM110.202 15.949C109.646 15.949 109.109 15.8719 108.59 15.7178C108.08 15.5637 107.62 15.2962 107.21 14.9154L107.715 14.0042C108.07 14.2853 108.448 14.5074 108.849 14.6706C109.259 14.8338 109.687 14.9154 110.133 14.9154C110.88 14.9154 111.413 14.6978 111.732 14.2626C112.06 13.8365 112.224 13.2925 112.224 12.6306V11.7738C112.06 12.0186 111.85 12.2226 111.595 12.3858C111.349 12.5399 111.076 12.6578 110.775 12.7394C110.475 12.8119 110.165 12.8482 109.846 12.8482C109.136 12.8482 108.576 12.7077 108.166 12.4266C107.756 12.1455 107.465 11.7557 107.292 11.257C107.119 10.7583 107.032 10.1826 107.032 9.52981V5.57221H108.193V9.20341C108.193 9.52981 108.212 9.85168 108.248 10.169C108.294 10.4773 108.38 10.7583 108.508 11.0122C108.635 11.257 108.822 11.4565 109.068 11.6106C109.314 11.7557 109.642 11.8282 110.051 11.8282C110.571 11.8282 110.985 11.7013 111.295 11.4474C111.613 11.1935 111.841 10.8535 111.978 10.4274C112.123 10.0013 112.196 9.52981 112.196 9.01301V5.57221H113.357V12.7394C113.357 13.2562 113.289 13.7141 113.153 14.113C113.016 14.5119 112.811 14.8474 112.538 15.1194C112.265 15.3914 111.932 15.5954 111.541 15.7314C111.158 15.8765 110.712 15.949 110.202 15.949Z"
                                  fill="#121212"/>
                                <path
                                  d="M131.067 0.279297H124.772L131.065 6.45812H119.135V11.0058L131.065 11.0043L124.77 17.2683H131.065L136.091 12.2409L136.947 17.2683H141.403L142.58 11.0057L143.796 17.2683H148.251L151.126 0.283065H146.761L145.704 7.23505L144.44 0.283065H140.721L139.486 7.23559L138.456 0.283065H134.067L134.675 3.87185L131.067 0.279297Z"
                                  fill="#1A73E9"/>
                                <path
                                  d="M159.603 11.5022C159.603 11.2835 159.569 11.0892 159.5 10.9191C159.438 10.749 159.323 10.5935 159.158 10.4525C158.992 10.3116 158.758 10.1755 158.457 10.0443C158.159 9.90826 157.779 9.76976 157.317 9.62884C156.81 9.47332 156.342 9.30081 155.914 9.11129C155.491 8.9169 155.121 8.69336 154.804 8.44066C154.488 8.1831 154.242 7.88909 154.067 7.55864C153.891 7.22333 153.804 6.83699 153.804 6.39962C153.804 5.96712 153.894 5.57349 154.073 5.21873C154.259 4.86398 154.52 4.55783 154.856 4.30027C155.196 4.03785 155.598 3.83618 156.06 3.69525C156.523 3.54946 157.035 3.47656 157.595 3.47656C158.384 3.47656 159.062 3.62235 159.633 3.91393C160.207 4.20551 160.648 4.5967 160.954 5.08753C161.266 5.57835 161.422 6.1202 161.422 6.71307H159.603C159.603 6.36317 159.528 6.05459 159.376 5.7873C159.231 5.51517 159.006 5.30135 158.705 5.14584C158.408 4.99033 158.031 4.91257 157.573 4.91257C157.139 4.91257 156.778 4.97818 156.492 5.10939C156.205 5.24061 155.989 5.41797 155.848 5.64152C155.707 5.86506 155.637 6.11776 155.637 6.39962C155.637 6.59886 155.683 6.7811 155.775 6.94633C155.868 7.1067 156.009 7.25734 156.199 7.39827C156.389 7.53434 156.628 7.66312 156.915 7.78461C157.202 7.90611 157.541 8.02274 157.931 8.13451C158.519 8.30945 159.034 8.50384 159.472 8.71766C159.91 8.92661 160.275 9.16474 160.567 9.43202C160.86 9.6993 161.078 10.003 161.225 10.3432C161.371 10.6785 161.444 11.06 161.444 11.4876C161.444 11.9348 161.354 12.338 161.174 12.6977C160.993 13.0525 160.736 13.3562 160.4 13.6088C160.069 13.8567 159.669 14.0487 159.201 14.1847C158.739 14.3159 158.223 14.3815 157.653 14.3815C157.142 14.3815 156.637 14.3135 156.141 14.1774C155.649 14.0414 155.201 13.8348 154.796 13.5578C154.392 13.276 154.071 12.9261 153.832 12.5081C153.594 12.0854 153.475 11.5921 153.475 11.0284H155.309C155.309 11.3734 155.367 11.6674 155.484 11.9104C155.605 12.1534 155.773 12.3526 155.987 12.5081C156.201 12.6588 156.451 12.7706 156.733 12.8435C157.02 12.9164 157.327 12.9528 157.653 12.9528C158.082 12.9528 158.439 12.8921 158.726 12.7706C159.019 12.6491 159.237 12.479 159.384 12.2603C159.53 12.0416 159.603 11.7889 159.603 11.5022Z"
                                  fill="#121212"/>
                                <path
                                  d="M166.063 6.34771V7.63065H161.607V6.34771H166.063ZM162.893 4.41602H164.653V12.0553C164.653 12.2983 164.687 12.4854 164.755 12.6166C164.828 12.743 164.928 12.828 165.055 12.8717C165.181 12.9155 165.33 12.9373 165.501 12.9373C165.623 12.9373 165.739 12.9301 165.852 12.9155C165.963 12.9009 166.053 12.8863 166.121 12.8717L166.128 14.213C165.983 14.2568 165.812 14.2956 165.617 14.3296C165.427 14.3636 165.208 14.3806 164.96 14.3806C164.556 14.3806 164.197 14.3102 163.887 14.1693C163.575 14.0234 163.331 13.7878 163.156 13.4622C162.98 13.1366 162.893 12.7041 162.893 12.1646V4.41602Z"
                                  fill="#121212"/>
                                <path
                                  d="M170.458 14.3818C169.874 14.3818 169.346 14.2871 168.873 14.0976C168.405 13.9031 168.007 13.6335 167.676 13.2884C167.349 12.9434 167.098 12.5376 166.923 12.0711C166.748 11.6046 166.66 11.1016 166.66 10.5622V10.2706C166.66 9.65346 166.75 9.0946 166.93 8.59405C167.111 8.09351 167.361 7.66587 167.682 7.31112C168.005 6.95151 168.384 6.67694 168.822 6.48741C169.26 6.29788 169.735 6.20312 170.246 6.20312C170.811 6.20312 171.306 6.29788 171.73 6.48741C172.153 6.67694 172.504 6.94421 172.782 7.28924C173.064 7.62943 173.273 8.0352 173.409 8.50658C173.551 8.97797 173.622 9.49794 173.622 10.0665V10.8173H167.515V9.55626H171.883V9.41776C171.873 9.10189 171.809 8.80545 171.693 8.52845C171.581 8.25146 171.408 8.02791 171.174 7.85783C170.941 7.68774 170.629 7.60269 170.239 7.60269C169.947 7.60269 169.686 7.66587 169.457 7.79222C169.234 7.91371 169.046 8.09109 168.895 8.32435C168.745 8.55761 168.627 8.83946 168.544 9.16992C168.467 9.49552 168.428 9.86241 168.428 10.2706V10.5622C168.428 10.9072 168.474 11.228 168.567 11.5244C168.664 11.816 168.805 12.0711 168.991 12.2898C169.175 12.5084 169.399 12.6809 169.662 12.8073C169.925 12.9288 170.225 12.9895 170.561 12.9895C170.984 12.9895 171.362 12.9045 171.693 12.7344C172.025 12.5643 172.311 12.3238 172.555 12.0128L173.483 12.9094C173.312 13.1573 173.09 13.3954 172.818 13.6238C172.545 13.8473 172.211 14.0295 171.817 14.1705C171.428 14.3114 170.975 14.3818 170.458 14.3818Z"
                                  fill="#121212"/>
                                <path
                                  d="M176.313 7.86511V17.2684H174.553V6.34892H176.174L176.313 7.86511ZM181.463 10.2196V10.3727C181.463 10.9461 181.395 11.4782 181.258 11.9691C181.127 12.4551 180.929 12.8802 180.666 13.2447C180.409 13.6043 180.089 13.8837 179.71 14.083C179.33 14.2822 178.891 14.3818 178.395 14.3818C177.903 14.3818 177.472 14.292 177.102 14.1121C176.736 13.9275 176.428 13.6675 176.174 13.3322C175.921 12.9969 175.716 12.6032 175.56 12.1513C175.41 11.6945 175.303 11.194 175.239 10.6497V10.0592C175.303 9.48094 175.41 8.95609 175.56 8.48472C175.716 8.01333 175.921 7.60755 176.174 7.26738C176.428 6.92721 176.736 6.66479 177.102 6.48012C177.467 6.29546 177.893 6.20312 178.38 6.20312C178.877 6.20312 179.317 6.30032 179.702 6.4947C180.087 6.68422 180.411 6.95636 180.674 7.31112C180.937 7.66101 181.134 8.08379 181.265 8.57948C181.397 9.0703 181.463 9.61701 181.463 10.2196ZM179.702 10.3727V10.2196C179.702 9.85512 179.668 9.51738 179.601 9.20637C179.532 8.8905 179.425 8.6135 179.278 8.37537C179.133 8.13725 178.945 7.95258 178.716 7.82138C178.492 7.68531 178.222 7.61728 177.906 7.61728C177.594 7.61728 177.326 7.67072 177.102 7.77764C176.877 7.87969 176.691 8.02305 176.539 8.20772C176.389 8.39239 176.272 8.60864 176.189 8.85647C176.107 9.09946 176.048 9.36431 176.013 9.65102V11.0652C176.073 11.4151 176.172 11.7357 176.313 12.0273C176.454 12.319 176.654 12.5522 176.912 12.7272C177.175 12.8973 177.512 12.9823 177.92 12.9823C178.237 12.9823 178.507 12.9143 178.731 12.7782C178.955 12.6421 179.137 12.4551 179.278 12.217C179.425 11.974 179.532 11.6945 179.601 11.3786C179.668 11.0627 179.702 10.7274 179.702 10.3727Z"
                                  fill="#121212"/>
                                <path d="M184.643 3.62305V14.2365H182.811V3.62305H184.643Z" fill="#121212"/>
                                <path
                                  d="M188.045 8.03277V14.2361H186.285V6.34892H187.944L188.045 8.03277ZM187.731 10.0009L187.162 9.99363C187.166 9.43477 187.245 8.92208 187.395 8.45556C187.551 7.98903 187.765 7.58811 188.038 7.25281C188.316 6.91749 188.647 6.65993 189.032 6.48012C189.416 6.29546 189.845 6.20312 190.318 6.20312C190.697 6.20312 191.041 6.25658 191.347 6.36349C191.659 6.46555 191.924 6.6332 192.144 6.86646C192.368 7.09973 192.538 7.40345 192.655 7.77764C192.772 8.14697 192.83 8.60135 192.83 9.14076V14.2361H191.062V9.13347C191.062 8.75442 191.006 8.45556 190.895 8.23687C190.788 8.01333 190.63 7.85539 190.42 7.76306C190.215 7.66587 189.959 7.61728 189.653 7.61728C189.351 7.61728 189.08 7.68045 188.842 7.80679C188.603 7.93315 188.402 8.10566 188.235 8.32435C188.075 8.54303 187.951 8.79573 187.863 9.08245C187.775 9.36916 187.731 9.67532 187.731 10.0009Z"
                                  fill="#121212"/>
                                <path
                                  d="M197.019 11.8528L199.138 3.62305H200.248L200.124 5.74426L197.859 14.2365H196.705L197.019 11.8528ZM195.434 3.62305L197.15 11.7872L197.304 14.2365H196.077L193.615 3.62305H195.434ZM202.651 11.7654L204.345 3.62305H206.171L203.71 14.2365H202.483L202.651 11.7654ZM200.678 3.62305L202.775 11.8747L203.082 14.2365H201.928L199.7 5.74426L199.583 3.62305H200.678Z"
                                  fill="#121212"/>
                                <path
                                  d="M210.156 14.3818C209.572 14.3818 209.043 14.2871 208.572 14.0976C208.104 13.9031 207.704 13.6335 207.373 13.2884C207.047 12.9434 206.796 12.5376 206.62 12.0711C206.445 11.6046 206.357 11.1016 206.357 10.5622V10.2706C206.357 9.65346 206.449 9.0946 206.628 8.59405C206.808 8.09351 207.059 7.66587 207.381 7.31112C207.702 6.95151 208.082 6.67694 208.521 6.48741C208.959 6.29788 209.434 6.20312 209.945 6.20312C210.509 6.20312 211.003 6.29788 211.427 6.48741C211.851 6.67694 212.201 6.94421 212.479 7.28924C212.761 7.62943 212.971 8.0352 213.107 8.50658C213.249 8.97797 213.319 9.49794 213.319 10.0665V10.8173H207.212V9.55626H211.581V9.41776C211.57 9.10189 211.508 8.80545 211.391 8.52845C211.279 8.25146 211.106 8.02791 210.873 7.85783C210.638 7.68774 210.327 7.60269 209.937 7.60269C209.645 7.60269 209.385 7.66587 209.156 7.79222C208.931 7.91371 208.744 8.09109 208.593 8.32435C208.442 8.55761 208.325 8.83946 208.243 9.16992C208.164 9.49552 208.125 9.86241 208.125 10.2706V10.5622C208.125 10.9072 208.172 11.228 208.264 11.5244C208.362 11.816 208.503 12.0711 208.688 12.2898C208.873 12.5084 209.097 12.6809 209.36 12.8073C209.623 12.9288 209.922 12.9895 210.259 12.9895C210.682 12.9895 211.059 12.9045 211.391 12.7344C211.722 12.5643 212.009 12.3238 212.252 12.0128L213.18 12.9094C213.009 13.1573 212.789 13.3954 212.515 13.6238C212.243 13.8473 211.91 14.0295 211.515 14.1705C211.125 14.3114 210.672 14.3818 210.156 14.3818Z"
                                  fill="#121212"/>
                                <path
                                  d="M214.25 3.03906H216.011V12.5517L215.843 14.2356H214.25V3.03906ZM221.168 10.2191V10.3722C221.168 10.9554 221.102 11.4924 220.97 11.9831C220.844 12.4691 220.649 12.892 220.386 13.2516C220.128 13.6112 219.807 13.8905 219.422 14.0898C219.042 14.2842 218.601 14.3814 218.1 14.3814C217.608 14.3814 217.179 14.289 216.815 14.1044C216.45 13.9198 216.142 13.6573 215.894 13.3172C215.65 12.977 215.453 12.5712 215.302 12.0998C215.152 11.6284 215.045 11.1085 214.981 10.5399V10.0515C215.045 9.47805 215.152 8.95808 215.302 8.49155C215.453 8.02016 215.65 7.61439 215.894 7.27422C216.142 6.92918 216.447 6.66434 216.807 6.47967C217.172 6.295 217.598 6.20267 218.085 6.20267C218.592 6.20267 219.037 6.29987 219.422 6.49424C219.811 6.68863 220.136 6.96563 220.393 7.32524C220.652 7.67999 220.844 8.10278 220.97 8.5936C221.102 9.08442 221.168 9.62627 221.168 10.2191ZM219.407 10.3722V10.2191C219.407 9.86439 219.379 9.53151 219.32 9.22049C219.262 8.90462 219.164 8.62762 219.028 8.3895C218.896 8.15138 218.716 7.96428 218.487 7.82821C218.263 7.68728 217.983 7.61682 217.647 7.61682C217.335 7.61682 217.068 7.67027 216.843 7.77719C216.619 7.8841 216.432 8.02989 216.281 8.21455C216.131 8.39922 216.011 8.61304 215.924 8.85602C215.84 9.09901 215.785 9.36142 215.755 9.64328V10.9627C215.799 11.3271 215.892 11.6624 216.033 11.9686C216.179 12.2699 216.383 12.5129 216.646 12.6976C216.909 12.8773 217.248 12.9672 217.662 12.9672C217.988 12.9672 218.263 12.9016 218.487 12.7705C218.712 12.6392 218.889 12.457 219.02 12.2238C219.157 11.9856 219.255 11.7087 219.313 11.3927C219.375 11.0769 219.407 10.7367 219.407 10.3722Z"
                                  fill="#121212"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_23096_6050">
                                    <rect width="222" height="17" fill="white" transform="translate(0 0.273438)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </div>
                <div className={style.hr}/>
            </div>
        </footer>
    )
}

export default Header;
