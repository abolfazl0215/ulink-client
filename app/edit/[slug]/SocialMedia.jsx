"use client";

import { useContext, useState } from "react";
import Image from "next/image";

import styles from "./socailmedia.module.css";
import { EditContext } from "./selectEdit/EditContext";

const SocialMedia = ({ item, theme }) => {
  const editContext = useContext(EditContext);
  return (
    <div>
      <div
        className={styles.social2column}
        onClick={() =>
          editContext.sectionEditHandler("socialMedia", item)
        }>
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
                    background:
                      "linear-gradient(to  bottom left , #d2d4fc , #868cfc)",
                    color: "#000",
                    border: "1px solid #03579c",
                  }
                : b.social == "telegram"
                ? {
                    backgroundColor: "#e1eff6",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "instagram"
                ? {
                    backgroundColor: "#ede2f2",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "youtube"
                ? {
                    backgroundColor: "#f7dedf",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "aparat"
                ? {
                    backgroundColor: "#f5e0e8",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "twitter"
                ? {
                    backgroundColor: "#e0eef7",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "linkedin"
                ? {
                    backgroundColor: "#dee8f3",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "facebook"
                ? {
                    backgroundColor: "#e0ebf6",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "clubhouse"
                ? {
                    backgroundColor: "#f7f5e7",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "twitch"
                ? {
                    backgroundColor: "#ece5f9",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "patreon"
                ? {
                    backgroundColor: "#dddedf",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "pinterest"
                ? {
                    backgroundColor: "#f2e1e3",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "tiktok"
                ? {
                    backgroundColor: "#dddedf",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "rubika"
                ? {
                    backgroundColor: "#dddedf",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "anker"
                ? {
                    backgroundColor: "#e5def2",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "applemusic"
                ? {
                    backgroundColor: "#f7e2ea",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "breaker"
                ? {
                    backgroundColor: "#e0e4f0",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "castbox"
                ? {
                    backgroundColor: "#f7e7e3",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "googlepodcast"
                ? {
                    backgroundColor: "#dddedf",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "itunes"
                ? {
                    backgroundColor: "#f1e5f8",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "applepodcast"
                ? {
                    backgroundColor: "#f1e5f8",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "overcast"
                ? {
                    backgroundColor: "#f7eae4",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "pocketcasts"
                ? {
                    backgroundColor: "#f6e4e5",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "podbean"
                ? {
                    backgroundColor: "#ebf2e6",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "radiopublic"
                ? {
                    backgroundColor: "#f2e2e3",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "soundcloud"
                ? {
                    backgroundColor: "#f6e6e1",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "spotify"
                ? {
                    backgroundColor: "#e2f1e8",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "stitcher"
                ? {
                    backgroundColor: "#dddedf",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "bazar"
                ? {
                    backgroundColor: "#deeee7",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "googleplay"
                ? {
                    backgroundColor: "#dddedf",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "applestore"
                ? {
                    backgroundColor: "#dfe7f7",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "micet"
                ? {
                    backgroundColor: "#ddedf7",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "iapps"
                ? {
                    backgroundColor: "#dee9f6",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "sibapp"
                ? {
                    backgroundColor: "#dfe7f7",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "dribble"
                ? {
                    backgroundColor: "#f4e6ed",
                    border: "1px solid #bcbcbc",
                  }
                : b.social == "behance"
                ? {
                    backgroundColor: "#e0e9f9",
                    border: "1px solid #bcbcbc",
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

export default SocialMedia;
