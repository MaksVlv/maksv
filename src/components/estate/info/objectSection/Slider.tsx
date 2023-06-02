import React, { useState } from "react";
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

    return (
        <div className={styles.sliderSection}>
            <ImageGallery
                items={img}
                swipeThreshold={50}
                showPlayButton={false}
                renderLeftNav={(onClick) => <CustomLeftNav onClick={onClick} />}
                renderRightNav={(onClick) => <CustomRightNav onClick={onClick} />}
            />
        </div>
    )

}

const CustomLeftNav = ({ onClick }: any) => (
    <button className={styles.left} onClick={onClick}>
        <svg className={"arrow"} width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12L10 17.7735L10 6.2265L0 12ZM26 11L9 11L9 13L26 13L26 11Z" fill="white"/>
            <path d="M16 12C16 5.88433 20.7407 1 26.5 1C32.2593 1 37 5.88433 37 12C37 18.1157 32.2593 23 26.5 23C20.7407 23 16 18.1157 16 12Z" stroke="white" strokeWidth="2"/>
        </svg>
    </button>
);

const CustomRightNav = ({ onClick }: any) => (
    <button className={styles.right} onClick={onClick}>
        <svg className={"arrow"} width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38 12L28 6.2265V17.7735L38 12ZM12 13L29 13V11L12 11V13Z" fill="white"/>
            <path d="M22 12C22 18.1157 17.2593 23 11.5 23C5.74069 23 1 18.1157 1 12C1 5.88433 5.74069 1 11.5 1C17.2593 1 22 5.88433 22 12Z" stroke="white" strokeWidth="2"/>
        </svg>
    </button>
);
