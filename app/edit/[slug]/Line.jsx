"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { EditContext } from "./selectEdit/EditContext";
import styles from "./line.module.css";

const Line = ({ item, update }) => {
  const editContext = useContext(EditContext);

  // استیتی برای نگهداری کلید رفرش
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setRefresh((prev) => prev + 1);
  }, [update]);

  const style2 = `
  .line {
    width: 100%;
    margin: 0 auto;
  }
  .container {
    padding: ${
      +item.space === 4
        ? "6.8vw"
        : +item.space === 3
        ? "5vw"
        : +item.space === 2
        ? "3.3vw"
        : +item.space === 1
        ? "1.7vw"
        : "1.7vw"
    }
      0;
  }
`;

  return (
    <div
      onClick={() => {
        editContext.sectionEditHandler("line", item);
        console.log("itemmm :", item);
      }}
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
      <style jsx>{style2}</style>
    </div>
  );
};

export default Line;
