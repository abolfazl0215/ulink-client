"use client";
import React, { useEffect } from "react";
import styles from "./step2.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";

import toast from "react-hot-toast";
import { MessengerContext } from "./messengerContext";
import { useContext } from "react";
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
  const [title, setTitle] = useState("Social Media");
  const [isSubmit, setIsSubmit] = useState(false);
  const [animation, setAnimation] = useState("");

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
    const filteredSelectedMessenger = selectedMessenger.filter(
      (f) => f.id != id,
    );
    setSelectedMessenger(filteredSelectedMessenger);
  };

  const setTextHandler = (e, id) => {
    const selectedMessengerCopy = [...selectedMessenger];
    const filtered = selectedMessengerCopy.filter((f) => f.id === id);
    filtered[0].text = e.target.value;
    setSelectedMessenger(selectedMessengerCopy);
  };

  const setLinkHandler = (e, id) => {
    const selectedMessengerCopy = [...selectedMessenger];
    const filtered = selectedMessengerCopy.filter((f) => f.id === id);
    filtered[0].link = e.target.value;
    setSelectedMessenger(selectedMessengerCopy);
  };

  const handleSubmit = async () => {
    const filteredData = selectedMessenger.filter(
      (f) => !f.text || !f.link,
    );
    if (filteredData[0] || !title) {
      return toast.error("Please fill in the required fields.");
    } else {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://ulinkkk.liara.run/addMessenger",
          {
            address,
            type: "socialmedia",
            title,
            animation,
            uniqueId: uuidv4(),
            blocks: selectedMessenger,
          },
        );
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
    <div
      className={styles.step2}
      style={step == 2 ? { top: "2vh" } : {}}>
      <div className={styles.header}>
        <Image width={16} height={16} src="/icons/zarbdar.svg" />
        <p>Social Media</p>
        <Image
          onClick={() => setSection("")}
          width={16}
          height={16}
          src="/icons/zarbdar.svg"
        />
      </div>

      <button
        onClick={() => setStep(1)}
        className={styles.addItemBlock}>
        Add an item to this section +
      </button>

      <div className={styles.setTitle}>
        <label>Block Title:</label>

        <input
          type="text"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {!title && isSubmit ? (
          <p className={styles.errorText}>
            Please enter a title for this block.
          </p>
        ) : (
          ""
        )}
      </div>

      <form className={styles.form} ref={containerRef}>
        {selectedMessenger.map((d, index) => (
          <div
            className={
              (!d.text || !d.link) && isSubmit
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
                    (!d.text || !d.link) && isSubmit
                      ? styles.redBgc
                      : ""
                  }
                  onPointerDown={(e) => dragStart(e, index)}>
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
                <label>Item Title {d.faName}</label>
                <input
                  type="text"
                  onChange={(e) => setTextHandler(e, d.id)}
                  value={d.text}
                />
                {!d.text && isSubmit ? (
                  <span className={styles.errorText}>
                    Please enter a title for this item.
                  </span>
                ) : (
                  ""
                )}
                <p>Choose a title for this item.</p>

                <label>Your {d.faName} Link</label>
                <input
                  type="url"
                  onChange={(e) => setLinkHandler(e, d.id)}
                  value={d.link}
                />
                {!d.link && isSubmit ? (
                  <span className={styles.errorText}>
                    Please enter the link for this item.
                  </span>
                ) : (
                  ""
                )}
                <p>
                  Enter your full {d.faName} link. Make sure it is the
                  complete link and not just an ID or phone number.
                </p>
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
