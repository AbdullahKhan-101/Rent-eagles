import { picture } from "@/Assets";
import { CameraIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useRef, useState } from "react";

const UploadDocuments = React.memo(
  ({ imagePreviews, formData, handleFileChange, name }) => {
    const [hover, setHover] = useState(false);
    const inputRef = useRef(null);

    return (
      <div
        className="relative max-w-[250px] max-h-[180px] "
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image
          src={imagePreviews[name] || formData[name] || picture}
          width={1000}
          height={1000}
          alt="image"
          className=" object-center max-w-[250px] max-h-[180px]"
        />
        <div
          onClick={() => {
            inputRef.current.click();
          }}
          className={`absolute ${
            hover ? "" : "hidden"
          } cursor-pointer bg-black opacity-80 top-0 bottom-0 left-0 right-0 flex items-center justify-center`}
        >
          <input
            type="file"
            onChange={(e) => handleFileChange(name, e.target.files[0])}
            accept="image/*"
            ref={(e) => {
              inputRef.current = e;
            }}
            className="hidden"
          />
          <CameraIcon color="white" width={70} />
        </div>
      </div>
    );
  }
);

UploadDocuments.displayName = "UploadDocuments";

export default UploadDocuments;
