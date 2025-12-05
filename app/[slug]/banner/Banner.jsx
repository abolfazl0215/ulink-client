import Image from "next/image";
import React from "react";
import styles from "./banner.module.css";

const Banner = ({ item }) => {
  return (
    <section>
      <div className={`${styles.banner} ${styles[item.animation]}`}>
        <a style={{ display: "block" }} href={item.link}>
          <Image
            style={{ width: "100%" }}
            width={400}
            height={400}
            src={item.imageUrl}
          />
        </a>
      </div>
    </section>
  );
};

export default Banner;
