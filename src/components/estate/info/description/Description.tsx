import React from "react";
import styles from './description.module.scss';
import { IEstate } from "../../../../types";
import { useTranslation } from "next-i18next";
import Params from "../params/Params";
import MobParams from "../mobParams/MobParams";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


interface DescriptionProps {
    estate: IEstate,
    googleApi: string
}
const containerStyle = {
    width: '100%',
    height: '100%'
};

export default function Description({ estate, googleApi }: DescriptionProps) {

    const { t, i18n } = useTranslation();

    const getYouTubeVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);

        if (match && match[2]) {
            return match[2];
        } else {
            return null;
        }
    }

    return (
        <div className={styles.descriptionSection + " wrapper"}>
            <h2>{`${estate.name[i18n.language]}, ${estate.district.name.lv !== " " ? estate.district.name[i18n.language] + "," : ""} ${estate.city.name[i18n.language]}`}</h2>
            <h3 className={styles.pricePc}>
                {
                    Number(estate.price.toFixed(2)).toLocaleString('lv', { style: 'currency', currency: 'EUR' })
                }
                {
                    estate.rent ? " " + t("params:month") : ''
                }
                {
                    estate.type.en === "Flat" || estate.type.en === "Land" ?
                        //@ts-ignore
                        <span>({Number((estate.price / (estate.livingArea || estate.landArea)).toFixed(2)).toLocaleString('lv', { style: 'currency', currency: 'EUR' })}/m²)</span>
                        :
                        ""
                }
            </h3>
            <div className={styles.params}>
                <Params estate={estate} dark={true} />
            </div>
            <div className={styles.mobParams}>
                <MobParams estate={estate} />
            </div>
            <h3>{t("estatePage:info.description")}</h3>
            <p dangerouslySetInnerHTML={{__html: estate.description[i18n.language]}}/>
            {estate.youtube_link && getYouTubeVideoId(estate.youtube_link) &&
                <>
                    <h3>{t("estatePage:info.video")}</h3>
                    <div className={styles.iframe}>
                        <iframe width="100%" height="100%"
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(estate.youtube_link)}`}>
                        </iframe>
                    </div>
                </>
            }
            {estate.video &&
                <>
                    <h3>{t("estatePage:info.video")}</h3>
                    <video
                        className={styles.video}
                        src={estate.video}
                        controls={true}
                        controlsList={"nodownload"}
                    />
                </>
            }
            <h3>{t("estatePage:info.location")}</h3>
            <div className={styles.map}>
                <LoadScript googleMapsApiKey={googleApi}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{lat: estate.location.lat, lng: estate.location.lng}}
                        zoom={13}
                    >
                        <Marker position={{lat: estate.location.lat, lng: estate.location.lng}}/>
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    )

}
