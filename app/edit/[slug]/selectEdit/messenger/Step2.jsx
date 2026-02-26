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
import BeatLoader from "react-spinners/BeatLoader";
import { EditContext } from "../EditContext";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Step2 = ({
  setStep,
  step,
  setSection,
  selectedMessenger,
  setSelectedMessenger,
  address,
  setUpdate,
}) => {
  const editContext = useContext(EditContext);
  const [isDragging, setIsDragging] = useState();

  const [showSelectSection, setShowSelectSection] = useState();
  const [title, setTitle] = useState(editContext.item.title);
  const [animation, setAnimation] = useState(
    editContext.item.animation,
  );
  const [isSubmit, setIsSubmit] = useState(false);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

    //getBoundingClientRect of dragItem

    const dragBoundingRect = dragItem.getBoundingClientRect();

    //distance between two cardd
    const space =
      items[1].getBoundingClientRect().top -
      items[0].getBoundingClientRect().bottom;

    //set style for dragItem when mouse down
    dragItem.style.position = "fixed";
    dragItem.style.zIndex = 5000;
    dragItem.style.width = dragBoundingRect.width + "px";
    dragItem.style.height = dragBoundingRect.height + "px";
    dragItem.style.top = dragBoundingRect.top + "px";
    dragItem.style.left = dragBoundingRect.left + "px";
    dragItem.style.cursor = "grabbing";

    //create alternative div element when dragitem position is fixed
    const div = document.createElement("div");
    div.id = "div-temp";
    div.style.width = dragBoundingRect.width + "px";
    div.style.height = dragBoundingRect.height + "px";
    div.style.pointerEvents = "none";
    container.appendChild(div);

    //move the elements below dragItem.
    // distance to be moved.
    const distance = dragBoundingRect.height + space;

    itemsBelowDragItem.forEach((item) => {
      item.style.transform = `translateY(${distance}px)`;
    });

    // get the origin
    let x = e.clientX;
    let y = e.clientY;

    //perform the function on hover
    document.onpointermove = dragMove;

    function dragMove(e) {
      const posX = e.clientX - x;
      const posY = e.clientY - y;

      dragItem.style.transform = `translate(${posX}px , ${posY}px)`;
      // dragItem.style.transition = `all 0s`;

      const dragBoundingRect = dragItem.getBoundingClientRect();
      const pageHeight = window.innerHeight;

      // اگر المان به بالای صفحه کشیده شد
      if (dragBoundingRect.top + 100 < pageHeight / 10) {
        containerRef.current.scrollBy(0, -10); // اسکرول به بالا
      }

      // اگر المان به پایین صفحه کشیده شد2
      if (dragBoundingRect.top + 100 > pageHeight) {
        containerRef.current.scrollBy(0, 10); // اسکرول به پایین
      }

      //swap position and data
      notDragItems.forEach((item) => {
        // item.style.transition = `all .1s`;
        //check two elements is over lapping
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
            (item) => item._id !== dragData._id,
          );
          newData.splice(index, 0, dragData);
          console.log(newData);
        }
      });
    }

    //finish onPointerDown event
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
    // const copyData = [...data];
    const copyselectedMessenger = [...selectedMessenger];
    // const filteredData = copyData.filter((f) => f._id != id);
    const filteredSelectedMessenger = copyselectedMessenger.filter(
      (f) => f._id != id,
    );
    // setData(filteredData);
    setSelectedMessenger(filteredSelectedMessenger);
  };

  const setTextHandler = (e, id) => {
    // const dataCopy = [...data];
    // const filteredData = dataCopy.filter((f) => f._id === id);
    // filteredData[0].text = e.target.value;
    // setData(dataCopy);
    const selectedMessengerCopy = [...selectedMessenger];
    const filteredselectedMessenger = selectedMessengerCopy.filter(
      (f) => f._id === id,
    );
    filteredselectedMessenger[0].text = e.target.value;
    setSelectedMessenger(selectedMessengerCopy);
  };

  const setMessageHandler = (e, id) => {
    const selectedMessengerCopy = [...selectedMessenger];
    const filteredselectedMessenger = selectedMessengerCopy.filter(
      (f) => f.id === id,
    );
    filteredselectedMessenger[0].message = e.target.value;
    setSelectedMessenger(selectedMessengerCopy);
  };
  const setLinkHandler = (e, id) => {
    // const dataCopy = [...data];
    // const filteredData = dataCopy.filter((f) => f._id === id);
    // filteredData[0].link = e.target.value;
    // setData(dataCopy);
    // console.log(
    //   "selectedMessenger :",
    //   selectedMessenger,
    // );
    const selectedMessengerCopy = [...selectedMessenger];
    const filteredselectedMessenger = selectedMessengerCopy.filter(
      (f) => f._id === id,
    );
    filteredselectedMessenger[0].link = e.target.value;
    setSelectedMessenger(selectedMessengerCopy);
  };

  const handleSubmit = async () => {
    console.log("Values:", {
      id: editContext.item.uniqueId,
      address: address,
      type: "messenger",
      title,
      blocks: selectedMessenger,
    });

    const filteredData = selectedMessenger.filter(
      (f) => !f.text || !f.link,
    );
    if (filteredData[0] || !title) {
      return toast.error("Please fill in all required fields");
    } else {
      setLoading(true);

      try {
        console.log("address:", address);
        const res = await axios.post(
          "https://ulink-back-431g.onrender.com/setEdit",
          {
            uniqueId: editContext.item.uniqueId,
            address: address,
            type: "messenger",
            title,
            animation,
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

  const handleDeleteBlock = async () => {
    try {
      const response = await axios.post(
        "https://ulink-back-431g.onrender.com/deleteItem",
        {
          address,
          id: editContext.item.uniqueId,
        },
      );
      handleClose();
      setUpdate((prev) => prev + 1);
      toast.success("The selected block was deleted");
      setSection("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={styles.step2}
      style={step == 2 ? { top: "2vh" } : {}}>
      <div className={styles.header}>
        <Image
          width={16}
          height={16}
          src="/icons/redTrash.svg"
          onClick={handleOpen}
        />
        <p>Messenger</p>
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
        Add an item to this block +
      </button>

      <div className={styles.setTitle}>
        <label>Block title:</label>
        <input
          type="text"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {!title && isSubmit ? (
          <p className={styles.errorText}>
            Please enter a block title
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
            key={d._id}>
            <div
              dir="rtl"
              onClick={() => {
                if (showSelectSection[d._id]) {
                  setShowSelectSection({});
                } else {
                  let obj = {};
                  obj[d._id] = true;
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
                <p>Item {index + 1}</p>
              </div>
              {index !== 0 && (
                <Image
                  width={16}
                  height={16}
                  src="/icons/redTrash.svg"
                  onClick={() => handleDelete(d._id)}
                />
              )}
            </div>

            {showSelectSection && showSelectSection[d._id] && (
              <div className={styles.formBlockBody}>
                <label>Item title {d.faName}</label>
                <input
                  type="text"
                  onChange={(e) => setTextHandler(e, d._id)}
                  value={d.text}
                />
                {!d.text && isSubmit && (
                  <span className={styles.errorText}>
                    Please enter a title for this item
                  </span>
                )}
                <p>Choose a title for this item.</p>

                <label>
                  {d.social == "whatsapp"
                    ? "Your WhatsApp number"
                    : d.social == "telegram"
                      ? "Your Telegram ID"
                      : `Your ${d.faName} link`}
                </label>
                <input
                  type="url"
                  onChange={(e) => setLinkHandler(e, d._id)}
                  value={d.link}
                />
                {!d.link && isSubmit && (
                  <span className={styles.errorText}>
                    This field is required
                  </span>
                )}
                <p>
                  {d.social == "whatsapp"
                    ? "Enter only your WhatsApp number, not the full link"
                    : d.social == "telegram"
                      ? "Enter only your Telegram ID, not the full link"
                      : `Enter your ${d.faName} link. Make sure it's the full link, not just an ID or phone number.`}
                </p>

                {d.social == "whatsapp" && (
                  <>
                    <label>WhatsApp preset message (optional)</label>
                    <input
                      type="url"
                      onChange={(e) => setMessageHandler(e, d._id)}
                      value={d.message}
                      aria-multiline="true"
                    />
                    <p>
                      Filling this field will set a default message in
                      the WhatsApp chat
                    </p>
                  </>
                )}
              </div>
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
            No animation
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
              cssOverride={{ display: "block", borderColor: "red" }}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
        )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ zIndex: "20000" }}>
        <div className={styles.modal}>
          <p>Do you want to delete this item?</p>
          <div>
            <button onClick={handleDeleteBlock}>Yes</button>
            <button onClick={handleClose}>No</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Step2;
