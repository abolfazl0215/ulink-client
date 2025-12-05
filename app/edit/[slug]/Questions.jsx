"use client";
import { useContext, useState } from "react";
import styles from "./question.module.css";
import Image from "next/image";
import { EditContext } from "./selectEdit/EditContext";

export default function Questions({ item, theme }) {
  const [isActive, setIsActive] = useState({});

  const editContext = useContext(EditContext);

  const handleAccordion = (id) => {
    const copyied = { ...isActive };
    if (copyied[id]) {
      copyied[id] = false;
      setIsActive(copyied);
    } else {
      copyied[id] = true;
      setIsActive(copyied);
    }
  };

  return (
    <div
      className={styles.question}
      onClick={() =>
        editContext.sectionEditHandler("question", item)
      }>
      {item.blocks.map((b) => (
        <div
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
          className={styles.accordion}>
          <div
            className={styles[item.animation]}
            onClick={() => handleAccordion(b._id)}>
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
              {b.question}
            </p>

            {isActive[b._id] ? <span>-</span> : <span>+</span>}
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
            }
            className={isActive[b._id] ? styles.show : styles.hide}>
            {b.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
