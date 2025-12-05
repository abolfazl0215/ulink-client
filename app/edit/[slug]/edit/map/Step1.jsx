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
  const [socialMedias, setSocialMedias] = useState([
    {
      type: "neshan",
      // link: "09224883894",
      enName: "Neshan",
    },
    {
      type: "balad",
      enName: "Balad",
    },
    {
      type: "googleMap",
      // link: "09224883894",
      enName: "Google Maps",
    },
    {
      type: "waze",
      enName: "Waze",
    },
  ]);
  // end all messengers for selection

  return (
    <div
      className={styles.step1}
      style={step === 1 ? { top: "2vh" } : {}}>
      {/* header messengers modal page */}
      <div className={styles.header}>
        <Image width={16} height={16} src="/icons/zarbdar.svg" />
        <p>Navigation</p>
        <Image
          onClick={() => setSection("")}
          width={16}
          height={16}
          src="/icons/zarbdar.svg"
        />
      </div>
      {/* end header messengers modal page */}
      <div className={styles.messengers}>
        {socialMedias.map((m) => (
          <button
            onClick={() => {
              setStep(2);
              const cloneSelectedMessenger = [...selectedMessenger];
              cloneSelectedMessenger.push({
                type: m.type,
                imageUrl: m.imageUrl,
                enName: m.enName,
                id: Math.floor(Math.random() * 100000),
              });
              setSelectedMessenger(cloneSelectedMessenger);
            }}
            className={styles.messenger}>
            {/* <Image width={16} height={16} src={m.imageUrl} /> */}
            <span>{m.enName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step1;
