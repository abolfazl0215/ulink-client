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
  const [title, setTitle] = useState("عکس و اسلایدر");
  const [isSubmit, setIsSubmit] = useState(false);

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState({});
  const [image, setImage] = useState();
  const [link, setLink] = useState("");
  const [animation, setAnimation] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    // console.log("selected messengers :", data);
    if (!showSelectSection) {
      const obj = {};
      obj[selectedMessenger[0].id] = true;
      setShowSelectSection(obj);
    }
  }, []);

  const imageHandlerPreview = (file, id) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const copy = { ...preview };
        copy[id] = reader.result;
        setPreview(copy);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

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
            (item) => item.id !== dragData.id,
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
    // const filteredData = copyData.filter((f) => f.id != id);
    const filteredSelectedMessenger = copyselectedMessenger.filter(
      (f) => f.id != id,
    );
    // setData(filteredData);
    setSelectedMessenger(filteredSelectedMessenger);
  };

  const setImageHandler = (file, id) => {
    console.log("start :", file);
    console.log("previeww :", preview);
    const selectedMessengerCopy = [...selectedMessenger];
    const filteredselectedMessenger = selectedMessengerCopy.filter(
      (f) => f.id == id,
    );
    filteredselectedMessenger[0].imageUrl = file;
    setSelectedMessenger(selectedMessengerCopy);
  };
  const setTitleHandler = (e, id) => {
    const selectedMessengerCopy = [...selectedMessenger];
    const filteredselectedMessenger = selectedMessengerCopy.filter(
      (f) => f.id === id,
    );
    filteredselectedMessenger[0].title = e.target.value;
    setSelectedMessenger(selectedMessengerCopy);
  };
  const setDescriptionHandler = (e, id) => {
    const selectedMessengerCopy = [...selectedMessenger];
    const filteredselectedMessenger = selectedMessengerCopy.filter(
      (f) => f.id === id,
    );
    filteredselectedMessenger[0].description = e.target.value;
    setSelectedMessenger(selectedMessengerCopy);
  };
  const setTextHandler = (e, id) => {
    const selectedMessengerCopy = [...selectedMessenger];
    const filteredselectedMessenger = selectedMessengerCopy.filter(
      (f) => f.id === id,
    );
    filteredselectedMessenger[0].text = e.target.value;
    setSelectedMessenger(selectedMessengerCopy);
  };
  const setLinkHandler = (e, id) => {
    const selectedMessengerCopy = [...selectedMessenger];
    const filteredselectedMessenger = selectedMessengerCopy.filter(
      (f) => f.id === id,
    );
    filteredselectedMessenger[0].link = e.target.value;
    setSelectedMessenger(selectedMessengerCopy);
  };

  const handleSubmit = async () => {
    const filteredData = selectedMessenger.filter(
      (f) => !f.title || !f.description || !f.link || !f.text,
    );
    if (filteredData[0] || !title) {
      return toast.error("Please fill in all required fields");
    } else {
      setLoading(true);
      try {
        selectedMessenger.map(async (s) => {
          // Compression settings
          // const options = {
          //   maxSizeMB: 1, // Maximum size after compression (in MB)
          //   maxWidthOrHeight: 500, // Maximum width or height
          //   useWebWorker: true,
          // };

          // // Compress image
          // const compressedFile = await imageCompression(
          //   s.imageUrl,
          //   options,
          // );

          // // Convert to Base64
          // const base64 = await imageCompression.getDataUrlFromFile(
          //   compressedFile,
          // );

          const formData = new FormData();
          formData.append("image", s.imageUrl);

          const response = await axios.post(
            "https://ulinkkk.liara.run/upload2",
            formData,
          );
          const copy = [...selectedMessenger];
          const find = copy.find((f) => f.id == s.id);
          find.imageUrl = `${response.data.link}`;
          setSelectedMessenger(copy);
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }

      try {
        await Promise.all(
          selectedMessenger.map(async (s) => {
            // Compression settings
            // const options = {
            //   maxSizeMB: 1, // Maximum size after compression (in MB)
            //   maxWidthOrHeight: 500, // Maximum width or height
            //   useWebWorker: true,
            // };

            // // Compress image
            // const compressedFile = await imageCompression(
            //   s.imageUrl,
            //   options,
            // );

            // // Convert to Base64
            // const base64 = await imageCompression.getDataUrlFromFile(
            //   compressedFile,
            // );

            const formData = new FormData();
            formData.append("image", s.imageUrl);

            const response = await axios.post(
              "https://ulinkkk.liara.run/upload2",
              formData,
            );

            const copy = [...selectedMessenger];
            const find = copy.find((f) => f.id == s.id);
            find.imageUrl = `${response.data.link}`;

            setSelectedMessenger(copy);
          }),
        );

        console.log("step22222");

        const res = await axios.post(
          "https://ulinkkk.liara.run/addMessenger",
          {
            address,
            type: "slider",
            title,
            animation,
            uniqueId: uuidv4(),
            blocks: selectedMessenger,
          },
        );

        setUpdate((prev) => prev + 1);
        setSection("");
        toast.success("Operation successful");
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.step2} style={{ top: "2vh" }}>
      <div className={styles.header}>
        <Image width={16} height={16} src="/icons/zarbdar.svg" />
        <p onClick={() => console.log(selectedMessenger)}>
          Image & Slider
        </p>
        <Image
          onClick={() => setSection("")}
          width={16}
          height={16}
          src="/icons/zarbdar.svg"
        />
      </div>
      {/* add item button top */}
      <button
        onClick={() => {
          const copy = [...selectedMessenger];
          copy.push({
            faName: "Image",
            id: Math.floor(Math.random() * 10000),
          });
          setSelectedMessenger(copy);
          toast.success("New item added");
        }}
        className={styles.addItemBlock}>
        Add new item to this section +
      </button>
      {/* end  add item button top */}

      <div className={styles.setTitle}>
        <label htmlFor="">Block title:</label>

        <input
          type="text"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {!title && isSubmit ? (
          <p className={styles.errorText}>
            Please enter a title for this block
          </p>
        ) : (
          ""
        )}
      </div>
      <form className={styles.form} ref={containerRef}>
        {selectedMessenger.map((d, index) => (
          <div
            className={
              (!d.title || !d.description || !d.link || !d.text) &&
              isSubmit
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
                    (!d.title ||
                      !d.description ||
                      !d.link ||
                      !d.text) &&
                    isSubmit
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
                {/* upload image ====================== */}
                <label htmlFor="imgInput" className={styles.imgLabel}>
                  Slider image
                </label>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current.click();
                  }}
                  className={styles.button}>
                  {preview[d.id] ? (
                    <Image
                      width={200}
                      height={200}
                      src={preview[d.id]}
                    />
                  ) : (
                    "Upload image with link (click)"
                  )}
                </button>
                {!d.imageUrl && isSubmit ? (
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
                      imageHandlerPreview(file, d.id);
                      setImageHandler(file, d.id);
                    } else {
                      setImage(null);
                    }
                  }}
                />
                {/* end upload image ================== */}
                <label>Title:</label>
                <input
                  type="text"
                  onChange={(e) => setTitleHandler(e, d.id)}
                  value={d.title}
                  placeholder="Enter your image title"
                />
                {!d.title && isSubmit ? (
                  <span className={styles.errorText}>
                    This field is required
                  </span>
                ) : (
                  ""
                )}
                <p>For example: Wooden table</p>
                <label>Description:</label>
                <input
                  type="text"
                  placeholder="Enter your description"
                  onChange={(e) => setDescriptionHandler(e, d.id)}
                  value={d.description}
                />
                {!d.description && isSubmit ? (
                  <span className={styles.errorText}>
                    This field is required
                  </span>
                ) : (
                  ""
                )}
                <p>For example: Four-person walnut wooden table</p>
                <label>Button text:</label>
                <input
                  type="text"
                  placeholder="Enter your button text"
                  onChange={(e) => setTextHandler(e, d.id)}
                  value={d.text}
                />
                {!d.text && isSubmit ? (
                  <span className={styles.errorText}>
                    This field is required
                  </span>
                ) : (
                  ""
                )}
                <p>For example: Click now</p>
                <label>Link / URL:</label>
                <input
                  type="url"
                  placeholder="Enter your website link"
                  onChange={(e) => setLinkHandler(e, d.id)}
                  value={d.link}
                />
                {!d.link && isSubmit ? (
                  <span className={styles.errorText}>
                    This field is required
                  </span>
                ) : (
                  ""
                )}
                <p>For example: https://yoursite.com</p>
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
