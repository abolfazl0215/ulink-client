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

const Step2 = ({
  setStep,
  step,
  setSection,
  selectedMessenger,
  setSelectedMessenger,
  address,
  setUpdate,
}) => {
  const [showSelectSection, setShowSelectSection] = useState();
  const [line, setLine] = useState("");
  const [space, setSpace] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!showSelectSection) {
      const obj = {};
      obj[selectedMessenger[0].id] = true;
      setShowSelectSection(obj);
    }
  }, []);

  const handleSubmit = async () => {
    if (!line) {
      return toast.error("Please select one of the separators");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://ulink-back-431g.onrender.com/addMessenger",
        {
          address,
          type: "line",
          line: `/icons/${line}.svg`,
          space: space ? space : "2",
          uniqueId: uuidv4(),
          blocks: [],
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
  };

  return (
    <div className={styles.step2} style={{ top: "2vh" }}>
      <div className={styles.header}>
        <Image width={16} height={16} src="/icons/zarbdar.svg" />
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
          Set top and bottom spacing
          <Image
            style={showSetting ? { transform: "rotate(180deg)" } : {}}
            src="/icons/arrowTop.svg"
            width={16}
            height={16}
          />
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
              Small
            </li>
            <li
              style={space == 2 ? { border: "2px solid blue" } : {}}
              onClick={() => setSpace(2)}>
              Medium
            </li>
            <li
              style={space == 3 ? { border: "2px solid blue" } : {}}
              onClick={() => setSpace(3)}>
              Large
            </li>
            <li
              style={space == 4 ? { border: "2px solid blue" } : {}}
              onClick={() => setSpace(4)}>
              Extra Large
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
