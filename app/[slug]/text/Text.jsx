import React from "react";
import styles from "./text.module.css";

const Text = ({ item, theme }) => {
  return (
    <section className={styles.text} style={{ textAlign: "center" }}>
      {item.blocks.map((b) => (
        <p
          className={
            styles.size3
            // item.size == "1"
            //   ? styles.size1
            //   : item.size == "2"
            //   ? styles.size2
            //   : item.size == "3"
            //   ? styles.size3
            //   : item.size == "4"
            //   ? styles.size4
            //   : item.size == "5"
            //   ? styles.size5
            //   : item.size == "6"
            //   ? styles.size6
            //   : ""
          }
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
          {b.text}
        </p>
      ))}
    </section>
  );
};

export default Text;
