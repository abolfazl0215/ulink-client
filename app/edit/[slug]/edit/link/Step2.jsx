"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./step2.module.css";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import { v4 as uuidv4 } from "uuid";

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
  const [title, setTitle] = useState("Useful Links");
  const [isSubmit, setIsSubmit] = useState(false);
  const [animation, setAnimation] = useState("");
  const [loading, setLoading] = useState(false);

  const containerRef = useRef();

  useEffect(() => {
    if (!showSelectSection) {
      const obj = {};
      obj[selectedMessenger[0].id] = true;
      setShowSelectSection(obj);
    }
  }, []);

  const detectLeftButton = (e) => {
    e = e || window.event;
    if ("buttons" in e) return e.buttons === 1;
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
      dragItem.style.transform = `translate(${posX}px, ${posY}px)`;

      const dragBoundingRect = dragItem.getBoundingClientRect();
      const pageHeight = window.innerHeight;

      if (dragBoundingRect.top + 100 < pageHeight / 10)
        containerRef.current.scrollBy(0, -10);
      if (dragBoundingRect.top + 100 > pageHeight)
        containerRef.current.scrollBy(0, 10);

      notDragItems.forEach((item) => {
        const rect1 = dragItem.getBoundingClientRect();
        const rect2 = item.getBoundingClientRect();
        const isOverlapping =
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
      document.onpointerup = null;
      document.onpointermove = null;
      container.removeChild(div);
      setIsDragging(undefined);
      dragItem.style = "";
      items.forEach((item) => (item.style = ""));
      setSelectedMessenger(newData);
    }
  };

  const handleDelete = (id) => {
    const filtered = selectedMessenger.filter((f) => f.id !== id);
    setSelectedMessenger(filtered);
  };

  const setTextHandler = (e, id) => {
    const copy = [...selectedMessenger];
    const item = copy.find((f) => f.id === id);
    if (item) item.text = e.target.value;
    setSelectedMessenger(copy);
  };

  const setLinkHandler = (e, id) => {
    const copy = [...selectedMessenger];
    const item = copy.find((f) => f.id === id);
    if (item) item.link = e.target.value;
    setSelectedMessenger(copy);
  };

  const handleSubmit = async () => {
    const incomplete = selectedMessenger.filter(
      (f) => !f.text || !f.link,
    );
    if (incomplete.length || !title) {
      return toast.error("Please fill in all required fields");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://ulink-back-431g.onrender.com/addMessenger",
        {
          address,
          type: "link",
          title,
          animation,
          uniqueId: uuidv4(),
          blocks: selectedMessenger,
        },
      );
      setUpdate((prev) => prev + 1);
      toast.success("Operation successful");
      setSection("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.step2} style={{ top: "2vh" }}>
      <div className={styles.header}>
        <Image width={16} height={16} src="/icons/zarbdar.svg" />
        <p>{title}</p>
        <Image
          onClick={() => setSection("")}
          width={16}
          height={16}
          src="/icons/zarbdar.svg"
        />
      </div>

      <button
        onClick={() => {
          const copy = [...selectedMessenger];
          copy.push({
            faName: "Link",
            id: Math.floor(Math.random() * 10000),
          });
          setSelectedMessenger(copy);
          toast.success("New item added");
        }}
        className={styles.addItemBlock}>
        Add Item +
      </button>

      <div className={styles.setTitle}>
        <label>Block Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {!title && isSubmit && (
          <p className={styles.errorText}>
            Please enter a block title
          </p>
        )}
      </div>

      <form className={styles.form} ref={containerRef}>
        {selectedMessenger.map((d, index) => (
          <div
            key={d.id}
            className={
              (!d.text || !d.link) && isSubmit
                ? `${styles.formBlock} ${styles.redBorder}`
                : styles.formBlock
            }>
            <div
              dir="rtl"
              onClick={() =>
                setShowSelectSection(
                  showSelectSection?.[d.id] ? {} : { [d.id]: true },
                )
              }
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
              {index !== 0 && (
                <Image
                  width={16}
                  height={16}
                  src="/icons/redTrash.svg"
                  onClick={() => handleDelete(d.id)}
                />
              )}
            </div>

            {showSelectSection?.[d.id] && (
              <div className={styles.formBlockBody}>
                <label>Item Title ({d.faName}):</label>
                <input
                  type="text"
                  value={d.text || ""}
                  onChange={(e) => setTextHandler(e, d.id)}
                />
                {!d.text && isSubmit && (
                  <span className={styles.errorText}>
                    Please enter a title for this item
                  </span>
                )}
                <p>Enter a title for this item.</p>

                <label>Item Link:</label>
                <input
                  type="url"
                  value={d.link || ""}
                  onChange={(e) => setLinkHandler(e, d.id)}
                />
                {!d.link && isSubmit && (
                  <span className={styles.errorText}>
                    Please enter a link for this item
                  </span>
                )}
                <p>Enter the URL for {d.faName}.</p>
              </div>
            )}
          </div>
        ))}

        <div className={styles.animations}>
          <p>Animation</p>
          <div
            style={
              animation === "" ? { border: "3px solid #ffbb00" } : {}
            }
            onClick={() => setAnimation("")}>
            No Animation
          </div>
          <div
            style={
              animation === "blinking_element"
                ? { border: "3px solid #ffbb00" }
                : {}
            }
            onClick={() => setAnimation("blinking_element")}
            className={styles.blinking_element}>
            1
          </div>
          <div
            style={
              animation === "shake"
                ? { border: "3px solid #ffbb00" }
                : {}
            }
            onClick={() => setAnimation("shake")}>
            2
          </div>
          <div
            style={
              animation === "rotate"
                ? { border: "3px solid #ffbb00" }
                : {}
            }
            onClick={() => setAnimation("rotate")}>
            3
          </div>
          <div
            style={
              animation === "shakeX"
                ? { border: "3px solid #ffbb00" }
                : {}
            }
            onClick={() => setAnimation("shakeX")}>
            4
          </div>
          <div
            style={
              animation === "shakeY"
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
              cssOverride={{ display: "block", borderColor: "red" }}
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
