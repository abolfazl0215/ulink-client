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
  // all messengers for select
  const [sociaMedias, setSociaMedias] = useState([
    {
      type: "tell",
      imageUrl: "/icons/mobile.svg",
      faName: "Mobile Number",
    },
    {
      type: "phoneNumber",
      imageUrl: "/icons/phone.svg",
      link: "https://t.me/pounes_irr",
      faName: "Landline",
    },
    {
      type: "email",
      imageUrl: "/icons/email.svg",
      faName: "Email",
    },
    {
      type: "sms",
      imageUrl: "/icons/sms.svg",
      faName: "SMS",
    },
  ]);
  // end all messengers for select

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
            <Image width={16} height={16} src={m.imageUrl} />
            <span>{m.faName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step1;
