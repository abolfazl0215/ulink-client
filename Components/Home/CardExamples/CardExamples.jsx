"use client";
import React from "react";
import Image from "next/image";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./cardSwiper.css";

import styles from "./cardexamples.module.css";
import { useRef } from "react";
import { useState } from "react";

const CardExamples = () => {
  const swiper = useSwiper();
  const nextButtonRef = useRef();
  const prevButtonRef = useRef();
  const SwiperButtonNext = ({ children }) => {
    const swiper = useSwiper();
    return (
      <button
        ref={nextButtonRef}
        className={styles.nextButton}
        onClick={() => swiper.slideNext()}>
        {children}
      </button>
    );
  };
  const SwiperButtonPrev = ({ children }) => {
    const swiper = useSwiper();
    return (
      <button
        ref={prevButtonRef}
        className={styles.prevButton}
        onClick={() => swiper.slidePrev()}>
        {children}
      </button>
    );
  };
  return (
    <section className={styles.cardExamples}>
      <div className={styles.rightSection}>
        <h2>
          نمونه کارت های طراحی{" "}
          
            <br className={styles.break} />
          
          شده برای مشتریان
        </h2>
        <div className={styles.arrows}>
          <Image
            width={100}
            height={100}
            src="/icons/arrowRightBlack.svg"
            onClick={() => prevButtonRef.current.click()}
          />
          <Image
            width={100}
            height={100}
            src="/icons/arrowLeftBlack.svg"
            onClick={() => nextButtonRef.current.click()}
          />
        </div>
        {/* <p>مشاهده همه نمونه کارها &gt;</p> */}
      </div>
      <div className={styles.leftSection}>
        <Swiper
          className={styles.swiper}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={5}
          slidesPerView={2.2}>
          <SwiperButtonNext></SwiperButtonNext>
          <SwiperButtonPrev></SwiperButtonPrev>
          <SwiperSlide className={styles.slide}>
            <Image
              width={300}
              height={200}
              src="/images/visitCard.png"
            />
            <Image
              width={300}
              height={200}
              src="/images/visitCard.png"
            />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <Image
              width={300}
              height={200}
              src="/images/visitCard.png"
              style={{ objectFit: "cover" }}
            />
            <Image
              style={{ marginTop: ".3vw", objectFit: "cover" }}
              width={300}
              height={200}
              src="/images/visitCard.png"
            />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <Image
              width={300}
              height={200}
              src="/images/visitCard.png"
              style={{ objectFit: "cover" }}
            />
            <Image
              style={{ marginTop: ".3vw", objectFit: "cover" }}
              width={300}
              height={200}
              src="/images/visitCard.png"
            />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <Image
              width={300}
              height={200}
              src="/images/visitCard.png"
              style={{ objectFit: "cover" }}
            />
            <Image
              style={{ marginTop: ".3vw", objectFit: "cover" }}
              width={300}
              height={200}
              src="/images/visitCard.png"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={styles.leftSectionSm}>
        <Swiper
          className={styles.swiper}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={8}
          slidesPerView={1.2}
          pagination={true}>
          <SwiperSlide className={styles.slide}>
            <Image
              width={300}
              height={200}
              src="/images/visitCard.png"
              style={{ objectFit: "cover" }}
            />
            <Image
              style={{
                marginTop: "1vw",
                objectFit: "cover",
              }}
              width={300}
              height={200}
              src="/images/visitCard.png"
            />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <Image
              width={300}
              height={200}
              src="/images/visitCard.png"
              style={{ objectFit: "cover" }}
            />
            <Image
              style={{ marginTop: ".3vw", objectFit: "cover" }}
              width={300}
              height={200}
              src="/images/visitCard.png"
            />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <Image
              width={300}
              height={200}
              src="/images/visitCard.png"
              style={{ objectFit: "cover" }}
            />
            <Image
              style={{ marginTop: ".3vw", objectFit: "cover" }}
              width={300}
              height={200}
              src="/images/visitCard.png"
            />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <Image
              width={300}
              height={200}
              src="/images/visitCard.png"
              style={{ objectFit: "cover" }}
            />
            <Image
              style={{ marginTop: ".3vw", objectFit: "cover" }}
              width={300}
              height={200}
              src="/images/visitCard.png"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default CardExamples;
