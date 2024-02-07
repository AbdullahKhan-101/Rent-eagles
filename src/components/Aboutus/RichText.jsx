import React from "react";

const RichText = ({ heading, paragraph }) => {
  return (
    <div className="rich-text py-16">
      <div className="container mx-auto px-5">
        <div className="w-full md:w-4/5 mx-auto">
          <h2 className="text-black text-4xl font-semibold mb-4">{heading}</h2>
          <p className="text-black text-base">{paragraph}</p>
        </div>
      </div>
    </div>
  );
};

export default RichText;
