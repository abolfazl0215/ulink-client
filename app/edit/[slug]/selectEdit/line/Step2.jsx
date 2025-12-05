"use client";
import React, { useContext, useEffect } from "react";
import styles from "./step2.module.css";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import { EditContext } from "../EditContext";
import Modal from "@mui/material/Modal";

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
  const selectLine = editContext.item.line
    .split("/")[2]
    .split(".")[0];

  const [showSelectSection, setShowSelectSection] = useState();
  const [line, setLine] = useState(selectLine);
  const [space, setSpace] = useState(editContext.item.space);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!showSelectSection) {
      const obj = {};
      obj[selectedMessenger[0].id] = true;
      setShowSelectSection(obj);
    }
  }, []);

  const handleSubmit = async () => {
    if (!line) {
      return toast.error("Please select one of the separators.");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://ulinkkk.liara.run/setEdit",
        {
          uniqueId: editContext.item.uniqueId,
          address,
          type: "line",
          line: `/icons/${line}.svg`,
          space,
          animation: "",
          blocks: [],
        },
      );

      setUpdate((prev) => prev + 1);
      toast.success("Operation was successful.");
      setLoading(false);
      setSection("");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeleteBlock = async () => {
    try {
      const response = await axios.post(
        "https://ulinkkk.liara.run/deleteItem",
        {
          address,
          id: editContext.item.uniqueId,
        },
      );

      handleClose();
      setUpdate((prev) => prev + 1);
      toast.success("The selected item has been deleted.");
      setSection("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.step2} style={{ top: "2vh" }}>
      <div className={styles.header}>
        <Image
          onClick={handleOpen}
          width={16}
          height={16}
          src="/icons/redTrash.svg"
        />
        <p>Separator</p>
        <Image
          onClick={() => setSection("")}
          width={16}
          height={16}
          src="/icons/zarbdar.svg"
        />
      </div>

      <div className={styles.containerLines}>
        <div
          style={
            line == "line1" ? { border: "2px solid #0255c2" } : {}
          }
          onClick={() => setLine("line1")}>
          <Image src={"/icons/line1.svg"} width={400} height={30} />
        </div>
        <div
          style={
            line == "line2" ? { border: "2px solid #0255c2" } : {}
          }
          onClick={() => setLine("line2")}>
          <Image src={"/icons/line2.svg"} width={400} height={30} />
        </div>
        <div
          style={
            line == "line3" ? { border: "2px solid #0255c2" } : {}
          }
          onClick={() => setLine("line3")}>
          <Image src={"/icons/line3.svg"} width={400} height={30} />
        </div>
        <div
          style={
            line == "line4" ? { border: "2px solid #0255c2" } : {}
          }
          onClick={() => setLine("line4")}>
          <Image src={"/icons/line4.svg"} width={400} height={30} />
        </div>
        <div
          style={
            line == "line5" ? { border: "2px solid #0255c2" } : {}
          }
          onClick={() => setLine("line5")}>
          <Image src={"/icons/line5.svg"} width={400} height={30} />
        </div>
        <div
          style={
            line == "line6" ? { border: "2px solid #0255c2" } : {}
          }
          onClick={() => setLine("line6")}>
          <Image src={"/icons/line6.svg"} width={400} height={30} />
        </div>
      </div>

      <div className={styles.setting}>
        <div
          className={styles.settingHeader}
          onClick={() => setShowSetting(!showSetting)}>
          <Image
            style={showSetting ? { transform: "rotate(180deg)" } : {}}
            src="/icons/arrowTop.svg"
            width={16}
            height={16}
          />
          Adjust top & bottom spacing
        </div>

        <div
          className={styles.settingBody}
          style={
            showSetting
              ? { maxHeight: "42vh", padding: "5vw", height: "42vh" }
              : { maxHeight: "0px", height: "0px" }
          }>
          <ul>
            <li
              style={space == 1 ? { border: "2px solid blue" } : {}}
              onClick={() => setSpace(1)}>
              Low
            </li>
            <li
              style={space == 2 ? { border: "2px solid blue" } : {}}
              onClick={() => setSpace(2)}>
              Medium
            </li>
            <li
              style={space == 3 ? { border: "2px solid blue" } : {}}
              onClick={() => setSpace(3)}>
              High
            </li>
            <li
              style={space == 4 ? { border: "2px solid blue" } : {}}
              onClick={() => setSpace(4)}>
              Very High
            </li>
          </ul>
        </div>
      </div>

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
            <BeatLoader
              color={"#fff"}
              loading={true}
              cssOverride={{
                display: "block",
                borderColor: "red",
              }}
              size={10}
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
