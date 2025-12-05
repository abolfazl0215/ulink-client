"use client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Step2 from "./Step2";
import { EditContext } from "../EditContext";

const EditBanner = ({ setSection, address, setUpdate }) => {
  const editContext = useContext(EditContext);
  const [step, setStep] = useState(1);
  const [selectedMessenger, setSelectedMessenger] = useState([
    editContext.item,
  ]);
  //   useEffect(() => {
  //     setStep(1);
  //   }, []);

  return (
    <section>
      <Step2
        setSection={setSection}
        setStep={setStep}
        step={step}
        selectedMessenger={selectedMessenger}
        setSelectedMessenger={setSelectedMessenger}
        address={address}
        setUpdate={setUpdate}
      />
    </section>
  );
};

export default EditBanner;
