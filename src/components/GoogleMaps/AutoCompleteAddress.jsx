import React from "react";
import Autocomplete from "react-google-autocomplete";

const GoogleAutoCompleteComponent = () => {
  const handlePlaceSelected = (place) => {
    console.log(place);

    // Extract city and state from address components
    const addressComponents = place.address_components || [];
    let city = "";
    let state = "";
    let streetAddress = "";

    // Iterate through address components to find city, state, and street address
    for (const component of addressComponents) {
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        state = component.long_name;
      }
      if (component.types.includes("street_address")) {
        streetAddress = component.long_name;
      }
    }

    // Combine components to create a full address
    const fullAddress = `${streetAddress}, ${city}, ${state}`;
    
    // Do something with fullAddress (e.g., apply styling)
    console.log("Full Address:", fullAddress);
    console.log("Full Address:", city);
    console.log("Full Address:", state);

    // You can use the fullAddress value to update your component's state
    // or trigger any styling logic based on your application requirements
  };

  return (
    <Autocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_API}  
      onPlaceSelected={handlePlaceSelected}
      options={{ types: ["geocode"] }} 
    />
  );
};

export default GoogleAutoCompleteComponent;
