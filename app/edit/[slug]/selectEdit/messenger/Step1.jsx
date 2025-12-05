"use client";
import React, { useContext, useEffect } from "react";
import styles from "./step1.module.css";
import Image from "next/image";
import { useState } from "react";
import { MessengerContext } from "./messengerContext";

const Step1 = ({
  setStep,
  step,
  setSection,
  selectedMessenger,
  setSelectedMessenger,
}) => {
  // all messengers for selection
  const [sociaMedias, setSociaMedias] = useState([
    { social: "whatsapp", imageUrl: "/icons/whatsapp.svg", faName: "WhatsApp" },
    { social: "telegram", imageUrl: "/icons/telegram.svg", faName: "Telegram" },
    { social: "bale", imageUrl: "/icons/bale.svg", faName: "Bale" },
    { social: "soroush", imageUrl: "/icons/soroush.svg", faName: "Soroush" },
    { social: "discord", imageUrl: "/icons/discord.svg", faName: "Discord" },
    { social: "skype", imageUrl: "/icons/skype.svg", faName: "Skype" },
    { social: "messenger", imageUrl: "/icons/messenger.svg", faName: "Messenger" },
    { social: "kik", imageUrl: "/icons/kik.svg", faName: "Kik" },
    { social: "viber", imageUrl: "/icons/viber.svg", faName: "Viber" },
    { social: "line", imageUrl: "/icons/line.svg", faName: "Line" },
    { social: "eitaa", imageUrl: "/icons/eitaa.svg", faName: "Eitaa" },
    { social: "gap", imageUrl: "/icons/gap.svg", faName: "Gap" },
  ]);
  // end all messengers for selection

  useEffect(() => {
    console.log("Step1 mounted");
  }, []);

  return (
    <div
      className={styles.step1}
      style={step == 1 ? { top: "2vh" } : {}}>
      {/* header messengers modal page */}
      <div className={styles.header}>
        <Image width={16} height={16} src="/icons/zarbdar.svg" />
        <p>Messengers</p>
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
                social: m.social,
                faName: m.faName,
                imageUrl: m.imageUrl,
                id: Math.floor(Math.random() * 100000),
              });
              setSelectedMessenger(cloneSelectedMessenger);
            }}
            className={styles.messenger}
            style={
              m.social == "whatsapp"
                ? { backgroundColor: "#dfffdb", border: "1px solid #16d900" }
                : m.social == "telegram"
                ? { backgroundColor: "#dee7ff", border: "1px solid #80a2ff" }
                : m.social == "bale"
                ? { backgroundColor: "#d5e0dd", border: "1px solid #4a917c" }
                : m.social == "soroush"
                ? { backgroundColor: "#cce8e3", border: "1px solid #22a38c" }
                : m.social == "discord"
                ? { backgroundColor: "#dcdef2", border: "1px solid #5865f2" }
                : m.social == "skype"
                ? { backgroundColor: "#e0f6ff", border: "1px solid #00aef3" }
                : m.social == "messenger"
                ? { backgroundColor: "#e6edfc", border: "1px solid #0656f7" }
                : m.social == "kik"
                ? { backgroundColor: "#f7ffe6", border: "1px solid #8bb531" }
                : m.social == "viber"
                ? { backgroundColor: "#f6ebff", border: "1px solid #7b519d" }
                : m.social == "line"
                ? { backgroundColor: "#edffe6", border: "1px solid #3ACE01" }
                : m.social == "eitaa"
                ? { backgroundColor: "#f0e5dd", border: "1px solid #EE7F22" }
                : m.social == "gap"
                ? { backgroundColor: "#e6f9ff", border: "1px solid #39AAD0" }
                : { border: "1px solid gray" }
            }>
            <Image width={16} height={16} src={m.imageUrl} />
            <span>{m.faName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step1;
