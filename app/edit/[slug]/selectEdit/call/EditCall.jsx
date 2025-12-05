"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { useContext } from "react";
import { EditContext } from "../EditContext";

const EditCall = ({ setSection, address, setUpdate }) => {
  const editContext = useContext(EditContext);
  const [step, setStep] = useState(2);
  const [selectedMessenger, setSelectedMessenger] = useState(
    editContext.item.blocks,
  );

  //   useEffect(() => {
  //     setStep(1);
  //   }, []);

  return (
    <section>
      {step == 1 ? (
        <Step1
          setSection={setSection}
          setStep={setStep}
          step={step}
          selectedMessenger={selectedMessenger}
          setSelectedMessenger={setSelectedMessenger}
        />
      ) : (
        <Step2
          setSection={setSection}
          setStep={setStep}
          step={step}
          selectedMessenger={selectedMessenger}
          setSelectedMessenger={setSelectedMessenger}
          address={address}
          setUpdate={setUpdate}
        />
      )}
    </section>
  );
};

export default EditCall;
