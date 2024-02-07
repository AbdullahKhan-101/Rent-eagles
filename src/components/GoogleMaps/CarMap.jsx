import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import MarkerCard from "../Search/MarkerCard";

const CarMap = React.memo(
  ({ cars }) => {
    const GooglAPIKey = process.env.NEXT_PUBLIC_GOOGLE_API;
    const [location, setLocation] = useState(null);

    const fetchCoordinates = async (position) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${position}&key=${GooglAPIKey}`
        );
        const data = await response.json();

        if (data.results.length > 0) {
          const respnse = data.results[0].geometry.location;
          // console.log("Coordinates:", respnse); // Add this line for logging
          // console.log(data.results[0].geometry.location, "qwerty");
          setLocation(respnse);
          return respnse;
        } else {
          console.error("Invalid address");
        }
      } catch (error) {
        console.error("Error fetching coordinates", error);
      }
    };

    const mapContainerStyle = {
      width: "100%",
      height: "100%",
    };

    const center = location || { lat: 40.3947365, lng: 49.4198045 };

    const [markers, setMarkers] = useState([]);

    const GetMarkersData = async () => {
      const data = await Promise.all(
        cars?.map(async (car) => {
          const { id, car_name, address, price_per_day, photo } = car;
          const respnse = await fetchCoordinates(address);

          return {
            id,
            name: car_name,
            position: respnse,
            price_per_day,
            photo,
            address,
          };
        })
      );
      setMarkers(data);
    };

    useEffect(() => {
      GetMarkersData();
    }, [cars]);

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
      if (marker === activeMarker) {
        setActiveMarker(null);
      }
      setActiveMarker(marker);
    };

    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        onClick={() => setActiveMarker(null)}
        zoom={11}
      >
        {markers?.map((data, index) => (
          <MarkerF
            key={data?.id}
            position={data?.position}
            onClick={() =>
              activeMarker !== data.id
                ? handleActiveMarker(data?.id)
                : setActiveMarker(null)
            }
            icon={{
              url: "https://cdn-icons-png.flaticon.com/512/3082/3082383.png",
              scaledSize: { width: 35, height: 35 },
            }}
          >
            {activeMarker === data?.id ? (
              <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                <div>
                  <MarkerCard key={index} allData={data} />
                </div>
              </InfoWindowF>
            ) : null}
          </MarkerF>
        ))}
      </GoogleMap>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.cars.length === nextProps.cars.length &&
      prevProps.cars.every((car, index) => car.id === nextProps.cars[index].id)
    );
  }
);

CarMap.displayName = "CarMap";

export default CarMap;
