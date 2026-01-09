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
  const [title, setTitle] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log("selected messengers :", data);
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
    if (!detectLeftButton()) return; // only use left mouse click
    setIsDragging(index);

    const container = containerRef.current;
    const items = [...container.childNodes];
    const dragItem = items[index];
    const itemsBelowDragItem = items.slice(index + 1);
    const notDragItems = items.filter((_, i) => i !== index);
    const dragData = selectedMessenger[index];
    console.log(dragData);
    let newData = [...selectedMessenger];

    // getBoundingClientRect of dragItem
    const dragBoundingRect = dragItem.getBoundingClientRect();

    // distance between two cards
    const space =
      items[1].getBoundingClientRect().top -
      items[0].getBoundingClientRect().bottom;

    // set style for dragItem when mouse down
    dragItem.style.position = "fixed";
    dragItem.style.zIndex = 5000;
    dragItem.style.width = dragBoundingRect.width + "px";
    dragItem.style.height = dragBoundingRect.height + "px";
    dragItem.style.top = dragBoundingRect.top + "px";
    dragItem.style.left = dragBoundingRect.left + "px";
    dragItem.style.cursor = "grabbing";

    // create placeholder div element when dragItem position is fixed
    const div = document.createElement("div");
    div.id = "div-temp";
    div.style.width = dragBoundingRect.width + "px";
    div.style.height = dragBoundingRect.height + "px";
    div.style.pointerEvents = "none";
    container.appendChild(div);

    // move the elements below dragItem
    const distance = dragBoundingRect.height + space;
    itemsBelowDragItem.forEach((item) => {
      item.style.transform = `translateY(${distance}px)`;
    });

    // get the origin
    let x = e.clientX;
    let y = e.clientY;

    // perform the function on hover
    document.onpointermove = dragMove;

    function dragMove(e) {
      const posX = e.clientX - x;
      const posY = e.clientY - y;

      dragItem.style.transform = `translate(${posX}px , ${posY}px)`;

      const dragBoundingRect = dragItem.getBoundingClientRect();
      const pageHeight = window.innerHeight;

      // if element is dragged to the top of the page
      if (dragBoundingRect.top + 100 < pageHeight / 10) {
        containerRef.current.scrollBy(0, -10); // scroll up
      }

      // if element is dragged to the bottom of the page
      if (dragBoundingRect.top + 100 > pageHeight) {
        containerRef.current.scrollBy(0, 10); // scroll down
      }

      // swap position and data
      notDragItems.forEach((item) => {
        const rect1 = dragItem.getBoundingClientRect();
        const rect2 = item.getBoundingClientRect();

        let isOverlapping =
          rect1.y < rect2.y + rect2.height / 2 &&
          rect1.y + rect1.height / 2 > rect2.y;

        if (isOverlapping) {
          // swap position card
          if (item.getAttribute("style")) {
            item.style.transform = "";
            index++;
          } else {
            item.style.transform = `translateY(${distance}px)`;
            index--;
          }

          // swap Data
          newData = selectedMessenger.filter(
            (item) => item.id !== dragData.id,
          );
          newData.splice(index, 0, dragData);
          console.log(newData);
        }
      });
    }

    // finish onPointerDown event
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

  const setTextHandler = (e, id) => {
    const selectedMessengerCopy = [...selectedMessenger];
    const filteredselectedMessenger = selectedMessengerCopy.filter(
      (f) => f.id === id,
    );
    filteredselectedMessenger[0].text = e.target.value;
    setSelectedMessenger(selectedMessengerCopy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredData = selectedMessenger.filter((f) => !f.text);
    if (filteredData[0]) {
      return toast.error("Please fill in the required fields");
    } else {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://http://localhost:3001/addMessenger",
          {
            address,
            type: "text",
            uniqueId: uuidv4(),
            blocks: selectedMessenger,
          },
        );
        console.log(res.data);
        setUpdate((prev) => prev + 1);
        toast.success("Operation was successful");
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
        <p>Text or Description</p>
        <Image
          onClick={() => setSection("")}
          width={16}
          height={16}
          src="/icons/zarbdar.svg"
        />
      </div>

      <form
        onSubmit={(e) => {
          setIsSubmit(true);
          handleSubmit(e);
        }}
        className={styles.form}
        ref={containerRef}>
        {selectedMessenger.map((d, index) => (
          <div
            className={
              !d.text && isSubmit
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
                  className={!d.text && isSubmit ? styles.redBgc : ""}
                  onPointerDown={(e) => {
                    dragStart(e, index);
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
                <label>{d.faName}</label>
                <input
                  type="text"
                  onChange={(e) => setTextHandler(e, d.id)}
                  value={d.text}
                />
                {!d.text && isSubmit ? (
                  <span className={styles.errorText}>
                    Please write text for this item
                  </span>
                ) : (
                  ""
                )}
                <p>Write a text</p>
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
            onClick={(e) => {
              setIsSubmit(true);
              handleSubmit(e);
            }}>
            Save
          </button>
        ) : (
          <button
            type="submit"
            style={{ display: "flex", alignItems: "center" }}>
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
