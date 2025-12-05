import React, { useContext } from "react";
import styles from "./text.module.css";
import { EditContext } from "./selectEdit/EditContext";

const Text = ({ item, theme }) => {
  const editContext = useContext(EditContext);
  return (
    <section
      className={styles.text}
      style={{ textAlign: "center" }}
      onClick={() => editContext.sectionEditHandler("text", item)}>
      {item.blocks &&
        item.blocks[0] &&
        item.blocks.map((i) => (
          <p
          className="break-words whitespace-normal"
            style={
              theme == "bg_color_1"
                ? { color: "#211951" }
                : theme == "bg_color_2" || theme == "bg_image_1"
                ? { color: "#a05e3c" }
                : theme == "bg_color_3"
                ? { color: "#01661c" }
                : theme == "bg_color_4"
                ? { color: "#003e8f" }
                : theme == "bg_animation_1" ||
                  theme == "bg_animation_2"
                ? { color: "#fff" }
                : theme == "bg_animation_3"
                ? { color: "#d9dbfc" }
                : {}
            }>
            {i.text}
          </p>
        ))}
    </section>
  );
};

export default Text;
