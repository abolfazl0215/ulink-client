"use client";
import React, { useContext } from "react";
import styles from "./step1.module.css";
import Image from "next/image";
import { useState } from "react";

const Step1 = ({
  setStep,
  step,
  setSection,
  selectedMessenger,
  setSelectedMessenger,
}) => {
  // all messengers for selection
  const [sociaMedias, setSociaMedias] = useState([
    {
      type: "neshan",
      faName: "Neshan",
    },
    {
      type: "balad",
      faName: "Balad",
    },
    {
      type: "waze",
      faName: "Waze",
    },
    {
      type: "googleMap",
      faName: "Google Map",
    },
  ]);
  // end all messengers for selection

  return (
    <div
      className={styles.step1}
      style={step == 1 ? { top: "2vh" } : {}}>
      {/* header messengers modal page */}
      <div className={styles.header}>
        <Image width={16} height={16} src="/icons/zarbdar.svg" />
        <p>Contact & Communication Methods</p>
        <Image
          onClick={() => setSection("")}
          width={16}
          height={16}
          src="/icons/zarbdar.svg"
        />
      </div>
      {/* end header messengers modal page */}
      <div className={styles.messengers}>
        {sociaMedias.map((m) => (
          <button
            onClick={() => {
              setStep(2);
              const cloneSelectedMessenger = [...selectedMessenger];
              cloneSelectedMessenger.push({
                type: m.type,
                imageUrl: m.imageUrl,
                faName: m.faName,
                id: Math.floor(Math.random() * 100000),
              });
              setSelectedMessenger(cloneSelectedMessenger);
            }}
            className={styles.messenger}>
            {/* <Image width={16} height={16} src={m.imageUrl} /> */}
            <span>{m.faName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step1;
