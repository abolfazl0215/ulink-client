"use client";
import React, { useState } from "react";
import styles from "./font.module.css";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import localFont from "next/font/local";

const mikhak = localFont({
  src: [
    {
      path: "./fonts/mikhak/Mikhak-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/mikhak/Mikhak-SemiBold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/mikhak/Mikhak-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/mikhak/Mikhak-ExtraBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/mikhak/Mikhak-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/mikhak/Mikhak-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});

const aseman = localFont({
  src: [
    {
      path: "./fonts/aseman/Aseman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/aseman/Aseman.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/aseman/Aseman.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/aseman/Aseman.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/aseman/Aseman.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/aseman/Aseman.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});

const estedad = localFont({
  src: [
    {
      path: "./fonts/estedad/Estedad-Medium.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/estedad/Estedad-Bold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/estedad/Estedad-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/estedad/Estedad-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/estedad/Estedad-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/estedad/Estedad-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});

const yekan = localFont({
  src: [
    {
      path: "./fonts/yekan/YekanBakh-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/yekan/YekanBakh-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/yekan/YekanBakh-ExtraBlack.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/yekan/YekanBakh-ExtraBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/yekan/YekanBakh-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/yekan/YekanBakh-SemiBold.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
});

const Font = ({
  showTheme,
  setShowTheme,
  address,
  setUpdate,
  setShowMenu,
}) => {
  const [loading, setLoading] = useState(false);
  const [font, setFont] = useState("");

  const handleSubmit = async () => {
    if (!font) {
      return toast.error("Please select one of the fonts");
    } else {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://ulink-back-431g.onrender.com/setFont",
          {
            address,
            font,
          },
        );

        console.log(res.data);
        setUpdate((prev) => prev + 1);
        toast.success("Operation was successful");
        setLoading(false);
        setShowMenu(false);
        setShowTheme(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div
      className={styles.step2}
      style={
        showTheme
          ? { top: "2vh", boxShadow: "0 0 50px rgba(0,0,0,0.714)" }
          : { top: "100vh", boxShadow: "none" }
      }>
      <div className={styles.header}>
        <Image width={16} height={16} src="/icons/zarbdar.svg" />
        <p>Select Font</p>
        <Image
          onClick={() => {
            setShowTheme("");
            setShowMenu("");
          }}
          width={16}
          height={16}
          src="/icons/zarbdar.svg"
        />
      </div>

      <div className={styles.fontContainer}>
        <div
          className={yekan.className}
          style={font === "yekan" ? { border: "2px solid blue" } : {}}
          onClick={() => setFont("yekan")}>
          <p>Yekan Bakh</p>
          <p>Supports more than one link</p>
        </div>

        <div
          className={mikhak.className}
          style={
            font === "mikhak" ? { border: "2px solid blue" } : {}
          }
          onClick={() => setFont("mikhak")}>
          <p>Mikhak</p>
          <p>Supports more than one link</p>
        </div>

        <div
          className={estedad.className}
          style={
            font === "estedad" ? { border: "2px solid blue" } : {}
          }
          onClick={() => setFont("estedad")}>
          <p>Estedad</p>
          <p>Supports more than one link</p>
        </div>

        <div
          className={aseman.className}
          style={
            font === "aseman" ? { border: "2px solid blue" } : {}
          }
          onClick={() => setFont("aseman")}>
          <p>Aseman</p>
          <p>Supports more than one link</p>
        </div>
      </div>

      <div
        className={styles.buttonContainer}
        style={showTheme ? { display: "flex" } : { display: "none" }}>
        <button onClick={() => setShowTheme("")}>Cancel</button>

        {!loading ? (
          <button type="submit" onClick={handleSubmit}>
            Save
          </button>
        ) : (
          <button
            type="submit"
            style={{ display: "flex", alignItems: "center" }}>
            <BeatLoader
              color={"#fff"}
              loading={true}
              cssOverride={{
                display: "block",
                borderColor: "red",
              }}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Font;
