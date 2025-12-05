"use client";
import Image from "next/image";
import styles from "./line.module.css";

const Line = ({ item, theme }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      className={
        +item.space === 4
          ? styles.space4
          : +item.space === 3
          ? styles.space3
          : +item.space === 2
          ? styles.space2
          : +item.space === 1
          ? styles.space1
          : styles.space2
      }>
      <Image
        src={item.line}
        className="line"
        width={300}
        height={20}
        draggable="false"
      />
    </div>
  );
};

export default Line;
