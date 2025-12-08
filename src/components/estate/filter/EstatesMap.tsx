import styles from './filter.module.scss';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { IEstate } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/router';
import { EstateMapMarker } from '@/components/estate/filter/EstateMapMarker';

interface Props {
  googleApi: string;
  fullLine?: boolean;
  isFullScreen?: boolean;
}

export const EstatesMap = ({ googleApi, fullLine, isFullScreen }: Props) => {
  const router = useRouter();
  const [estates, setEstates] = useState<IEstate[]>([]);

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (map) {
      loadObjects(map);
    }
  }, [router.query]);

  const loadObjects = (map: google.maps.Map) => {
    const fil = {
      search: router.query.search || '',
      rent:
        router.query.rent === 'null'
          ? null
          : router.query.rent === 'false'
            ? false
            : router.query.rent === 'true'
              ? true
              : null,
      type: router.query.type || '',
      city: router.query.city || '',
      district: router.query.district || '',
      priceFrom: router.query.priceFrom || '',
      priceTill: router.query.priceTill || '',
      roomsFrom: router.query.roomsFrom || '',
      roomsTill: router.query.roomsTill || '',
      floorFrom: router.query.floorFrom || '',
      floorTill: router.query.floorTill || '',
      livingAreaFrom: router.query.livingAreaFrom || '',
      livingAreaTill: router.query.livingAreaTill || '',
      landAreaFrom: router.query.landAreaFrom || '',
      landAreaTill: router.query.landAreaTill || '',
      series: router.query.series || '',
      gateHeightFrom: router.query.gateHeightFrom || '',
      gateHeightTill: router.query.gateHeightTill || '',
      assignment: router.query.assignment || '',
    };
    axios
      .get(
        `estate?search=${fil.search}&rent=${fil.rent}&type=${fil.type}&city=${fil.city}&district=${fil.district}&priceFrom=${fil.priceFrom}&priceTill=${fil.priceTill}&floorFrom=${fil.floorFrom}&floorTill=${fil.floorTill}&roomsFrom=${fil.roomsFrom}&roomsTill=${fil.roomsTill}&livingAreaFrom=${fil.livingAreaFrom}&livingAreaTill=${fil.livingAreaTill}&landAreaFrom=${fil.landAreaFrom}&landAreaTill=${fil.landAreaTill}&gateHeightFrom=${fil.gateHeightFrom}&gateHeightTill=${fil.gateHeightTill}&series=${fil.series}&assignment=${fil.assignment}&map=1`,
      )
      .then((res) => {
        setEstates(res.data.data);
        if (res.data.data.length > 0) {
          const { center, zoom } = getEstatesCenter(res.data.data);
          map.setCenter(center);
          map.setZoom(zoom);
        } else {
          map.setCenter({ lat: 56.87431, lng: 24.378061 });
          map.setZoom(5);
        }
      })
      .catch((e) => console.log('Loading map estates error - ', e));
  };

  return (
    <div
      className={`${styles.map} ${fullLine ? styles.fullLine : ''} ${isFullScreen ? styles.fullScreen : ''}`}
      style={estates?.length === 0 ? { display: 'none' } : {}}
    >
      <LoadScript googleMapsApiKey={googleApi}>
        <GoogleMap
          onLoad={(map) => {
            setMap(map);
            loadObjects(map);
          }}
          mapContainerStyle={{
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
          }}
          zoom={13}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {estates?.map((estate: IEstate, i: number) => (
            <React.Fragment key={i}>
              <EstateMapMarker estate={estate} />
            </React.Fragment>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

const getEstatesCenter = (
  estates: IEstate[],
): { center: { lat: number; lng: number }; zoom: number } => {
  const tmp: any = [];
  estates.map((estate: IEstate) => {
    tmp.push(estate.location);
  });

  const minLat = Math.min(...tmp.map((obj: any) => obj.lat));
  const maxLat = Math.max(...tmp.map((obj: any) => obj.lat));
  const minLng = Math.min(...tmp.map((obj: any) => obj.lng));
  const maxLng = Math.max(...tmp.map((obj: any) => obj.lng));

  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  const latDistance = maxLat - minLat;
  const lngDistance = maxLng - minLng;

  let zoomLevel = Math.min(
    Math.floor(Math.log2(360 / lngDistance)),
    Math.floor(Math.log2(180 / latDistance)),
  );

  if (!isFinite(zoomLevel) || !zoomLevel) {
    zoomLevel = 12;
  }

  // console.log("Center:", centerLat, centerLng);
  // console.log("Zoom Level:", zoomLevel);

  return { center: { lat: centerLat, lng: centerLng }, zoom: zoomLevel };
};
