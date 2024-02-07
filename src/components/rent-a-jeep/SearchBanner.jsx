import React from "react";
import SearchBar from "../Search/SearchBar";

const SearchBanner = ({ topheading, heading }) => {
  return (
    <div className="search-banner py-12 search-banner-bg">
      <div className="container px-5 mx-auto text-center">
        <h2 className="text-black font-bold font-4xl mb-4">{topheading}</h2>
        <h1 className="text-black font-bold text-6xl mb-4">{heading}</h1>
        <SearchBar heading={heading} />
      </div>
    </div>
  );
};

export default SearchBanner;
