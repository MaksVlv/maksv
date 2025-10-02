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
      <svg width="50" height="50" viewBox="0 0 268 268" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M267.333 117.333H64.5L157.583 24.25L134 0.666626L0.666626 134L134 267.333L157.583 243.75L64.5 150.667H267.333V117.333Z"
            fill="#FFD700"/>
      </svg>
  </button>
);

const CustomRightNav = ({onClick}: any) => (
  <button className={styles.right} onClick={onClick}>
    <svg width="50" height="50" viewBox="0 0 268 268" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.666697 150.667L203.5 150.667L110.417 243.75L134 267.333L267.333 134L134 0.666736L110.417 24.2501L203.5 117.333L0.6667 117.333L0.666697 150.667Z"
        fill="#FFD700"/>
    </svg>
  </button>
);
