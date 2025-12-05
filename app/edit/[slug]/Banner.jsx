import Image from "next/image";
import React, { useContext } from "react";
import styles from "./banner.module.css";
import { EditContext } from "./selectEdit/EditContext";

const Banner = ({ item }) => {
  const editContext = useContext(EditContext);
  return (
    <section
    className={`${styles.banner} ${styles[item.animation]}`}
      onClick={() => editContext.sectionEditHandler("banner", item)}>
      <h2>{item.text}</h2>
      <div style={{ display: "block" }}>
        <Image
          style={{ width: "100%" }}
          width={400}
          height={400}
          src={item.imageUrl}
          draggable="false"
        />
      </div>
    </section>
  );
};

export default Banner;
