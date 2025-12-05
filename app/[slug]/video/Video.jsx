import React from "react";
import styles from "./video.module.css";

const Video = ({ item, theme }) => {
  const videourl = item.videoUrl.split("/");
  const isAparat = videourl.includes("www.aparat.com");
  let getUrl = videourl[videourl.length - 1];
  getUrl = getUrl.split("?")[0];

  const isYoutube =
    videourl.includes("www.youtube.com") ||
    videourl.includes("youtu.be");

  let getUrlYoutube;

  if (videourl[3] && videourl[3].includes("watch")) {
    getUrlYoutube = videourl[3].split("=")[1];
  }
  if (videourl[2] && videourl[2].includes("youtu.be")) {
    getUrlYoutube = videourl[3].split("?")[0];
  }
  if (videourl[3] && videourl[3].includes("embed")) {
    getUrlYoutube = videourl[4].split("?")[0];
  }

  console.log("videourl : ", isYoutube);
  return (
    <section className={styles.video}>
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
            : theme == "bg_animation_1"
            ? { color: "#fff" }
            : {}
        }>
        {item.title}
      </h2>
      {isAparat ? (
        <iframe
          src={
            isAparat
              ? `https://www.aparat.com/video/video/embed/videohash/${getUrl}/vt/frame`
              : item.videoUrl
          }
          allowFullScreen="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"></iframe>
      ) : isYoutube ? (
        <iframe
          src={`https://www.youtube.com/embed/${getUrlYoutube}?si=4dMEASoYCA4kpaHu`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      ) : (
        ""
      )}
    </section>
  );
};

export default Video;
