"use client";

import { useState } from "react";
import Image from "next/image";

import styles from "./messenger.module.css";
import { useContext } from "react";
import { EditContext } from "./selectEdit/EditContext";

const Messenger = ({ item, theme }) => {
  const editContext = useContext(EditContext);
  return (
    <div>
      <div
        className={styles.messenger2column}
        onClick={() => {
          console.log("clicked on messenger");
          editContext.sectionEditHandler("messenger", item);
        }}>
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
            className={`${styles.button} ${styles[item.animation]}`}
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
                    // #6a3991
                    background:
                      "linear-gradient(to  bottom left , #d2d4fc , #868cfc)",
                    color: "#000",
                    border: "1px solid #03579c",
                  }
                : b.social == "whatsapp"
                ? {
                    backgroundColor: "#dfffdb",
                    border: "1px solid #16d900",
                  }
                : b.social == "telegram"
                ? {
                    backgroundColor: "#dee7ff",
                    border: "1px solid #80a2ff",
                  }
                : b.social == "bale"
                ? {
                    backgroundColor: "#d5e0dd",
                    border: "1px solid #4a917c",
                  }
                : b.social == "soroush"
                ? {
                    backgroundColor: "#cce8e3",
                    border: "1px solid #22a38c",
                  }
                : b.social == "discord"
                ? {
                    backgroundColor: "#dcdef2",
                    border: "1px solid #5865f2",
                  }
                : b.social == "skype"
                ? {
                    backgroundColor: "#e0f6ff",
                    border: "1px solid #00aef3",
                  }
                : b.social == "discord"
                ? {
                    backgroundColor: "#dcdef2",
                    border: "1px solid #5865f2",
                  }
                : b.social == "messenger"
                ? {
                    backgroundColor: "#e6edfc",
                    border: "1px solid #0656f7",
                  }
                : b.social == "kik"
                ? {
                    backgroundColor: "#f7ffe6",
                    border: "1px solid #8bb531",
                  }
                : b.social == "viber"
                ? {
                    backgroundColor: "#f6ebff",
                    border: "1px solid #7b519d",
                  }
                : b.social == "line"
                ? {
                    backgroundColor: "#edffe6",
                    border: "1px solid #3ACE01",
                  }
                : b.social == "eitaa"
                ? {
                    backgroundColor: "#f0e5dd",
                    border: "1px solid #EE7F22",
                  }
                : b.social == "gap"
                ? {
                    backgroundColor: "#e6f9ff",
                    border: "1px solid #39AAD0",
                  }
                : { border: "1px solid gray" }
            }>
            <Image width={20} height={20} src={b.imageUrl} />
            <p>{b.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messenger;
