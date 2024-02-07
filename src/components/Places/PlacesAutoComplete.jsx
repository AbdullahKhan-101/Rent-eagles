import { Autocomplete } from "@react-google-maps/api";
import React from "react";

const PlacesAutoComplete = ({
  handleChange,
  name,
  setSearchResult,
  setPlaceId,
  searchResult,
}) => {
  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };
  const onPlaceChanged = () => {
    const place = searchResult?.getPlace();
    if (name) {
      handleChange(name, place?.formatted_address);
    }
    const placeId = place?.place_id;
    setPlaceId(placeId);
  };

  const onInputKeyDown = (event) => {
    // Prevent action on Enter key press
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  return (
    <div className="w-full">
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
        {name ? (
          <input
            onKeyDown={onInputKeyDown}
            type="text"
            placeholder="City, airport, address or hotel"
          />
        ) : (
          <input
            onKeyDown={onInputKeyDown}
            type="text"
            placeholder="City, airport, address or hotel"
          />
        )}
      </Autocomplete>
    </div>
  );
};

export default PlacesAutoComplete;
