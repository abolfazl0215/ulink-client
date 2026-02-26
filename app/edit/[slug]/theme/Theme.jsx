"use client";
import React, { useState } from "react";
import styles from "./theme.module.css";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

const Theme = ({
  showTheme,
  setShowTheme,
  address,
  setUpdate,
  setShowMenu,
}) => {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("");

  const handleSubmit = async () => {
    if (!theme) {
      return toast.error("Please select one of the themes");
    } else {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://ulink-back-431g.onrender.com/addTheme",
          {
            address,
            theme,
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
          ? { top: "2vh", boxShadow: "0 0 50px rgba(0, 0, 0, 0.714)" }
          : { top: "100vh", boxShadow: "none" }
      }>
      <div className={styles.header}>
        <Image width={16} height={16} src="/icons/zarbdar.svg" />
        <p>Theme</p>
        <Image
          onClick={() => setShowTheme("")}
          width={16}
          height={16}
          src="/icons/zarbdar.svg"
        />
      </div>

      <div className={styles.themeContainer}>
        <p>Animated Themes</p>

        {/* Animation 1 */}
        <div
          onClick={() => setTheme("bg_animation_1")}
          style={
            theme === "bg_animation_1"
              ? { border: "4px solid #2e70ff" }
              : {}
          }
          className={styles.bg_animation_1}>
          <p className={styles.map}>Navigation with Neshan</p>
          <div className={`${styles.light} ${styles.x1}`}></div>
          <div className={`${styles.light} ${styles.x2}`}></div>
          <div className={`${styles.light} ${styles.x3}`}></div>
          <div className={`${styles.light} ${styles.x4}`}></div>
          <div className={`${styles.light} ${styles.x5}`}></div>
          <div className={`${styles.light} ${styles.x6}`}></div>
          <div className={`${styles.light} ${styles.x7}`}></div>
          <div className={`${styles.light} ${styles.x8}`}></div>
          <div className={`${styles.light} ${styles.x9}`}></div>
        </div>

        {/* Animation 2 */}
        <div
          style={
            theme === "bg_animation_2"
              ? { border: "4px solid #2e70ff" }
              : {}
          }
          onClick={() => setTheme("bg_animation_2")}
          className={styles.bg_animation_2}>
          <p className={styles.map2}>Navigation with Neshan</p>
          <div className={`${styles.air} ${styles.air1}`}></div>
          <div className={`${styles.air} ${styles.air2}`}></div>
          <div className={`${styles.air} ${styles.air3}`}></div>
          <div className={`${styles.air} ${styles.air4}`}></div>
        </div>

        {/* Animation 3 */}
        <div
          style={
            theme === "bg_animation_3"
              ? { border: "4px solid #2e70ff" }
              : {}
          }
          onClick={() => setTheme("bg_animation_3")}
          className={styles.bg_animation_3}>
          <p className={styles.map3}>Navigation with Neshan</p>
          <div className={styles.area}>
            <ul className={styles.circles}>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>

        {/* Animation 4 */}
        <div
          style={
            theme === "bg_animation_4"
              ? { border: "4px solid #2e70ff" }
              : {}
          }
          onClick={() => setTheme("bg_animation_4")}
          className={styles.bg_animation_4}>
          <p className={styles.map4}>Navigation with Neshan</p>
          <div className={styles.bg4}>
            {/** SVG stays same **/}
            <svg
              viewBox="0 0 100 150"
              preserveAspectRatio="xMidYMid slice">
              {/* gradients code unchanged */}
              {/* ... */}
            </svg>
          </div>
        </div>

        <p>Static Themes</p>

        <div
          style={
            theme === "bg_image_1"
              ? { border: "4px solid #2e70ff" }
              : {}
          }
          onClick={() => setTheme("bg_image_1")}
          className={styles.bg_image_1}>
          <p className={styles.mapColor}>Navigation with Neshan</p>
        </div>

        <div
          style={
            theme === "bg_image_2"
              ? { border: "4px solid #2e70ff" }
              : {}
          }
          onClick={() => setTheme("bg_image_2")}
          className={styles.bg_image_2}>
          <p className={styles.mapColor}>Navigation with Neshan</p>
        </div>

        <div
          style={
            theme === "bg_image_3"
              ? { border: "4px solid #2e70ff" }
              : {}
          }
          onClick={() => setTheme("bg_image_3")}
          className={styles.bg_image_3}>
          <p className={styles.mapColor}>Navigation with Neshan</p>
        </div>

        <div
          style={
            theme === "bg_image_4"
              ? { border: "4px solid #2e70ff" }
              : {}
          }
          onClick={() => setTheme("bg_image_4")}
          className={styles.bg_image_4}>
          <p className={styles.mapColor}>Navigation with Neshan</p>
        </div>

        <p>Color Themes</p>

        <div
          style={
            theme === "bg_color_1"
              ? { border: "4px solid #2e70ff" }
              : {}
          }
          onClick={() => setTheme("bg_color_1")}
          className={styles.bg_color_1}>
          <p className={styles.mapColor1}>Navigation with Neshan</p>
        </div>

        <div
          style={
            theme === "bg_color_2"
              ? { border: "4px solid #2e70ff" }
              : {}
          }
          onClick={() => setTheme("bg_color_2")}
          className={styles.bg_color_2}>
          <p className={styles.mapColor2}>Navigation with Neshan</p>
        </div>

        <div
          style={
            theme === "bg_color_3"
              ? { border: "4px solid #2e70ff" }
              : {}
          }
          onClick={() => setTheme("bg_color_3")}
          className={styles.bg_color_3}>
          <p className={styles.mapColor3}>Navigation with Neshan</p>
        </div>

        <div
          style={
            theme === "bg_color_4"
              ? { border: "4px solid #2e70ff" }
              : {}
          }
          onClick={() => setTheme("bg_color_4")}
          className={styles.bg_color_4}>
          <p className={styles.mapColor4}>Navigation with Neshan</p>
        </div>

        <p>No Theme</p>
        <div
          style={
            theme === "noTheme" ? { border: "4px solid #2e70ff" } : {}
          }
          onClick={() => setTheme("noTheme")}></div>
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

export default Theme;
