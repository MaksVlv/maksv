import React, {useEffect, useState} from "react";
import styles from './slider.module.scss';
import ImageGallery from "react-image-gallery";

interface SliderSectionProps {
    images: string[]
}

interface IImg {
    original: string,
    thumbnail: string,
}


export default function SliderSection({ images }: SliderSectionProps) {

    const [img, setImg] = useState<IImg[]>(images.map((img: string) => ({ original: img, thumbnail: img })));
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1100);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            const header = document.getElementById("headerBlock");

            if (header) {
                header.style.display = 'block';
            }
        };
    }, []);

    const handleScreenChange = (isFullscreen: boolean) => {
        setIsFullScreen(isFullscreen);

        const header = document.getElementById("headerBlock");

        if (header) {
            header.style.display = isFullscreen ? 'none' : 'block';
        }
    };

    return (
        <div className={styles.sliderSection}>
            <ImageGallery
                items={img}
                swipeThreshold={50}
                showPlayButton={false}
                showThumbnails={!isFullScreen || !isMobile}
                onScreenChange={handleScreenChange}
                renderLeftNav={(onClick) => <CustomLeftNav onClick={onClick} />}
                renderRightNav={(onClick) => <CustomRightNav onClick={onClick} />}
            />
        </div>
    )

}

const CustomLeftNav = ({ onClick }: any) => (
    <button className={styles.left} onClick={onClick}>
        <svg width="46" height="32" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_4659_8720)">
                <path fillRule="evenodd" clipRule="evenodd" d="M14 9.22656L4 15.0001L14 20.7736V16.0001H30V14.0001H14V9.22656Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M30.5 25C25.3327 25 21 20.6039 21 15C21 9.39608 25.3327 5 30.5 5C35.6673 5 40 9.39608 40 15C40 20.6039 35.6673 25 30.5 25ZM30.5 27C24.1487 27 19 21.6274 19 15C19 8.37258 24.1487 3 30.5 3C36.8513 3 42 8.37258 42 15C42 21.6274 36.8513 27 30.5 27Z" fill="white"/>
            </g>
            <defs>
                <filter id="filter0_d_4659_8720" x="0" y="0" width="46" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4659_8720"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4659_8720" result="shape"/>
                </filter>
            </defs>
        </svg>

    </button>
);

const CustomRightNav = ({ onClick }: any) => (
    <button className={styles.right} onClick={onClick}>
        <svg width="46" height="32" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_4659_8720)">
                <path fillRule="evenodd" clipRule="evenodd" d="M32 9.22656L42 15.0001L32 20.7736V16.0001H16V14.0001H32V9.22656Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.5 25C20.6673 25 25 20.6039 25 15C25 9.39608 20.6673 5 15.5 5C10.3327 5 6 9.39608 6 15C6 20.6039 10.3327 25 15.5 25ZM15.5 27C21.8513 27 27 21.6274 27 15C27 8.37258 21.8513 3 15.5 3C9.14873 3 4 8.37258 4 15C4 21.6274 9.14873 27 15.5 27Z" fill="white"/>
            </g>
            <defs>
                <filter id="filter0_d_4659_8720" x="0" y="0" width="46" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4659_8720"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4659_8720" result="shape"/>
                </filter>
            </defs>
        </svg>
    </button>
);
