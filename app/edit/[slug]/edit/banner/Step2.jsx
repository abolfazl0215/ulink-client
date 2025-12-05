"use client";
import React, { useEffect } from "react";
import styles from "./step2.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";

const Step2 = ({
  setStep,
  step,
  setSection,
  selectedMessenger,
  setSelectedMessenger,
  address,
  setUpdate,
}) => {
  const [isDragging, setIsDragging] = useState();

  const [showSelectSection, setShowSelectSection] = useState();
  const [title, setTitle] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [link, setLink] = useState("");
  const [animation, setAnimation] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    if (!showSelectSection) {
      const obj = {};
      obj[selectedMessenger[0].id] = true;
      setShowSelectSection(obj);
    }
  }, []);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const containerRef = useRef();

  const detectLeftButton = (e) => {
    e = e || window.event;
    if ("buttons" in e) {
      return e.buttons === 1;
    }
    let button = e.which || e.button;
    return button === 1;
  };

  const dragStart = (e, index) => {
    if (!detectLeftButton()) return;
    setIsDragging(index);

    const container = containerRef.current;
    const items = [...container.childNodes];
    const dragItem = items[index];
    const itemsBelowDragItem = items.slice(index + 1);
    const notDragItems = items.filter((_, i) => i !== index);
    const dragData = selectedMessenger[index];
    let newData = [...selectedMessenger];

    const dragBoundingRect = dragItem.getBoundingClientRect();

    const space =
      items[1].getBoundingClientRect().top -
      items[0].getBoundingClientRect().bottom;

    dragItem.style.position = "fixed";
    dragItem.style.zIndex = 5000;
    dragItem.style.width = dragBoundingRect.width + "px";
    dragItem.style.height = dragBoundingRect.height + "px";
    dragItem.style.top = dragBoundingRect.top + "px";
    dragItem.style.left = dragBoundingRect.left + "px";
    dragItem.style.cursor = "grabbing";

    const div = document.createElement("div");
    div.id = "div-temp";
    div.style.width = dragBoundingRect.width + "px";
    div.style.height = dragBoundingRect.height + "px";
    div.style.pointerEvents = "none";
    container.appendChild(div);

    const distance = dragBoundingRect.height + space;

    itemsBelowDragItem.forEach((item) => {
      item.style.transform = `translateY(${distance}px)`;
    });

    let x = e.clientX;
    let y = e.clientY;

    document.onpointermove = dragMove;

    function dragMove(e) {
      const posX = e.clientX - x;
      const posY = e.clientY - y;

      dragItem.style.transform = `translate(${posX}px , ${posY}px)`;

      const dragBoundingRect = dragItem.getBoundingClientRect();
      const pageHeight = window.innerHeight;

      if (dragBoundingRect.top + 100 < pageHeight / 10) {
        containerRef.current.scrollBy(0, -10);
      }

      if (dragBoundingRect.top + 100 > pageHeight) {
        containerRef.current.scrollBy(0, 10);
      }

      notDragItems.forEach((item) => {
        const rect1 = dragItem.getBoundingClientRect();
        const rect2 = item.getBoundingClientRect();

        let isOverlapping =
          rect1.y < rect2.y + rect2.height / 2 &&
          rect1.y + rect1.height / 2 > rect2.y;

        if (isOverlapping) {
          if (item.getAttribute("style")) {
            item.style.transform = "";
            index++;
          } else {
            item.style.transform = `translateY(${distance}px)`;
            index--;
          }

          newData = selectedMessenger.filter(
            (item) => item.id !== dragData.id,
          );
          newData.splice(index, 0, dragData);
        }
      });
    }

    document.onpointerup = dragEnd;
    function dragEnd() {
      document.onpointerup = "";
      document.onpointermove = "";
      container.removeChild(div);
      setIsDragging(undefined);
      dragItem.style = "";

      items.forEach((item) => (item.style = ""));
      setSelectedMessenger(newData);
    }
  };

  const handleDelete = (id) => {
    const copyselectedMessenger = [...selectedMessenger];
    const filtered = copyselectedMessenger.filter((f) => f.id != id);
    setSelectedMessenger(filtered);
  };

  const handleSubmit = async () => {
    if (!image || !link) {
      return toast.error("Please enter the required fields");
    }

    // const options = {
    //   maxSizeMB: 1,
    //   maxWidthOrHeight: 500,
    //   useWebWorker: true,
    // };

    // const compressedFile = await imageCompression(image, options);
    // const base64 = await imageCompression.getDataUrlFromFile(
    //   compressedFile,
    // );

    try {
      const formData = new FormData();
      formData.append("image", image);

      setLoading(true);
      const response = await axios.post(
        "https://ulinkkk.liara.run/upload2",
        formData,
      );
      try {
        const res = await axios.post(
          "https://ulinkkk.liara.run/addMessenger",
          {
            address,
            type: "banner",
            animation,
            imageUrl: `${response.data.link}`,
            link,
            uniqueId: uuidv4(),
            blocks: [],
          },
        );
        setUpdate((prev) => prev + 1);
        setLoading(false);
        setSection("");
        toast.success("Operation successful");
      } catch (error) {
        toast.error("An error occurred");
        setLoading(false);
        console.log(error);
      }
    } catch (error) {
      toast.error("Error saving the image");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={styles.step2} style={{ top: "2vh" }}>
      <div className={styles.header}>
        <Image width={16} height={16} src="/icons/zarbdar.svg" />
        <p>Banner</p>

        <Image
          onClick={() => setSection("")}
          width={16}
          height={16}
          src="/icons/zarbdar.svg"
        />
      </div>

      <form className={styles.form} ref={containerRef}>
        {selectedMessenger.map((d, index) => (
          <div
            className={
              (!link || !image) && isSubmit
                ? `${styles.formBlock} ${styles.redBorder}`
                : styles.formBlock
            }
            key={d.id}>
            <div
              dir="rtl"
              onClick={() => {
                if (showSelectSection[d.id]) {
                  setShowSelectSection({});
                } else {
                  let obj = {};
                  obj[d.id] = true;
                  setShowSelectSection(obj);
                }
              }}
              className={styles.formBlockHeader}>
              <div>
                <div
                  className={
                    (!link || !image) && isSubmit ? styles.redBgc : ""
                  }
                  onPointerDown={(e) => {
                    // window.innerWidth < 640
                    //   ?
                    dragStart(e, index);
                    // : null;
                  }}>
                  <Image
                    width={16}
                    height={16}
                    src="/icons/dragWhite.svg"
                    style={{ userSelect: "none", cursor: "pointer" }}
                    draggable="false"
                  />
                </div>
                <p>{d.faName}</p>
              </div>
              {index === 0 ? (
                ""
              ) : (
                <Image
                  width={16}
                  height={16}
                  src="/icons/redTrash.svg"
                  onClick={() => handleDelete(d.id)}
                />
              )}
            </div>

            {showSelectSection && showSelectSection[d.id] ? (
              <div className={styles.formBlockBody}>
                <label>Banner link:</label>
                <input
                  type="text"
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                  placeholder="Enter your banner link..."
                />
                {!link && isSubmit ? (
                  <span className={styles.errorText}>
                    Please enter your banner link
                  </span>
                ) : (
                  ""
                )}

                <label htmlFor="imgInput" className={styles.imgLabel}>
                  Banner image
                </label>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current.click();
                  }}
                  className={styles.button}>
                  {preview ? (
                    <Image width={200} height={200} src={preview} />
                  ) : (
                    "Upload an image for the banner (click)"
                  )}
                </button>
                {!image && isSubmit ? (
                  <p className={styles.errorText}>
                    This field is required
                  </p>
                ) : (
                  ""
                )}
                <input
                  id="imgInput"
                  type="file"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  accept="image/*"
                  name="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (
                      file &&
                      file.type.substring(0, 5) == "image"
                    ) {
                      setImage(file);
                    } else {
                      setImage(null);
                    }
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        ))}

        <div className={styles.animations}>
          <p>Animation</p>
          <div
            style={
              animation == "" ? { border: "3px solid #ffbb00" } : {}
            }
            onClick={() => setAnimation("")}>
            No Animation
          </div>
          <div
            style={
              animation == "blinking_element"
                ? { border: "3px solid #ffbb00" }
                : {}
            }
            onClick={() => setAnimation("blinking_element")}
            className={styles.blinking_element}>
            1
          </div>
          <div
            style={
              animation == "shake"
                ? { border: "3px solid #ffbb00" }
                : {}
            }
            onClick={() => setAnimation("shake")}>
            2
          </div>
          <div
            style={
              animation == "rotate"
                ? { border: "3px solid #ffbb00" }
                : {}
            }
            onClick={() => setAnimation("rotate")}>
            3
          </div>
          <div
            style={
              animation == "shakeX"
                ? { border: "3px solid #ffbb00" }
                : {}
            }
            onClick={() => setAnimation("shakeX")}>
            4
          </div>
          <div
            style={
              animation == "shakeY"
                ? { border: "3px solid #ffbb00" }
                : {}
            }
            onClick={() => setAnimation("shakeY")}>
            5
          </div>
        </div>
      </form>

      <div className={styles.buttonContainer}>
        <button onClick={() => setSection("")}>Cancel</button>
        {!loading ? (
          <button
            type="submit"
            onClick={() => {
              setIsSubmit(true);
              handleSubmit();
            }}>
            Save
          </button>
        ) : (
          <button
            type="submit"
            style={{ display: "flex", alignItems: "center" }}>
            <BeatLoader color={"#fff"} loading={true} size={10} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Step2;
