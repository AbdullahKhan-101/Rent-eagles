"use client";
import FormCard from "@/components/Host/Form/FormCard";
import ListingForm1 from "@/components/Host/Form/ListingForm1";
import ListingForm2 from "@/components/Host/Form/ListingForm2";
import ListingForm3 from "@/components/Host/Form/ListingForm3";
import ListingForm4 from "@/components/Host/Form/ListingForm4";
import ListingForm5 from "@/components/Host/Form/ListingForm5";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const stepform = useSelector((state) => state.formdata.formdata);
  const Step = useSelector((state) => state.formdata.currentStep);
  return (
    <div>
      <FormCard currentStep={Step}>
        {Step === 1 && <ListingForm1 stepform={stepform} />}

        {Step === 2 && <ListingForm2 stepform={stepform} />}

        {Step === 3 && <ListingForm3 stepform={stepform} />}
        {/* {Step === 4 &&
                    <ListingForm4 stepform={stepform} />
                } */}
        {Step === 4 && <ListingForm5 stepform={stepform} />}
      </FormCard>
    </div>
  );
};

export default Index;
