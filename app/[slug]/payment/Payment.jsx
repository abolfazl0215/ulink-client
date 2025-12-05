import Image from "next/image";
import React from "react";
import styles from "./payment.module.css";

const Payment = ({ item, theme }) => {
  return (
    <section className={styles.payment}>
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
      {item.blocks.map((b) => (
        <a
          className={styles[item.animation]}
          href={b.link}
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
          <span>{b.text}</span>
          <Image
            width={16}
            height={16}
            src="/icons/arrowLeftBlack.svg"
          />
        </a>
      ))}
    </section>
  );
};

export default Payment;
