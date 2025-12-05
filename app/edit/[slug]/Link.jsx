import Image from "next/image";
import React, { useContext } from "react";
import styles from "./link.module.css";
import { EditContext } from "./selectEdit/EditContext";

const Link = ({ item, theme }) => {
  const editContext = useContext(EditContext);
  return (
    <section
      className={styles.link}
      onClick={() => editContext.sectionEditHandler("link", item)}>
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
        <div
          className={styles[item.animation]}
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
          <p>{b.text}</p>
          <Image width={30} height={30} src="/icons/link.svg" />
        </div>
      ))}
    </section>
  );
};

export default Link;
