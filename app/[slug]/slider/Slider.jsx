"use client";
import React from "react";
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import styles from "./slider.module.css";
import Image from "next/image";

const Slider = ({ item, theme }) => {
  return (
    <div className={styles.slider}>
      <h2
        style={
          theme == "bg_color_1"
            ? { color: "#211951" }
            : theme == "bg_color_2" || theme == "bg_image_1"
            ? { color: "#a05e3c" }
            : theme == "bg_color_3"
            ? { color: "#01661c" }
            : theme == "bg_color_4"
            ? { color: "#003e8f" }
            : theme == "bg_animation_1" || theme == "bg_animation_2"
            ? { color: "#fff" }
            : theme == "bg_animation_3"
            ? { color: "#d9dbfc" }
            : {}
        }>
        {item.title}
      </h2>
      <Swiper
        className={`${styles.swiper}`}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={1.1}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}>
        {item.blocks.map((b) => (
          <SwiperSlide
            className={`${styles.slide}  ${styles[item.animation]}`}
            style={
              theme == "bg_color_1"
                ? { backgroundColor: "#836FFF", color: "#fff" }
                : theme == "bg_color_2" || theme == "bg_image_1"
                ? { backgroundColor: "#ff6200", color: "#fff" }
                : theme == "bg_color_3"
                ? { backgroundColor: "#2ac27c", color: "#fff" }
                : theme == "bg_color_4"
                ? { backgroundColor: "#0096fa", color: "#fff" }
                : theme == "bg_animation_1"
                ? {
                    background:
                      "linear-gradient(to  bottom left , #6a3991 , #442061)",
                    color: "#fff",
                    border: "1px solid #3a0669",
                  }
                : theme == "bg_animation_2"
                ? {
                    backgroundColor: "#bde2ff",
                    color: "#014882",
                    border: "1px solid #03579c",
                  }
                : theme == "bg_animation_3"
                ? {
                    background:
                      "linear-gradient(to  bottom left , #d2d4fc , #868cfc)",
                    color: "#000",
                    border: "1px solid #03579c",
                  }
                : {}
            }>
            <Image width={200} height={200} src={b.imageUrl} />
            <button
              style={
                theme == "bg_color_1"
                  ? { backgroundColor: "#836FFF", color: "#fff" }
                  : theme == "bg_color_2" || theme == "bg_image_1"
                  ? { backgroundColor: "#ff6200", color: "#fff" }
                  : theme == "bg_color_3"
                  ? { backgroundColor: "#2ac27c", color: "#fff" }
                  : theme == "bg_color_4"
                  ? { backgroundColor: "#0096fa", color: "#fff" }
                  : theme == "bg_animation_1"
                  ? {
                      background:
                        "linear-gradient(to  bottom left , #6a3991 , #442061)",
                      color: "#fff",
                      border: "1px solid #3a0669",
                    }
                  : theme == "bg_animation_2"
                  ? {
                      backgroundColor: "#bde2ff",
                      color: "#014882",
                      border: "1px solid #03579c",
                    }
                  : {}
              }>
              <a href={b.link}>{b.text}</a>
            </button>
            <p>{b.title}</p>
            <p>{b.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
