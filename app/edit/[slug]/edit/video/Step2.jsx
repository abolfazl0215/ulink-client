"use client";
import React, { useEffect } from "react";
import styles from "./step2.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import BeatLoader from "react-spinners/BeatLoader";

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
  const [videoUrl, setVideoUrl] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!showSelectSection) {
      const obj = {};
      obj[selectedMessenger[0].id] = true;
      setShowSelectSection(obj);
    }
  }, []);

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
    console.log(dragData);
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
          console.log(newData);
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
    const filteredSelectedMessenger = copyselectedMessenger.filter(
      (f) => f.id != id,
    );
    setSelectedMessenger(filteredSelectedMessenger);
  };

  const handleSubmit = async () => {
    if (!videoUrl) {
      return toast.error("Please fill in the required fields");
    } else {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://http://localhost:3001/addMessenger",
          {
            address,
            type: "video",
            videoUrl,
            uniqueId: uuidv4(),
            blocks: [],
          },
        );
        console.log(res.data);
        setUpdate((prev) => prev + 1);
        toast.success("Operation successful");
        setLoading(false);
        setSection("");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.step2} style={{ top: "2vh" }}>
      <div className={styles.header}>
        <Image width={16} height={16} src="/icons/zarbdar.svg" />
        <p>Video</p>
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
              !videoUrl && isSubmit
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
                    !videoUrl && isSubmit ? styles.redBgc : ""
                  }
                  onPointerDown={(e) => {
                    // window.innerWidth < 640
                    //   ?
                    dragStart(e, index);
                    // : console.log("");
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
                <label>Video link (Aparat or YouTube):</label>
                <input
                  type="text"
                  onChange={(e) => setVideoUrl(e.target.value)}
                  value={d.text}
                />
                {!videoUrl && isSubmit ? (
                  <span className={styles.errorText}>
                    This field is required
                  </span>
                ) : (
                  ""
                )}
                <p>Only Aparat and YouTube links are accepted</p>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
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
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => {
              setIsSubmit(true);
              handleSubmit();
            }}>
            <BeatLoader
              color={"#fff"}
              loading={true}
              cssOverride={{
                display: "block",

                borderColor: "red",
              }}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Step2;
