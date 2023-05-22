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

    return (
        <div className={styles.descriptionSection + " wrapper"}>
            <h2>{estate.name[i18n.language]}</h2>
            <h3 className={styles.pricePc}>
                {
                    Number(estate.price.toFixed(2)).toLocaleString('lv', { style: 'currency', currency: 'EUR' })
                }
                {
                    estate.rent ? t("params:month") : ''
                }
                {
                    estate.type.en === "Flats" || estate.type.en === "Land" ?
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
            <h3>{t("estatePage:info.location")}</h3>
            <div className={styles.map}>
                <LoadScript googleMapsApiKey={googleApi}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{ lat: estate.location.lat, lng: estate.location.lng }}
                        zoom={13}
                    >
                        <Marker position={{ lat: estate.location.lat, lng: estate.location.lng }} />
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    )

}
