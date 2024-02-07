"use client";
import { useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Input,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";
import { picture } from "@/Assets";
import Image from "next/image";
import { API } from "@/Api";
import { ToastError, ToastSuccess } from "@/Utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { SetUserState } from "@/Utils/states";
import UploadDocuments from "../UploadDocuments";
import PlacesAutoComplete from "../Places/PlacesAutoComplete";
import ChangePassword from "../Modals/ChangePassword";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GetApproved = () => {
  const user = useSelector((state) => state.user.user);
  const [placeID, setPlaceId] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    profile_photo: user?.profile_photo || null,
    liscense_photo: user?.liscense_photo || null,
    id_card_photo: user?.id_card_photo || null,
    is_mob_notifications: user?.is_mob_notifications || false,
    is_email_notifications: user?.is_email_notifications || false,
    is_driver_expert: String(user?.is_driver_expert) || "false",
    address: user?.address || "",
    place_id: user?.place_id || false,
  });

  const router = useRouter();

  const [imagePreviews, setImagePreviews] = useState({
    profile_photo: null,
    liscense_photo: null,
    id_card_photo: null,
  });

  const handleCheckboxChange = (field) => {
    setFormData({
      ...formData,
      [field]: !formData[field],
    });
  };
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (field, file) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: file,
    }));

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreviews((prevImagePreviews) => ({
        ...prevImagePreviews,
        [field]: reader?.result,
      }));
    };
    reader?.readAsDataURL(file);
  };

  const [isSelected, setIsSelected] = useState(false);
  const [require, setRequire] = useState(false);
  useEffect(() => {
    if (isSelected) {
      setRequire(false);
    }
  }, [isSelected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSelected) {
      setRequire(true);
    } else {
      setRequire(false);
      console.log(
        {
          ...formData,
          place_id: formData.place_id ? formData.place_id : placeID,
        },
        "formData"
      );

      setLoading(true);

      try {
        // working on fixings
        const response = await API.GetApprovedDriver({
          ...formData,
          place_id: formData.place_id ? formData.place_id : placeID,
        });
        ToastSuccess(response);
        setLoading(false);
        dispatch(setUser(SetUserState(response)));
        router.push("/");
      } catch (error) {
        setLoading(false);
        ToastError(error);
        console.log(error);
      }
    }
  };

  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  return (
    <div className="lg:max-w-[70%] px-4 my-12 w-full mx-auto flex flex-col justify-center items-start gap-8">
      <form
        className="px-3 sm:max-w-[55%] w-full flex flex-col justify-center items-start gap-8"
        // onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Divider orientation="horizontal" />

        <div className="w-full flex gap-2 justify-between sm:max-w-[80%]">
          <p>Password</p>
          <Button onPress={onOpen} className="bg-red-700 text-white mt-8 ">
            Change Password
          </Button>
        </div>
        <Divider orientation="horizontal" />

        <div className="w-full address_input sm:max-w-[80%] ">
          <p className="py-2">Address</p>

          <PlacesAutoComplete
            handleChange={handleChange}
            name={"address"}
            setPlaceId={setPlaceId}
            setSearchResult={setSearchResult}
            searchResult={searchResult}
          />
          <p className="text-sm mt-2 text-gray-500">
            Current Address: {formData?.address}
          </p>
        </div>

        <Divider orientation="horizontal" />
        <div className="flex flex-col justify-center items-start gap-5">
          <p>Upload your Profile Picture</p>
          <UploadDocuments
            imagePreviews={imagePreviews}
            formData={formData}
            name={"profile_photo"}
            handleFileChange={handleFileChange}
          />
          <p className="text-sm text-web_brown -translate-y-2">
            Kindly use PNG, JPG, or JPEG image formats.
          </p>
        </div>
        <p className="font-bold">MOBILE NOTIFICATIONS</p>
        <Checkbox
          color="danger"
          defaultSelected={formData?.is_mob_notifications}
          checked={formData?.is_mob_notifications}
          onChange={() => handleCheckboxChange("is_mob_notifications")}
        >
          Enable text message notifications
        </Checkbox>
        <p className="font-bold">EMAIL NOTIFICATIONS</p>
        <Checkbox
          color="danger"
          defaultSelected={formData?.is_email_notifications}
          checked={formData?.is_email_notifications}
          onChange={() => handleCheckboxChange("is_email_notifications")}
        >
          Promotions and announcements
        </Checkbox>
        <Divider orientation="horizontal" />
        <p className="font-bold">Transmission</p>
        <RadioGroup
          label="Some cars on Rent Eagles do not have automatic transmissions. Are you an expert at driving manual transmissions?"
          color="danger"
          className="py-2"
          defaultValue={formData?.is_driver_expert}
          value={formData?.is_driver_expert}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              is_driver_expert: e.target.value,
            }))
          }
        >
          <Radio value="true">Yes, I am an expert</Radio>
          <Radio value="false">No, I am not an expert</Radio>
        </RadioGroup>
        <Divider orientation="horizontal" />
        <p className="font-bold">Upload required documents</p>
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-6">
          <div className="flex flex-col justify-center items-start gap-5">
            <p>Upload Your Driver’s License Photo</p>

            <UploadDocuments
              imagePreviews={imagePreviews}
              formData={formData}
              name={"liscense_photo"}
              handleFileChange={handleFileChange}
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-5">
            <p>Upload your ID Card</p>
            <UploadDocuments
              imagePreviews={imagePreviews}
              formData={formData}
              name={"id_card_photo"}
              handleFileChange={handleFileChange}
            />
          </div>
        </div>
        <p className="text-sm text-web_brown -translate-y-2">
          Kindly use PNG, JPG, or JPEG image formats.
        </p>
        <Checkbox
          color="danger"
          isSelected={isSelected}
          onValueChange={setIsSelected}
        >
          I hereby declare that all the information provided above is true and
          accurate to the best of my knowledge.
        </Checkbox>
        {require && (
          <p className="text-sm text-red-700 -mt-6">This field is required</p>
        )}
        <Button
          isLoading={loading}
          // type="submit"
          className="bg-red-700 text-white"
          aria-required
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>

      <ChangePassword
        from="driver"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default GetApproved;
