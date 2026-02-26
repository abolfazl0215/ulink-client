"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  GripVertical,
  Trash2,
  Upload,
  Link as LinkIcon,
  Sparkles,
} from "lucide-react";

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
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [link, setLink] = useState("");
  const [animation, setAnimation] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    if (!showSelectSection) {
      const obj = {};
      obj[selectedMessenger[0].id] = true;
      setShowSelectSection(obj);
    }
  }, []);

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
    const copyselectedMessenger = [...selectedMessenger];
    const filtered = copyselectedMessenger.filter((f) => f.id != id);
    setSelectedMessenger(filtered);
  };

  const handleSubmit = async () => {
    if (!image || !link) {
      return toast.error("Please enter the required fields");
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      setLoading(true);
      const response = await axios.post(
        "https://ulink-back-431g.onrender.com/upload2",
        formData,
      );
      try {
        const res = await axios.post(
          "https://ulink-back-431g.onrender.com/addMessenger",
          {
            address,
            type: "banner",
            animation,
            imageUrl: `${response.data.link}`,
            link,
            uniqueId: uuidv4(),
            blocks: [],
          },
        );
        setUpdate((prev) => prev + 1);
        setLoading(false);
        setSection("");
        toast.success("Operation successful");
      } catch (error) {
        toast.error("An error occurred");
        setLoading(false);
        console.log(error);
      }
    } catch (error) {
      toast.error("Error saving the image");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed top-[2vh] right-[2%] w-[96%] md:right-[35%] md:w-[30%] h-[96vh] bg-[#ededed] z-[9000] rounded-[5vw] md:rounded-[2vw] shadow-[0_0_50px_rgba(0,0,0,0.714)] border-t border-gray-400 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-[2vw] md:px-8 h-[8vh] bg-white text-2xl font-semibold border-b border-gray-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30"></div>
          <h2 className="text-xl font-bold text-gray-800">Banner</h2>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSection("")}
          className="p-2 hover:bg-red-50 rounded-lg transition-colors group">
          <X
            size={20}
            className="text-gray-600 group-hover:text-red-500 transition-colors"
          />
        </motion.button>
      </div>

      {/* Form */}
      <form
        ref={containerRef}
        className="px-[3vw] md:px-8 pt-4 h-[83vh] overflow-y-scroll pb-[200px]">
        {selectedMessenger.map((d, index) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-white rounded-lg md:rounded-3xl overflow-hidden mb-4 ${
              (!link || !image) && isSubmit
                ? "border-2 border-red-500 bg-red-50"
                : "border border-gray-300"
            }`}>
            {/* Block Header */}
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
              className="flex justify-between items-center pl-12 border-b border-gray-300 cursor-pointer">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 cursor-grab active:cursor-grabbing ${
                    (!link || !image) && isSubmit
                      ? "bg-red-600"
                      : "bg-[#2ac27c]"
                  }`}
                  onPointerDown={(e) => dragStart(e, index)}>
                  <GripVertical size={18} className="text-white" />
                </motion.div>
                <p className="font-semibold text-gray-700 text-lg">
                  {d.faName}
                </p>
              </div>

              {index !== 0 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(d.id);
                  }}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors group">
                  <Trash2
                    size={18}
                    className="text-gray-400 group-hover:text-red-500 transition-colors"
                  />
                </motion.button>
              )}
            </div>

            {/* Block Body */}
            <AnimatePresence>
              {showSelectSection && showSelectSection[d.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 pb-6">
                  {/* Link Input */}
                  <div className="flex items-center gap-2 mb-2">
                    <LinkIcon size={16} className="text-blue-500" />
                    <label className="text-sm font-semibold text-gray-700">
                      Banner link:
                    </label>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => setLink(e.target.value)}
                    value={link}
                    placeholder="Enter your banner link..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-base"
                  />
                  {!link && isSubmit && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 mt-2 block">
                      Please enter your banner link
                    </motion.span>
                  )}

                  {/* Image Upload */}
                  <div className="flex items-center gap-2 mb-2 mt-6">
                    <Upload size={16} className="text-blue-500" />
                    <label className="text-sm font-semibold text-gray-700">
                      Banner image
                    </label>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={(e) => {
                      e.preventDefault();
                      fileInputRef.current.click();
                    }}
                    className="w-full min-h-[200px] border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-all overflow-hidden group relative">
                    {preview ? (
                      <div className="relative w-full h-full">
                        <Image
                          width={400}
                          height={200}
                          src={preview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white font-medium">
                            Click to change image
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                        <Upload
                          size={40}
                          className="text-gray-400 group-hover:text-blue-500 transition-colors"
                        />
                        <p className="font-medium">
                          Upload an image for the banner
                        </p>
                        <p className="text-sm text-gray-400">
                          Click or drag and drop
                        </p>
                      </div>
                    )}
                  </motion.button>
                  {!image && isSubmit && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 mt-2">
                      This field is required
                    </motion.p>
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
                      } else {
                        setImage(null);
                      }
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Animations Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full mb-4 ">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 ">
            <Sparkles size={18} className="text-purple-500" />
            <p className="font-semibold text-gray-700">Animation</p>
          </div>

          {/* Animation Buttons */}
          <div className="w-full flex flex-wrap  justify-between">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAnimation("")}
              className={`w-[48%] mb-2 p-4 text-center bg-gradient-to-tr from-[#0272f1] to-[#2f90ff] text-white rounded-xl cursor-pointer font-medium relative overflow-hidden ${
                animation == "" ? "ring-4 ring-yellow-400" : ""
              }`}>
              No Animation
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAnimation("blinking_element")}
              className={`w-[48%] mb-2 p-4 text-center bg-gradient-to-tr from-[#0272f1] to-[#2f90ff] text-white rounded-xl cursor-pointer font-medium relative overflow-hidden ${
                animation == "blinking_element"
                  ? "ring-4 ring-yellow-400"
                  : ""
              }`}>
              <span className="relative z-10">1</span>
              <span className="absolute top-[-20%] left-[-20%] w-[20%] h-[160%] bg-white rotate-[20deg] animate-[blink_3s_infinite_linear]" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAnimation("shake")}
              className={`w-[48%] mb-2 p-4 text-center bg-gradient-to-tr from-[#0272f1] to-[#2f90ff] text-white rounded-xl cursor-pointer font-medium animate-[shake_3s_infinite] ${
                animation == "shake" ? "ring-4 ring-yellow-400" : ""
              }`}>
              2
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAnimation("rotate")}
              className={`w-[48%] mb-2 p-4 text-center bg-gradient-to-tr from-[#0272f1] to-[#2f90ff] text-white rounded-xl cursor-pointer font-medium animate-[rotate_3s_infinite] ${
                animation == "rotate" ? "ring-4 ring-yellow-400" : ""
              }`}>
              3
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAnimation("shakeX")}
              className={`w-[48%] mb-2 p-4 text-center bg-gradient-to-tr from-[#0272f1] to-[#2f90ff] text-white rounded-xl cursor-pointer font-medium animate-[shakeX_3s_infinite] ${
                animation == "shakeX" ? "ring-4 ring-yellow-400" : ""
              }`}>
              4
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAnimation("shakeY")}
              className={`w-[48%] mb-2 p-4 text-center bg-gradient-to-tr from-[#0272f1] to-[#2f90ff] text-white rounded-xl cursor-pointer font-medium animate-[shakeY_3s_infinite] ${
                animation == "shakeY" ? "ring-4 ring-yellow-400" : ""
              }`}>
              5
            </motion.div>
          </div>
        </motion.div>
      </form>

      {/* Action Buttons */}
      <div className="fixed bottom-4 right-[2vw] w-[96vw]  md:right-[35vw] md:w-[30vw] px-4 py-3 z-[10000] bg-white flex justify-end border-t border-gray-300 rounded-b-[2vw]">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSection("")}
          className="px-6 py-3 rounded-3xl border-2 border-gray-300 text-blue-600 font-semibold hover:bg-gray-50 transition-all mr-4">
          Cancel
        </motion.button>
        {!loading ? (
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 24px rgba(25, 75, 251, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            onClick={() => {
              setIsSubmit(true);
              handleSubmit();
            }}
            className="px-6 py-3 rounded-3xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all">
            Save
          </motion.button>
        ) : (
          <button
            type="submit"
            className="px-6 py-3 rounded-3xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold flex items-center justify-center">
            <BeatLoader color={"#fff"} loading={true} size={10} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Step2;
