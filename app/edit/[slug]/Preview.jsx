import React, { useContext } from "react";
import styles from "./preview.module.css";
import Messenger from "../../[slug]/messenger/Messenger";
import SocialMedia from "../../[slug]/socialMedia/SocialMedia";
import Call from "../../[slug]/call/Call";
import Image from "next/image";
import Slider from "../../[slug]/slider/Slider";
import Banner from "../../[slug]/banner/Banner";
import Video from "../../[slug]/video/Video";
import Link from "../../[slug]/link/Link";
import SuperLink from "../../[slug]/superLink/SuperLink";
import Map from "../../[slug]/map/Map";
import Text from "../../[slug]/text/Text";
import Questions from "../../[slug]/question/Questions";
import Payment from "../../[slug]/payment/Payment";
import Line from "../../[slug]/line/Line";
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
    // {
    //   path: "./fonts/yekan/YekanBakh-Light.woff2",
    //   weight: "700",
    //   style: "normal",
    // },
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
    // {
    //   path: "./fonts/yekan/YekanBakh-Thin.woff2",
    //   weight: "700",
    //   style: "normal",
    // },
  ],
  display: "swap",
});

async function getData() {
  const res = await fetch("https://ulinkkk.liara.run/getLinks", {
    cache: "no-store",
    // next: { revalidate: 15 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const ShowEdits = async ({ data }) => {
  // const data = await getData();

  if (data) {
    const theme = data.theme ? data.theme : "noThem";
    return (
      <div
        style={{ overflow: "hidden" }}
        className={`${styles[theme]}`}>
        <div
          style={theme == "bg_animation_1" ? {} : { display: "none" }}
          className={`${styles.light} ${styles.x1}`}></div>
        <div
          style={theme == "bg_animation_1" ? {} : { display: "none" }}
          className={`${styles.light} ${styles.x2}`}></div>
        <div
          style={theme == "bg_animation_1" ? {} : { display: "none" }}
          className={`${styles.light} ${styles.x3}`}></div>
        <div
          style={theme == "bg_animation_1" ? {} : { display: "none" }}
          className={`${styles.light} ${styles.x4}`}></div>
        <div
          style={theme == "bg_animation_1" ? {} : { display: "none" }}
          className={`${styles.light} ${styles.x5}`}></div>
        <div
          style={theme == "bg_animation_1" ? {} : { display: "none" }}
          className={`${styles.light} ${styles.x6}`}></div>
        <div
          style={theme == "bg_animation_1" ? {} : { display: "none" }}
          className={`${styles.light} ${styles.x7}`}></div>
        <div
          style={theme == "bg_animation_1" ? {} : { display: "none" }}
          className={`${styles.light} ${styles.x8}`}></div>
        <div
          style={theme == "bg_animation_1" ? {} : { display: "none" }}
          className={`${styles.light} ${styles.x9}`}></div>
        {/* end animatin 1 */}
        {/* animation2 */}
        {/* <section className={styles.bg_2}> */}
        <div
          style={theme == "bg_animation_2" ? {} : { display: "none" }}
          className={styles.bg2}>
          <div className={`${styles.air} ${styles.air1}`}></div>
          <div className={`${styles.air} ${styles.air2}`}></div>
          <div className={`${styles.air} ${styles.air3}`}></div>
          <div className={`${styles.air} ${styles.air4}`}></div>
        </div>
        {/* </section> */}
        {/* end animation2 */}
        {/* animation 3 */}
        <div
          style={theme == "bg_animation_3" ? {} : { display: "none" }}
          className={styles.area}>
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
        {/* end animation 3 */}
        {/*  animation 4 */}
        <div
          style={theme == "bg_animation_4" ? {} : { display: "none" }}
          className={styles.bg4}>
          <svg
            viewBox="0 0 100 150"
            preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient
                id="Gradient1"
                cx="50%"
                cy="50%"
                fx="0.441602%"
                fy="50%"
                r=".5">
                <animate
                  attributeName="fx"
                  dur="34s"
                  values="0%;3%;0%"
                  repeatCount="indefinite"></animate>
                <stop
                  offset="0%"
                  stop-color="rgba(255, 0, 255, 1)"></stop>
                <stop
                  offset="100%"
                  stop-color="rgba(255, 0, 255, 0)"></stop>
              </radialGradient>
              <radialGradient
                id="Gradient2"
                cx="50%"
                cy="50%"
                fx="2.68147%"
                fy="50%"
                r=".5">
                <animate
                  attributeName="fx"
                  dur="23.5s"
                  values="0%;3%;0%"
                  repeatCount="indefinite"></animate>
                <stop
                  offset="0%"
                  stop-color="rgba(255, 255, 0, 1)"></stop>
                <stop
                  offset="100%"
                  stop-color="rgba(255, 255, 0, 0)"></stop>
              </radialGradient>
              <radialGradient
                id="Gradient3"
                cx="50%"
                cy="50%"
                fx="0.836536%"
                fy="50%"
                r=".5">
                <animate
                  attributeName="fx"
                  dur="21.5s"
                  values="0%;3%;0%"
                  repeatCount="indefinite"></animate>
                <stop
                  offset="0%"
                  stop-color="rgba(0, 255, 255, 1)"></stop>
                <stop
                  offset="100%"
                  stop-color="rgba(0, 255, 255, 0)"></stop>
              </radialGradient>
              <radialGradient
                id="Gradient4"
                cx="50%"
                cy="50%"
                fx="4.56417%"
                fy="50%"
                r=".5">
                <animate
                  attributeName="fx"
                  dur="23s"
                  values="0%;5%;0%"
                  repeatCount="indefinite"></animate>
                <stop
                  offset="0%"
                  stop-color="rgba(0, 255, 0, 1)"></stop>
                <stop
                  offset="100%"
                  stop-color="rgba(0, 255, 0, 0)"></stop>
              </radialGradient>
              <radialGradient
                id="Gradient5"
                cx="50%"
                cy="50%"
                fx="2.65405%"
                fy="50%"
                r=".5">
                <animate
                  attributeName="fx"
                  dur="24.5s"
                  values="0%;5%;0%"
                  repeatCount="indefinite"></animate>
                <stop
                  offset="0%"
                  stop-color="rgba(0,0,255, 1)"></stop>
                <stop
                  offset="100%"
                  stop-color="rgba(0,0,255, 0)"></stop>
              </radialGradient>
              <radialGradient
                id="Gradient6"
                cx="50%"
                cy="50%"
                fx="0.981338%"
                fy="50%"
                r=".5">
                <animate
                  attributeName="fx"
                  dur="25.5s"
                  values="0%;5%;0%"
                  repeatCount="indefinite"></animate>
                <stop
                  offset="0%"
                  stop-color="rgba(255,0,0, 1)"></stop>
                <stop
                  offset="100%"
                  stop-color="rgba(255,0,0, 0)"></stop>
              </radialGradient>
            </defs>

            <rect
              x="13.744%"
              y="1.18473%"
              width="100%"
              height="100%"
              fill="url(#Gradient1)"
              transform="rotate(334.41 50 50)">
              <animate
                attributeName="x"
                dur="20s"
                values="25%;0%;25%"
                repeatCount="indefinite"></animate>
              <animate
                attributeName="y"
                dur="21s"
                values="0%;25%;0%"
                repeatCount="indefinite"></animate>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="7s"
                repeatCount="indefinite"></animateTransform>
            </rect>
            <rect
              x="-2.17916%"
              y="35.4267%"
              width="100%"
              height="100%"
              fill="url(#Gradient2)"
              transform="rotate(255.072 50 50)">
              <animate
                attributeName="x"
                dur="23s"
                values="-25%;0%;-25%"
                repeatCount="indefinite"></animate>
              <animate
                attributeName="y"
                dur="24s"
                values="0%;50%;0%"
                repeatCount="indefinite"></animate>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="12s"
                repeatCount="indefinite"></animateTransform>
            </rect>
            <rect
              x="9.00483%"
              y="14.5733%"
              width="100%"
              height="100%"
              fill="url(#Gradient3)"
              transform="rotate(139.903 50 50)">
              <animate
                attributeName="x"
                dur="25s"
                values="0%;25%;0%"
                repeatCount="indefinite"></animate>
              <animate
                attributeName="y"
                dur="12s"
                values="0%;25%;0%"
                repeatCount="indefinite"></animate>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 50 50"
                to="0 50 50"
                dur="9s"
                repeatCount="indefinite"></animateTransform>
            </rect>
          </svg>
        </div>
        {/* end animation 4 */}

        <div
          className={`${styles.container} ${
            data.font == "estedad"
              ? estedad.className
              : data.font == "mikhak"
              ? mikhak.className
              : data.font == "aseman"
              ? aseman.className
              : data.font == "yekan"
              ? yekan.className
              : ""
          }`}>
          {data.sections.map((s) => (
            <>
              {/* <button>سلام برتو ای بانوی من</button> */}
              {s.type && s.type == "information" ? (
                <div className={styles.information}>
                  <Image width={100} height={100} src={s.imageUrl} />
                  <h1
                    style={
                      theme == "bg_animation_1"
                        ? {
                            color: "#fff",
                          }
                        : theme == "bg_animation_3"
                        ? {
                            color: "#fff",
                          }
                        : {}
                    }>
                    {s.title}
                  </h1>
                  <p
                    style={
                      theme == "bg_animation_1"
                        ? {
                            color: "#fff",
                          }
                        : theme == "bg_animation_3"
                        ? {
                            color: "#fff",
                          }
                        : theme == "bg_animation_2"
                        ? {
                            color: "#deeafc",
                          }
                        : {}
                    }>
                    {s.subTitle}
                  </p>
                </div>
              ) : s.type && s.type == "messenger" ? (
                <Messenger item={s} theme={theme} />
              ) : s.type && s.type == "socialmedia" ? (
                <SocialMedia item={s} theme={theme} />
              ) : s.type && s.type == "call" ? (
                <Call item={s} theme={theme} />
              ) : s.type && s.type == "slider" ? (
                <Slider item={s} theme={theme} />
              ) : s.type && s.type == "banner" ? (
                <Banner item={s} theme={theme} />
              ) : s.type && s.type == "video" ? (
                <Video item={s} theme={theme} />
              ) : s.type && s.type == "link" ? (
                <Link item={s} theme={theme} />
              ) : s.type && s.type == "superlink" ? (
                <SuperLink item={s} theme={theme} />
              ) : s.type && s.type == "map" ? (
                <Map item={s} theme={theme} />
              ) : s.type && s.type == "text" ? (
                <Text item={s} theme={theme} />
              ) : s.type && s.type == "question" ? (
                <Questions item={s} theme={theme} />
              ) : s.type && s.type == "payment" ? (
                <Payment item={s} theme={theme} />
              ) : s.type && s.type == "line" ? (
                <Line item={s} theme={theme} />
              ) : (
                ""
              )}
            </>
          ))}
          <a
            href="https://hamrahlink.com"
            className={styles.createdByMe}>
            <span>ساخته شده توسط همراه لینک</span>
          </a>
        </div>
      </div>
    );
  } else {
    return <h1>404not found</h1>;
  }
};

export default ShowEdits;
