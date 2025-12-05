import React from "react";
import styles from "./call.module.css";
import Image from "next/image";


const Call = ({ item, theme }) => {
  return (
    <div className={`${styles.call}`}>
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
          href={
            b.type == "phoneNumber" || b.type == "tell"
              ? `tel:${b.link}`
              : b.type == "email"
              ? `mailto:${b.link}`
              : b.type == "sms"
              ? `sms:${b.link}`
              : ""
          }
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
          }
          className={`${styles.block} ${styles[item.animation]}`}>
          <div>
            <Image
              src={b.imageUrl}
              width={30}
              height={30}
              style={
                theme == "bg_color_1"
                  ? {
                      boxShadow: "0 0 5px #fff ",
                      borderRadius: "5px",
                    }
                  : {}
              }
            />
            <p
              style={
                theme == "bg_color_1"
                  ? { color: "#fff" }
                  : theme == "bg_color_2" || theme == "bg_image_1"
                  ? { color: "#fff" }
                  : theme == "bg_color_3"
                  ? { color: "#fff" }
                  : theme == "bg_color_4"
                  ? { color: "#fff" }
                  : theme == "bg_animation_1"
                  ? { color: "#fff" }
                  : {}
              }>
              {b.text}
            </p>
          </div>
          <p
            style={
              theme == "bg_color_1"
                ? { color: "#fff" }
                : theme == "bg_color_2" || theme == "bg_image_1"
                ? { color: "#fff" }
                : theme == "bg_color_3"
                ? { color: "#fff" }
                : theme == "bg_color_4"
                ? { color: "#fff" }
                : theme == "bg_animation_1"
                ? { color: "#fff" }
                : {}
            }>
            {b.link}
          </p>
        </a>
      ))}
    </div>
  );
};

export default Call;
