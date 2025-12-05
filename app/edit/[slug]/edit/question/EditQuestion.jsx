"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Step2 from "./Step2";

const EditQuestion = ({ setSection, address, setUpdate }) => {
  const [step, setStep] = useState(1);
  const [selectedMessenger, setSelectedMessenger] = useState([
    {
      id: Math.floor(Math.random() * 10000),
      faName: "Frequently Asked Questions",
    },
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

export default EditQuestion;
