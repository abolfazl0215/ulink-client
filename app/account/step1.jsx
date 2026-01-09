"use client";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { LinkContext } from "../../context/LinkContext";
import toast from "react-hot-toast";
import {
  FormHelperText,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import Image from "next/image";

const Step1 = () => {
  const [loading, setLoading] = useState(false);
  const [exist, setExist] = useState(false);
  const [linkAddress, setLinkAddress] = useState("");
  const [showError, setShowError] = useState(false);

  const linkContext = useContext(LinkContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(true);
    if (loading) {
      return toast.success("لطفا صبر کنید تا آیدی بررسی شود");
    }
    if (linkAddress.length < 3) {
      return toast.error(
        "آدرس لینک شما نباید کمتر از 3 کاراکتر باشد",
      );
    }
    if (exist) {
      return toast.error("این آیدی از قبل  موجود است");
    }
    setStep(1);
  };

  const addressHandler = async (e) => {
    setLinkAddress(e.target.value);
    setLoading(true);
    linkContext.setLink(e.target.value);
    try {
      const response = await axios.post(
        "https://ulinkk-back.onrender.com/findLink",
        { link: e.target.value.trim() },
        { headers: { "Content-Type": "application/json" } },
      );
      setLoading(false);
      if (response.data.exist) {
        setExist(true);
      } else {
        setExist(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="w-full min-h-[90vh] flex justify-center items-center">
      <div className="bg-white max-w-[35vw] shadow-sm p-[2vw] rounded-lg">
        <p
          // style={{ fontSize: "10vw" }}
          className="text-[1.5vw] font-semibold">
          Create new link
        </p>
        <p className="text-[#717184] font-semibold mt-[2vw] text-[1.1vw]">
          Link address <span className="text-red-500">*</span>
        </p>
        {/* <input
                  type="text"
                  className="border border-[#E5E7EA] placeholder-[#C8C8D0] mt-[.5vw] w-full p-[1vw] rounded-lg"
                /> */}

        <OutlinedInput
          id="outlined-adornment-weight"
          sx={{
            borderRadius: "6px",
            borderColor: "#E5E7EA",
            alignItems: "center",
          }}
          fullWidth
          className="MuiOutlinedInput-inputSizeSmall mt-[.5vw]"
          startAdornment={
            <InputAdornment sx={{ mr: 1 }} position="end">
              ulink-front.onrender.com /
            </InputAdornment>
          }
          endAdornment={
            loading ? (
              <ClipLoader
                color={"#e30017 "}
                loading={true}
                cssOverride={{
                  display: "block",
                  // margin: "0.3vw auto",

                  // paddingBottom: "1vw",
                  borderColor: "red",
                }}
                size={17}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : exist ? (
              <Image
                width={16}
                height={16}
                src="/icons/zarbdar.svg"
              />
            ) : (
              <Image width={16} height={16} src="/icons/true.svg" />
            )
          }
          onChange={(e) => addressHandler(e)}
          aria-describedby="outlined-weight-helper-text"
          required
          inputProps={{
            "aria-label": "weight",

            pattern: "[a-zA-Z0-9_.]+", // اعتبارسنجی با استفاده از pattern
            title:
              "لینک شما فقط میتواند شامل حروف انگلیسی ، اعداد انگلیسی ، نقطه و _ باشد .",
          }}
        />
        <p className="text-[#9C9CAB] mt-[.3vw] text-[.9vw]">
          For example: milad, ewza0231, or your Instagram ID. Your
          link ID can include English letters, English numbers, dots,
          and underscores.
        </p>
        <p className="text-[#717184] font-semibold mt-[1.5vw] text-[1.1vw]">
          Main photo <span className="text-red-500">*</span>
        </p>

        <div className="flex gap-[4vw] justify-between items-center">
          <div>
            <p className="text-[#9C9CAB]">
              Choose an image for your custom link
            </p>
            <p className="text-[#C8C8D0] mt-[.3vw] text-[.8vw]">
              Maximum size: 2000×2000 pixels and 3 MB
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[4vw] h-[4vw]"
            fill="none"
            viewBox="0 0 43 43">
            <path
              fill="#DEE2EF"
              fillRule="evenodd"
              d="M42.5 21.25c0 11.736-9.514 21.25-21.25 21.25S0 32.986 0 21.25 9.514 0 21.25 0 42.5 9.514 42.5 21.25m-14.875-6.375a6.375 6.375 0 1 1-12.75 0 6.375 6.375 0 0 1 12.75 0M21.25 39.313c3.791 0 7.31-1.168 10.215-3.164 1.283-.882 1.831-2.56 1.085-3.927-1.546-2.833-4.733-4.597-11.3-4.597s-9.754 1.764-11.3 4.597c-.747 1.366-.198 3.045 1.085 3.927a18 18 0 0 0 10.215 3.163"
              clipRule="evenodd"></path>
            <circle cx="8" cy="34" r="8" fill="#3AC481"></circle>
            <path
              fill="#FFECEC"
              fillRule="evenodd"
              d="M8 30.833c.276 0 .5.205.5.458v2.75h3c.276 0 .5.206.5.459s-.224.458-.5.458h-3v2.75c0 .253-.224.458-.5.458s-.5-.205-.5-.458v-2.75h-3c-.276 0-.5-.205-.5-.458 0-.254.224-.459.5-.459h3v-2.75c0-.253.224-.458.5-.458"
              clipRule="evenodd"></path>
          </svg>
        </div>
        <p className="text-[#717184] font-semibold mt-[1.5vw] text-[1.1vw]">
          Title <span className="text-red-500">*</span>
        </p>
        <input
          type="text"
          className="border border-[#E5E7EA] placeholder-[#C8C8D0] mt-[.5vw] w-full p-[1vw] rounded-lg"
          placeholder="Write a title for the link"
        />
        <p className="text-[#9C9CAB] mt-[.3vw] text-[.9vw]">
          Lorem ipsum, dolor sit amet consectetur adipisicing.
        </p>
        <p className="text-[#717184] font-semibold mt-[1.5vw] text-[1.1vw]">
          SubTitle{" "}
          <span className="text-[#9C9CAB] font-normal text-[.9vw] ml-[.4vw]">
            (optional)
          </span>
        </p>
        <input
          type="text"
          className="border border-[#E5E7EA] placeholder-[#C8C8D0] mt-[.5vw] w-full p-[1vw] rounded-lg"
          placeholder="Write a subtitle for the link"
        />
        <p className="text-[#9C9CAB] mt-[.3vw] text-[.9vw]">
          Lorem ipsum, dolor sit amet consectetur adipisicing.
        </p>
        <div className="flex justify-end w-full">
          <button className="bg-[#2AC27C] mt-[3vw] p-[1vw] rounded-lg text-white font-semibold">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1;
