"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { LinkContext } from "../../context/LinkContext";
import toast from "react-hot-toast";
import { InputAdornment, OutlinedInput } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import Image from "next/image";

const CreateLinkStepOne = ({ setStep }) => {
  const [loading, setLoading] = useState(false);
  const [existId, setExistId] = useState(false);
  // const [link, setLink] = useState("");

  // const [preview, setPreview] = useState();
  // const [image, setImage] = useState();
  const fileInputRef = useRef();

  // Error states
  const [linkError, setLinkError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [imageError, setImageError] = useState("");

  const linkContext = useContext(LinkContext);
  const {
    title,
    setTitle,
    setSubTitle,
    subTitle,
    preview,
    setPreview,
    image,
    setImage,
    link,
    setLink,
    setSection,
  } = linkContext;

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addressHandler = async (e) => {
    setLink(e.target.value);
    setLinkError(""); // Clear error on change
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
        setExistId(true);
      } else {
        setExistId(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset all errors
    setLinkError("");
    setTitleError("");
    setImageError("");

    let hasError = false;

    // Validate link address
    if (!link || link.trim().length < 3) {
      setLinkError("Link address must be at least 3 characters");
      hasError = true;
    } else if (existId) {
      setLinkError("This link address already exists");
      hasError = true;
    }

    // Validate title
    if (!title || title.trim().length < 3) {
      setTitleError("Title must be at least 3 characters");
      hasError = true;
    }

    // Validate image
    if (!image) {
      setImageError("Please select an image");
      hasError = true;
    }

    // If there are errors, don't submit
    if (hasError) {
      toast.error("Please fix all errors before continuing");
      return;
    }

    // If validation passes, proceed
    // toast.success("Validation passed! Ready to continue");
    setStep(2);
    // Add your next step logic here
    // For example: navigate to next step or submit data
  };

  return (
    <div className="w-full mt-[15vw] md:mt-[12vw] lg:mt-0 min-h-[90vh] flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[90vw] lg:max-w-[35vw] shadow-sm p-[4vw] lg:p-[2vw] rounded-lg mt-[3vw] lg:mt-0">
        <p className="text-[6vw] md:text-[4vw] lg:text-[1.5vw] font-semibold">
          Create new link
        </p>

        {/* Link Address Section */}
        <p className="text-[#717184] font-semibold mt-[6vw] lg:mt-[2vw] text-[4.3vw] md:text-[2.8vw] lg:text-[1.1vw]">
          Link address <span className="text-red-500">*</span>
        </p>

        {/* link input ================================================== */}
        <div className="relative w-full mt-[1.5vw] lg:mt-[.5vw]">
          <div className="relative flex items-center">
            {/* Prefix text */}
            <span className="absolute left-[3vw] lg:left-[1vw] text-[4vw] md:text-[2.5vw] lg:text-[1vw] text-[#C8C8D0] pointer-events-none z-10">
              ulinkk-front.onrender.com/
            </span>

            {/* Input field */}
            <input
              id="outlined-adornment-weight"
              type="text"
              className={`
                text-[4vw] md:text-[2.5vw] lg:text-[1vw]
        w-full
        rounded-[6px]
        border
        ${linkError ? "border-[#ef4444]" : "border-[#E5E7EA]"}
        p-[3vw] lg:p-[1vw]
        pl-[34vw] md:pl-[23vw] lg:pl-[8.5vw]
        outline-none
        focus:border-[#3b82f6]
        focus:ring-1
        focus:ring-[#3b82f6]
        transition-colors
      `}
              value={linkContext.link}
              onChange={(e) => addressHandler(e)}
              required
              pattern="[a-zA-Z0-9_.]+"
              title="Your link can only include English letters, English numbers, dots, and underscores."
              aria-label="weight"
              aria-describedby="outlined-weight-helper-text"
            />

            {/* End adornment (icon/loader) */}
            <div className="absolute right-[3vw] lg:right-[1vw] flex items-center pointer-events-none">
              {loading ? (
                <ClipLoader
                  color={"#e30017"}
                  loading={true}
                  cssOverride={{
                    display: "block",
                    borderColor: "red",
                  }}
                  size={17}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : existId ? (
                <Image
                  width={16}
                  height={16}
                  className="w-[5vw] md:w-[3.5vw] md:h-[3.5vw] lg:w-[1.3vw] h-[5vw] lg:h-[1.3vw]"
                  src="/icons/zarbdar.svg"
                  alt="error"
                />
              ) : (
                <Image
                  width={16}
                  height={16}
                  className="w-[5vw] md:w-[3.5vw] md:h-[3.5vw] lg:w-[1.3vw] h-[5vw] lg:h-[1.3vw]"
                  src="/icons/true.svg"
                  alt="success"
                />
              )}
            </div>
          </div>
        </div>

        {linkError && (
          <p className="text-red-500 mt-[1vw] lg:mt-[.3vw] text-[3vw] md:text-[1.8vw] lg:text-[.9vw]">
            {linkError}
          </p>
        )}
        {!linkError && (
          <p className="text-[#9C9CAB] mt-[1vw] lg:mt-[.3vw] text-[3vw] md:text-[1.8vw] lg:text-[.9vw]">
            For example: milad, ewza0231, or your Instagram ID. Your
            link ID can include English letters, English numbers,
            dots, and underscores.
          </p>
        )}

        {/* Main Photo Section */}
        <p className="text-[#717184] font-semibold mt-[5vw] lg:mt-[2vw] text-[4.3vw] md:text-[2.8vw] lg:text-[1.1vw]">
          Main photo <span className="text-red-500">*</span>
        </p>

        <div className="flex gap-[4vw] justify-between items-center">
          <div className="max-w-[85%]">
            <p className="text-[#9C9CAB] text-[4vw] md:text-[2.5vw] lg:text-[1vw] ">
              Choose an image for your custom link
            </p>
            <p className="text-[#C8C8D0] mt-[.3vw] text-[3vw] md:text-[1.7vw] lg:text-[.8vw]">
              Maximum size: 2000×2000 pixels and 3 MB
            </p>
          </div>
          {preview ? (
            <Image
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current.click();
              }}
              className="w-[12vw] md:w-[8vw] md:h-[8vw] lg:w-[4vw] h-[12vw] lg:h-[4vw] cursor-pointer rounded-full object-cover"
              width={200}
              height={200}
              src={preview}
              alt="preview"
            />
          ) : (
            <svg
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current.click();
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="w-[15vw] md:w-[8vw] md:h-[8vw] lg:w-[4vw] h-[15vw] lg:h-[4vw] cursor-pointer"
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
              if (file && file.type.substring(0, 5) === "image") {
                linkContext.setImage(file);
                setImage(file);
                setImageError(""); // Clear error when image is selected
              } else {
                linkContext.setImage(null);
                setImage(null);
              }
            }}
          />
        </div>
        {imageError && (
          <p className="text-red-500 mt-[1vw] lg:mt-[.3vw] text-[3vw] md:text-[1.8vw] lg:text-[.9vw]">
            {imageError}
          </p>
        )}

        {/* Title Section */}
        <p className="text-[#717184] font-semibold mt-[5vw] lg:mt-[2vw] text-[4.3vw] md:text-[2.8vw] lg:text-[1.1vw]">
          Title <span className="text-red-500">*</span>
        </p>
        <input
          type="text"
          value={title}
          className={`border text-[4vw] md:text-[2.5vw] lg:text-[1vw] outline-none
        focus:border-[#3b82f6]
        focus:ring-1
        focus:ring-[#3b82f6]
        transition-colors ${
          titleError ? "border-red-500" : "border-[#E5E7EA]"
        } placeholder-[#C8C8D0] mt-[1.5vw] lg:mt-[.5vw] w-full p-[3vw] lg:p-[1vw] rounded-lg`}
          placeholder="Write a title for the link"
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleError(""); // Clear error on change
          }}
        />
        {titleError && (
          <p className="text-red-500 mt-[1vw] lg:mt-[.3vw] text-[3vw] md:text-[1.8vw] lg:text-[.9vw]">
            {titleError}
          </p>
        )}
        {!titleError && (
          <p className="text-[#9C9CAB] mt-[1vw] lg:mt-[.3vw] text-[3vw] md:text-[1.8vw] lg:text-[.9vw]">
            Lorem ipsum, dolor sit amet consectetur adipisicing.
          </p>
        )}

        {/* Subtitle Section */}
        <p className="text-[#717184] font-semibold mt-[5vw] lg:mt-[2vw] text-[4.3vw] md:text-[2.8vw] lg:text-[1.1vw]">
          SubTitle{" "}
          <span className="text-[#9C9CAB] font-normal text-[3.5vw] lg:text-[.9vw] ml-[.4vw]">
            (optional)
          </span>
        </p>
        <input
          type="text"
          value={subTitle}
          className="border text-[4vw] md:text-[2.5vw] lg:text-[1vw] outline-none
        focus:border-[#3b82f6]
        focus:ring-1
        focus:ring-[#3b82f6]
        transition-colors border-[#E5E7EA] placeholder-[#C8C8D0] mt-[1.5vw] lg:mt-[.5vw] w-full p-[3vw] lg:p-[1vw] rounded-lg"
          placeholder="Write a subtitle for the link"
          onChange={(e) => setSubTitle(e.target.value)}
        />
        <p className="text-[#9C9CAB] mt-[1vw] lg:mt-[.3vw] text-[3vw] md:text-[1.8vw] lg:text-[.9vw]">
          Lorem ipsum, dolor sit amet consectetur adipisicing.
        </p>

        {/* Submit Button */}
        <div className="flex justify-end w-full">
          <button
            type="submit"
            className="bg-[#2AC27C] mt-[9vw] lg:mt-[3vw] p-[3vw] md:p-[2vw] lg:p-[1vw] rounded-lg text-white font-semibold hover:bg-[#25a869] transition-colors text-[4vw] md:text-[2.5vw] lg:text-[1vw]">
            Continue
          </button>
        </div>
      </form>
      <p
        onClick={() => setSection("myLinks")}
        className="mt-[4.5vw] lg:mt-[1.5vw] mb-[3vw] lg:mb-0 text-[#055AFF] cursor-pointer hover:font-bold transition-all text-[3.5vw] md:text-[2vw] lg:text-[.9vw]">
        Back to my links
      </p>
    </div>
  );
};

export default CreateLinkStepOne;
