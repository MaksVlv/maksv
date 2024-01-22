import styles from "./filter.module.scss";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { IEstate } from "@/types";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

interface Props {
    estate: IEstate
}

export const EstateMapMarker = ({ estate }: Props) => {

    const { t, i18n } = useTranslation();
    const [isInfoWindowOpen, setInfoWindowOpen] = useState(false);
    const [iconUrl, setIconUrl] = useState(getIcon(estate.type.en));

    return (
        <div
            className={styles.marker}
        >
            <Marker
                onClick={() => setInfoWindowOpen(true)}
                position={{ lat: estate.location.lat, lng: estate.location.lng }}
                icon={
                    getIcon(estate.type.en) ? {
                        url: getIcon(estate.type.en) || "",
                        scaledSize: new window.google.maps.Size(26, 37)
                    } : undefined
                }
            />
            {isInfoWindowOpen && (
                <InfoWindow
                    onCloseClick={() => setInfoWindowOpen(false)}
                    position={{ lat: estate.location.lat, lng: estate.location.lng }}
                >
                    <div
                        className={styles.infoMarker}
                    >
                        <div className={styles.img}>
                            <img src={estate.mainImage} alt="img"/>
                            <div className={styles.type}>{estate.type[i18n.language]}</div>
                        </div>
                        <h3>{estate.name[i18n.language]}</h3>
                        <p>
                            {Number(estate.price.toFixed(2)).toLocaleString('lv', { style: 'currency', currency: 'EUR' })} {estate.rent ? t("params:month") : ''}
                        </p>
                        <div className={styles.more}>
                            <Link href={{ pathname: `/estate/[id]`, query: { id: estate._id } }} target={"_blank"}>{t("estatePage:more")}</Link>
                        </div>
                    </div>
                </InfoWindow>
            )}
        </div>
    )
}

const getIcon = (type: string) => {
    switch (type) {
        case "House":
            return "/map/houseMarker.png"
        case "Flat":
            return "/map/flatMarker.png"
        case "Land":
            return "/map/landMarker.png"
        case "Factory":
            return "/map/factoryMarker.png"
        case "Commercial object":
            return "/map/commercialObjectMarker.png"
        case "Attic, basement":
            return "/map/atticBasementMarker.png"
        case "Workshops, warehouses, production facilities":
            return "/map/warehousesMarker.png"
        case "Garage":
            return "/map/garageMarker.png"
        case "Parking":
            return "/map/parkingMarker.png"
        case "Restaurants, cafes, offices":
            return "/map/cafesMarker.png"
        case "Forest":
            return "/map/forestMarker.png"
        default:
            return null;
    }
}
