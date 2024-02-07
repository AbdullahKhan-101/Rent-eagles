import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

const MapComponent = React.memo(
  ({ address }) => {
    const GooglAPIKey = process.env.NEXT_PUBLIC_GOOGLE_API;
    const [location, setLocation] = useState(null);

    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GooglAPIKey}`
        );
        const data = await response.json();

        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setLocation({ lat, lng });
        } else {
          console.error("Invalid address");
        }
      } catch (error) {
        console.error("Error fetching coordinates", error);
      }
    };

    useEffect(() => {
      fetchCoordinates();
    }, [address]);

    const mapContainerStyle = {
      width: "100%",
      height: "400px",
    };

    const center = location || { lat: 0, lng: 0 };

    const circleOptions = {
      strokeColor: "#0000FF",
      strokeOpacity: 0.4,
      strokeWeight: 1,
      fillColor: "#0000FF",
      fillOpacity: 0.15,
      clickable: false,
      draggable: false,
      editable: false,
      visible: true,
      radius: 5000,
      center: location,
    };

    return (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={11}
        >
          {location && (
            <>
              <Marker position={location} />
              <Circle options={circleOptions} />
            </>
          )}
        </GoogleMap>
    );
  },
  (prevProps, nextProps) => {

    return (
      prevProps.address === nextProps.address
    );
  }
);

MapComponent.displayName = "MapComponent";

export default MapComponent;