"use client";

import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import QrCode from "./QrCode";
import toast from "react-hot-toast";
import Logout from "./Logout";
import RemoveLink from "./RemoveLink";
import MyLinks from "./MyLinks";
import axios from "axios";
import CreateLinkStepOne from "./CreateLinkStepOne";
import CreateLinkStepTwo from "./CreateLinkStepTwo";
import { LinkContext } from "../../context/LinkContext";
import { Trash2 } from "lucide-react";
import { GridLoader } from "react-spinners";

const Account = () => {
  const [qrCode, setQrCode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showRemoveLink, setShowRemoveLink] = useState("");
  const [links, setLinks] = useState([]);
  const [loadingLinks, setLoadingLinks] = useState(false);

  const { user } = useContext(LoginContext);

  const { section, setSection, step, setStep } =
    useContext(LinkContext);

  const router = useRouter();

  const linksPure = user?.links || [];

  useEffect(() => {
    if (linksPure.length) {
      setLoadingLinks(true);
      axios
        .post(
          "https://ulinkkk.liara.run/getMyLinks",
          { links: linksPure },
          {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
          },
        )
        .then((res) => {
          setLinks(res.data.links.reverse());
          setLoadingLinks(false);
          console.log("links visit report sent successfully");
        })
        .catch((err) => {
          setLoadingLinks(false);
          console.log("error in sending links visit report:", err);
        });
    } else {
      setLinks([]);
    }
  }, [user]);

  const checkToken = async () => {
    try {
      const response = await axios.get(
        "https://ulinkkk.liara.run/checkExistUser",
        {
          withCredentials: true,
        },
      );

      if (response.data.loggedIn !== true) {
        toast.error("Please login first!");
        router.push("/login");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login first!");
        router.push("/login");
      } else {
        toast.error("Server error!");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="flex justify-end w-full h-full min-h-screen p-0 m-0">
      {showLogout && (
        <Logout
          showLogout={showLogout}
          setShowLogout={setShowLogout}
        />
      )}
      {showRemoveLink && (
        <RemoveLink
          showRemoveLink={showRemoveLink}
          setShowRemoveLink={setShowRemoveLink}
        />
      )}
      {/* left menu */}
      <div
        className={
          showMenu
            ? "fixed w-[100vw] h-[100vh] bg-black/50 z-50 lg:hidden"
            : ""
        }
        onClick={() => setShowMenu(false)}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed h-full ${
            showMenu ? "left-0" : "-left-[70vw]"
          } transition-all lg:left-0 w-[70vw] md:w-[50vw] lg:w-[20vw]  bg-[#F9FBFC] p-[6vw] md:p-[4vw] lg:p-[2vw]`}>
          {/* user info */}
          <div className=" flex items-center gap-[1.5vw] lg:gap-[.7vw] border-b border-b-gray-200 pb-[4vw] md:pb-[2.5vw] lg:pb-[1.3vw]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[13vw] md:w-[6vw] md:h-[6vw] lg:w-[3.2vw] h-[13vw] lg:h-[3.2vw]"
              fill="none"
              viewBox="0 0 43 43">
              <path
                fill="#DEE2EF"
                fillRule="evenodd"
                d="M42.5 21.25c0 11.736-9.514 21.25-21.25 21.25S0 32.986 0 21.25 9.514 0 21.25 0 42.5 9.514 42.5 21.25m-14.875-6.375a6.375 6.375 0 1 1-12.75 0 6.375 6.375 0 0 1 12.75 0M21.25 39.313c3.791 0 7.31-1.168 10.215-3.164 1.283-.882 1.831-2.56 1.085-3.927-1.546-2.833-4.733-4.597-11.3-4.597s-9.754 1.764-11.3 4.597c-.747 1.366-.198 3.045 1.085 3.927a18 18 0 0 0 10.215 3.163"
                clipRule="evenodd"></path>
            </svg>
            <div>
              <p className="font-semibold text-[4.5vw] md:text-[2.5vw] lg:text-[1.1vw]">
                user
              </p>
              <p className="w-[45vw] md:w-[30vw] lg:w-[10vw] text-[3.9vw] md:text-[2vw] lg:text-[1vw] text-gray-500 overflow-hidden text-ellipsis">
                {user?.email || ""}
              </p>
            </div>
          </div>
          {/* my links */}
          <div
            onClick={() => {
              setSection("myLinks");
              setShowMenu(false);
              router.push("/account");
            }}
            className="bg-[#2ac27c] rounded-lg flex items-center p-[3vw] md:p-[2vw] lg:p-[1vw] gap-[3vw] md:gap-[2vw] lg:gap-[1vw] mt-[13vw] md:mt-[7vw] lg:mt-[3.5vw] cursor-pointer hover:bg-green-600 transition-all text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[4.7vw] md:w-[2.5vw] md:h-[2.5vw] lg:w-[1.3vw] h-[4.7vw] lg:h-[1.3vw]"
              fill="none"
              viewBox="0 0 20 20">
              <path
                fill="#fff"
                d="M15.313 12.045a.75.75 0 0 1-.532-1.279l1.967-1.978a4.2 4.2 0 0 0 1.25-3.016 4.25 4.25 0 0 0-1.248-3.025 4.276 4.276 0 0 0-6.04 0L8.744 4.724a.75.75 0 0 1-1.065-1.058l1.97-1.978a5.78 5.78 0 0 1 8.162 0 5.73 5.73 0 0 1 1.687 4.084c0 1.552-.6 3-1.69 4.078l-1.963 1.974a.75.75 0 0 1-.533.221m-5.466 5.767 1.978-1.968a.75.75 0 0 0-1.058-1.064l-1.98 1.97a4.276 4.276 0 0 1-6.04 0 4.275 4.275 0 0 1 0-6.038l1.979-1.968a.75.75 0 0 0-1.06-1.064L1.689 9.65a5.776 5.776 0 0 0 0 8.16 5.76 5.76 0 0 0 4.08 1.687 5.75 5.75 0 0 0 4.079-1.685m-2.57-4.533 6.026-6.025a.75.75 0 0 0-1.06-1.06l-6.026 6.024a.75.75 0 1 0 1.06 1.061"></path>
            </svg>
            <p className="font-semibold text-[3.8vw] md:text-[2.2vw] lg:text-[1.1vw]">
              My links
            </p>
          </div>
          {/* logout */}
          <div
            onClick={() => {
              setShowLogout(true);
              setShowMenu(false);
            }}
            className="flex items-center p-[3vw] md:gap-[2vw] lg:p-[1vw] gap-[3vw] lg:gap-[1vw] mt-[2vw] lg:mt-[.5vw] rounded-lg cursor-pointer hover:bg-gray-200 transition-all text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[4.7vw] md:w-[2.5vw] md:h-[2.5vw] lg:w-[1.3vw] h-[4.7vw] lg:h-[1.3vw]"
              fill="none"
              viewBox="0 0 20 20">
              <path
                fill="#F93D3D"
                d="M13.523 14.773v1a3.383 3.383 0 0 1-3.75 3.75h-6a3.383 3.383 0 0 1-3.75-3.75v-12a3.383 3.383 0 0 1 3.75-3.75h6a3.383 3.383 0 0 1 3.75 3.75v1a.75.75 0 1 1-1.5 0v-1c0-1.578-.673-2.25-2.25-2.25h-6c-1.578 0-2.25.673-2.25 2.25v12c0 1.576.673 2.25 2.25 2.25h6c1.577 0 2.25-.674 2.25-2.25v-1a.75.75 0 1 1 1.5 0m5.942-4.713a.75.75 0 0 0-.163-.819l-3-3a.75.75 0 0 0-1.06 1.06l1.72 1.72H5.772a.75.75 0 1 0 0 1.5h11.19l-1.72 1.721a.75.75 0 1 0 1.06 1.06l3-3a.8.8 0 0 0 .163-.242"></path>
            </svg>
            <p className="text-[#F93D3D] font-semibold text-[3.8vw] md:text-[2.2vw] lg:text-[1.1vw]">
              Logout
            </p>
          </div>
        </div>
      </div>
      {/* right */}
      <div
        className={`w-full lg:w-[79vw]  ${
          section !== "createNewLink" && "p-[1vw]"
        } bg-stone-100 lg:bg-white`}>
        <div
          className={`${
            section === "createNewLink"
              ? "bg-[#F9FBFC] min-h-screen"
              : "lg:border lg:border-gray-300"
          }  w-full rounded-lg p-[2vw] transition-all `}>
          <div
            className={`fixed lg:relative z-40 w-[96vw] lg:w-auto  flex lg:flex-1 justify-between items-center shadow-sm lg:shadow-none p-[2vw]  bg-[#ffffff69] backdrop-blur-lg ${
              section != "myLinks" && " lg:p-0"
            }  rounded-lg`}>
            <p
              className={`text-[2vw] font-semibold hidden ${
                section == "myLinks" && "lg:block"
              }  `}>
              My links
            </p>
            {/* hamburge menu */}
            <svg
              onClick={() => setShowMenu(true)}
              xmlns="http://www.w3.org/2000/svg"
              className="visible lg:hidden w-[6vw] h-[6vw] md:w-[3.5vw] md:h-[3.5vw]"
              fill="none"
              viewBox="0 0 22 16">
              <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 15h20M1 8h20M1 1h20"></path>
            </svg>

            {/* create new link button in navbar mobile */}
            {section === "myLinks" && links.length > 0 ? (
              <button
                onClick={() => setSection("createNewLink")}
                className={`bg-[#2ac27c] rounded-lg flex p-[2vw] md:p-[2vw] lg:p-[1vw] px-[3vw] lg:px-[1vw] gap-[1.5vw] lg:gap-[.6vw] text-white text-lg items-center lg:mt-[2vw] hover:bg-green-600 transition-all ${
                  links.length == 0 ? "lg:hidden" : ""
                }`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[4.5vw] md:w-[2.5vw] md:h-[2.5vw] lg:w-[1.5vw] h-[4.5vw] lg:h-[1.5vw]"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    fill="#fff"
                    d="M12 1.25C6.072 1.25 1.25 6.073 1.25 12S6.072 22.75 12 22.75 22.75 17.927 22.75 12 17.928 1.25 12 1.25m0 20c-5.101 0-9.25-4.149-9.25-9.25S6.899 2.75 12 2.75s9.25 4.149 9.25 9.25-4.149 9.25-9.25 9.25M16.25 12a.75.75 0 0 1-.75.75h-2.75v2.75a.75.75 0 0 1-1.5 0v-2.75H8.5a.75.75 0 0 1 0-1.5h2.75V8.5a.75.75 0 0 1 1.5 0v2.75h2.75a.75.75 0 0 1 .75.75"></path>
                </svg>
                <p className="text-[4vw] md:text-[2vw] lg:text-[1.1vw] p-0">
                  create new link
                </p>
              </button>
            ) : (
              <p className="font-bold text-[4.9vw] md:text-[2.8vw] p-[2vw]  lg:hidden text-[#055AFF]">
                ULink
              </p>
            )}
          </div>
          {section === "myLinks" ? (
            <>
              {links.length == 0 ? (
                <div
                  className={`flex flex-col  ${
                    !links.length
                      ? "h-[80vh] lg:h-[60vh]"
                      : "h-[80vh]"
                  } items-center justify-center `}>
                  {loadingLinks ? (
                    <GridLoader color="#2AC27C" size={20} />
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-[10vw] lg:mt-0 w-[40vw] md:w-[25vw] md:h-[25vw]  lg:w-[13vw] h-[40vw] lg:h-[13vw]"
                        fill="none"
                        viewBox="0 0 195 182">
                        <path
                          fill="#EAEEF9"
                          d="M174.097 118.766a5.664 5.664 0 1 0-.002-11.328 5.664 5.664 0 0 0 .002 11.328M163.219 134.566a3.867 3.867 0 1 0 .001-7.735 3.867 3.867 0 0 0-.001 7.735M37.903 40.034a3.868 3.868 0 1 0 0-7.735 3.868 3.868 0 0 0 0 7.735M14.284 114.622a7.183 7.183 0 1 0 0-14.366 7.183 7.183 0 0 0 0 14.366"></path>
                        <path
                          fill="#EAEEF9"
                          d="M101.507 150.673c38.675 0 70.03-31.355 70.03-70.169s-31.355-70.168-70.03-70.168c-38.676 0-70.03 31.355-70.03 70.168s31.354 70.169 70.03 70.169"></path>
                        <path
                          fill="#CED7E2"
                          d="M142.179 20.884c2.083 0 3.845 1.594 3.845 3.826v112.887c0 2.072-1.602 3.826-3.845 3.826H58.697c-2.083 0-3.845-1.594-3.845-3.826V24.71c0-2.072 1.602-3.826 3.845-3.826z"></path>
                        <path
                          fill="#BCC4CF"
                          d="M146.026 32.682v104.755c0 2.072-1.602 3.826-3.846 3.826H65.91l-6.73-6.696 75.79-103.798 6.57-2.392z"></path>
                        <path
                          fill="#D9DFEE"
                          d="M141.86 29.653c0-.638-.481-1.276-1.282-1.276H60.462c-.641 0-1.282.478-1.282 1.276V133.29c0 .638.48 1.276 1.282 1.276h79.956c.641 0 1.282-.479 1.282-1.276z"></path>
                        <path
                          fill="#EFF3FB"
                          d="M141.858 29.653c0-.638-.481-1.276-1.282-1.276H60.459c-.64 0-1.282.478-1.282 1.276.962 41.295 1.282 88.013-3.204 100.13l76.751-1.116c4.647-21.046 8.172-58.835 9.134-99.014"></path>
                        <g filter="url(#filter0_d_2572_8)">
                          <path
                            fill="#fff"
                            d="M141.699 28.537s-.16 6.218-2.083 45.92v.797c-2.403 38.904-37.014 47.036-41.18 47.514-1.923.16-5.608.479-12.178.479-8.171.319-20.67.478-40.218.638-.641 0-1.122-.638-.801-1.276 13.46-26.946 13.62-93.912 13.62-93.912z"></path>
                        </g>
                        <path
                          fill="#EAEEF9"
                          d="M139.455 75.094c-2.243 38.904-37.014 47.036-41.18 47.514-1.922.159-5.608.478-12.177.478 17.305-7.972 26.598-22.322 26.438-33.483 8.332.638 22.753 0 26.919-14.51"></path>
                        <path
                          fill="#1C3754"
                          d="M119.905 21.202q0-.24 0 0l-.801-.797s-.481.16-.641.478h-12.499v-.797c0-2.551-2.243-4.783-4.806-4.783s-4.808 2.232-4.808 4.783c0 .319 0 .478.16.638H83.533c-.641 0-1.282.478-1.282 1.435v4.145c0 3.19 2.243 5.103 5.288 5.103h26.598c3.205 0 5.929-1.914 5.929-5.103V22c.16-.319 0-.637-.16-.797"></path>
                        <path
                          fill="url(#paint0_linear_2572_8)"
                          d="M119.428 21.202v4.942c-.48 2.711-2.724 4.943-5.608 4.943H87.061c-2.884 0-5.127-2.232-5.608-4.942v-4.943c0-.638.48-1.435 1.282-1.435h13.14v-.638c0-2.551 2.242-4.783 4.806-4.783s4.807 2.232 4.807 4.783v.638h13.139c.321.16.801.638.801 1.435"></path>
                        <path
                          fill="#EAEEF9"
                          d="M100.357 21.362c1.281 0 2.243-.957 2.243-2.232s-.962-2.232-2.243-2.232c-1.282 0-2.244.956-2.244 2.232 0 1.275 1.122 2.232 2.244 2.232"></path>
                        <path
                          fill="#9AA1B2"
                          d="M119.268 26.145c-.481 2.71-2.724 4.942-5.608 4.942H87.061c-2.884 0-5.127-2.232-5.608-4.942z"></path>
                        <path
                          fill="#989FB0"
                          d="M78.886 74.615a4.47 4.47 0 0 0 4.486-4.464c0-2.551-2.083-4.465-4.486-4.465a4.47 4.47 0 0 0-4.487 4.465c-.16 2.392 1.923 4.464 4.487 4.464M114.459 74.456a4.47 4.47 0 0 0 4.487-4.464c0-2.551-2.083-4.465-4.487-4.465s-4.486 2.073-4.486 4.465a4.467 4.467 0 0 0 4.486 4.464"></path>
                        <path
                          fill="#EAEEF9"
                          d="M107.255 161.033c42.719 0 77.353-34.576 77.353-77.377 0-42.802-34.786-77.378-77.353-77.378-42.72 0-77.353 34.577-77.353 77.378s34.634 77.377 77.353 77.377M179.576 32.934a6.25 6.25 0 0 0 6.255-6.245 6.25 6.25 0 0 0-6.255-6.245c-3.455 0-6.256 2.796-6.256 6.245s2.801 6.245 6.256 6.245M188.729 8.563a4.27 4.27 0 0 0 4.272-4.265 4.27 4.27 0 0 0-4.272-4.265 4.27 4.27 0 0 0-4.272 4.265 4.27 4.27 0 0 0 4.272 4.265M34.022 32.782c2.36 0 4.272-1.91 4.272-4.265a4.27 4.27 0 0 0-4.272-4.265 4.27 4.27 0 0 0-4.272 4.265 4.27 4.27 0 0 0 4.272 4.265M7.934 115.033c4.381 0 7.933-3.546 7.933-7.92s-3.552-7.92-7.933-7.92S0 102.738 0 107.112s3.552 7.92 7.934 7.92"></path>
                        <g filter="url(#filter1_d_2572_8)">
                          <path
                            fill="url(#paint1_linear_2572_8)"
                            d="m159.892 44.967 1.221 98.093c0 3.351-2.746 5.94-6.103 5.94H59.197c-3.357 0-6.103-2.742-6.103-5.94V16.94c0-3.35 2.746-5.94 6.102-5.94h69.42z"></path>
                        </g>
                        <path
                          fill="#CED7E2"
                          d="M99.78 129.351h-3.508c-.763 0-1.374-.762-1.374-1.675 0-.914.61-1.676 1.374-1.676h3.509c.763 0 1.373.762 1.373 1.676 0 1.066-.61 1.675-1.373 1.675"></path>
                        <path
                          fill="#D5DDEA"
                          d="M89.099 129.351H68.654c-.763 0-1.373-.762-1.373-1.675 0-.914.61-1.676 1.373-1.676H89.1c.763 0 1.373.762 1.373 1.676 0 1.066-.61 1.675-1.373 1.675M115.188 31.563H69.265c-1.068 0-1.984-.914-1.984-1.98 0-1.067.916-1.98 1.984-1.98h45.923c1.068 0 1.983.913 1.983 1.98s-.915 1.98-1.983 1.98M86.963 42.53H69.265c-1.068 0-1.984-.914-1.984-1.98 0-1.067.916-1.98 1.984-1.98H86.81c1.068 0 1.983.913 1.983 1.98s-.915 1.98-1.83 1.98M128.617 11v27.113c0 3.807 3.357 6.854 7.171 6.854h24.106"></path>
                        <path
                          fill="#989FB0"
                          d="M167.217 151.285c-1.525 0-3.051-.609-4.272-1.98l-25.479-25.437-.915.609c-8.239 6.093-17.851 9.292-27.615 9.292-11.748 0-23.496-4.722-32.192-12.947-9.154-8.683-14.19-20.411-14.19-33.206 0-25.437 20.75-46.152 46.229-46.152 17.393 0 32.65 9.139 40.889 24.675 8.086 15.385 7.018 33.358-2.899 47.828l-.61.914 25.631 25.59c2.594 2.589 1.984 5.178 1.526 6.549-1.221 2.437-3.662 4.265-6.103 4.265m-58.434-97.179c-18.613 0-33.565 15.08-33.565 33.51 0 21.02 17.24 33.662 34.023 33.662 10.222 0 19.529-4.569 26.089-12.794 8.086-10.053 9.46-23.61 3.814-35.338-5.797-11.729-17.392-19.04-30.361-19.04"></path>
                        <path
                          fill="#989FB0"
                          d="M94.287 93.1c1.983 0 3.661-1.676 3.661-3.656s-1.678-3.656-3.661-3.656-3.662 1.676-3.662 3.656 1.678 3.655 3.662 3.655M122.361 93.1c1.983 0 3.662-1.676 3.662-3.656s-1.679-3.656-3.662-3.656c-1.984 0-3.662 1.676-3.662 3.656 0 2.132 1.678 3.655 3.662 3.655M94.145 77.35l-8.055 4.341 1.087 2.01 8.055-4.34zM121.86 77.292l-1.087 2.01 8.056 4.342 1.087-2.01zM108.323 101.63c2.359 0 4.272-1.432 4.272-3.199s-1.913-3.199-4.272-3.199-4.272 1.433-4.272 3.2c0 1.766 1.912 3.198 4.272 3.198"></path>
                        <path
                          stroke="#C9D4E2"
                          strokeDasharray="4 4"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                          d="M187.365 29.015c3.525 16.582 3.044 34.12-1.763 50.384-1.121 3.348-2.243 7.015-4.646 9.567-3.365 3.986-9.454 5.74-14.421 4.464-5.128-1.276-9.294-5.74-10.255-11.161-.802-3.348.32-7.335 3.204-9.407 3.045-1.914 7.371-1.435 9.935.956 2.884 2.392 4.006 6.06 3.845 9.567-.16 3.508-1.442 7.015-3.204 10.045-5.288 9.885-14.902 17.698-25.958 21.206-8.172 2.551-16.985 2.551-25.157.319"></path>
                        <path
                          fill="#DAE2EB"
                          d="M194.095 24.232c-.481 1.754-2.403 2.392-4.326 1.276-2.083-.957-3.525-1.754-3.205-3.349.481-1.594 2.404-1.754 4.647-1.913 2.724-.319 3.205 2.232 2.884 3.986M178.551 25.826c.801 1.435 3.044 2.392 4.647.957 1.762-1.594 3.204-2.71 2.403-4.305-.801-1.435-2.083-.957-4.807-.638-2.243.479-3.204 2.392-2.243 3.986"></path>
                        <path
                          fill="#989FB0"
                          d="M185.602 19.926c1.122-.16 2.244.478 2.564 1.435.16.319.321.797.321 1.116.32 2.232-.481 4.145-1.763 4.305-1.442.319-2.884-1.276-3.044-3.349V22c.16-1.117.801-1.914 1.922-2.073.161 0 0 0 0 0"></path>
                        <defs>
                          <linearGradient
                            id="paint0_linear_2572_8"
                            x1="81.499"
                            x2="119.465"
                            y1="22.719"
                            y2="22.719"
                            gradientUnits="userSpaceOnUse">
                            <stop stopColor="#B0BACC"></stop>
                            <stop
                              offset="1"
                              stopColor="#969EAE"></stop>
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_2572_8"
                            x1="107.068"
                            x2="107.068"
                            y1="7.808"
                            y2="150.488"
                            gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FDFEFF"></stop>
                            <stop
                              offset="0.996"
                              stopColor="#ECF0F5"></stop>
                          </linearGradient>
                          <filter
                            id="filter0_d_2572_8"
                            width="140.562"
                            height="139.348"
                            x="23.137"
                            y="17.537"
                            colorInterpolationFilters="sRGB"
                            filterUnits="userSpaceOnUse">
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"></feFlood>
                            <feColorMatrix
                              in="SourceAlpha"
                              result="hardAlpha"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                            <feOffset dy="11"></feOffset>
                            <feGaussianBlur stdDeviation="11"></feGaussianBlur>
                            <feColorMatrix values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"></feColorMatrix>
                            <feBlend
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_2572_8"></feBlend>
                            <feBlend
                              in="SourceGraphic"
                              in2="effect1_dropShadow_2572_8"
                              result="shape"></feBlend>
                          </filter>
                          <filter
                            id="filter1_d_2572_8"
                            width="152.02"
                            height="182"
                            x="31.094"
                            y="0"
                            colorInterpolationFilters="sRGB"
                            filterUnits="userSpaceOnUse">
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"></feFlood>
                            <feColorMatrix
                              in="SourceAlpha"
                              result="hardAlpha"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                            <feOffset dy="11"></feOffset>
                            <feGaussianBlur stdDeviation="11"></feGaussianBlur>
                            <feColorMatrix values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"></feColorMatrix>
                            <feBlend
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_2572_8"></feBlend>
                            <feBlend
                              in="SourceGraphic"
                              in2="effect1_dropShadow_2572_8"
                              result="shape"></feBlend>
                          </filter>
                        </defs>
                      </svg>
                      <p className=" font-semibold mt-[3vw] md:mt-[2vw] lg:mt-[1vw] text-[5vw] md:text-[2.8vw] lg:text-[1.3vw]">
                        There is no active link
                      </p>
                      <p className="text-center text-gray-400 text-[4vw] md:text-[2vw] lg:text-[1vw]">
                        Create and customize your ULink <br />
                        in minutes
                      </p>
                      <button
                        onClick={() => setSection("createNewLink")}
                        className="bg-[#2ac27c] rounded-lg flex p-[2vw] md:p-[1.5vw] lg:p-[1vw] px-[3vw] lg:px-[1vw] gap-[1.5vw] lg:gap-[.6vw] text-white text-lg items-center mt-[5vw] md:mt-[3.5vw] lg:mt-[2vw] hover:bg-green-600 transition-all">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[4.5vw] h-[4.5vw] md:w-[3vw] md:h-[3vw] lg:w-[1.5vw] lg:h-[1.5vw]"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            fill="#fff"
                            d="M12 1.25C6.072 1.25 1.25 6.073 1.25 12S6.072 22.75 12 22.75 22.75 17.927 22.75 12 17.928 1.25 12 1.25m0 20c-5.101 0-9.25-4.149-9.25-9.25S6.899 2.75 12 2.75s9.25 4.149 9.25 9.25-4.149 9.25-9.25 9.25M16.25 12a.75.75 0 0 1-.75.75h-2.75v2.75a.75.75 0 0 1-1.5 0v-2.75H8.5a.75.75 0 0 1 0-1.5h2.75V8.5a.75.75 0 0 1 1.5 0v2.75h2.75a.75.75 0 0 1 .75.75"></path>
                        </svg>
                        <p className="text-[4vw] md:text-[2.5vw] lg:text-[1.1vw] p-0">
                          create new link
                        </p>
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <MyLinks
                  links={links}
                  setShowRemoveLink={setShowRemoveLink}
                  setQrCode={setQrCode}
                />
              )}
            </>
          ) : section === "createNewLink" ? (
            <>
              {step === 1 ? (
                <CreateLinkStepOne setStep={setStep} />
              ) : (
                <CreateLinkStepTwo
                  setStep={setStep}
                  setSection={setSection}
                />
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {qrCode ? <QrCode setQrCode={setQrCode} value={qrCode} /> : ""}
    </div>
  );
};

export default Account;
