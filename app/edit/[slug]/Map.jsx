import React, { useContext } from "react";
import styles from "./map.module.css";
import { EditContext } from "./selectEdit/EditContext";

const Map = ({ item, theme }) => {
  const editContext = useContext(EditContext);
  return (
    <section
      className={styles.map}
      onClick={() => editContext.sectionEditHandler("map", item)}>
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
      {item.blocks.map((i) => (
        <>
          {i.type == "neshan" ? (
            <p
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
                  : {
                      background:
                        "linear-gradient(to top right, #c97201, #fa9c21)",
                    }
              }>
              نشان
            </p>
          ) : i.type == "balad" ? (
            <p
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
                  : {
                      background:
                        "linear-gradient(to top right, #c97201, #fa9c21)",
                    }
              }>
              بلد
            </p>
          ) : i.type == "waze" ? (
            <p
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
                  : {
                      background:
                        "linear-gradient(to top right, #c97201, #fa9c21)",
                    }
              }>
              ویز
            </p>
          ) : i.type == "googleMap" ? (
            <p
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
                  : {
                      background:
                        "linear-gradient(to top right, #c97201, #fa9c21)",
                    }
              }>
              گوگل مپ
            </p>
          ) : (
            ""
          )}
        </>
      ))}
    </section>
  );
};

export default Map;
