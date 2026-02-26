"use client";
import React, { useContext, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { LoginContext } from "../../context/LoginContext";

const RemoveLink = ({ showRemoveLink, setShowRemoveLink }) => {
  const [removeProgress, setRemoveProgress] = useState(false);
  const loginContext = useContext(LoginContext);

  const handleLogout = async () => {
    setRemoveProgress(true);
    try {
      const response = await axios.post(
        "https://ulink-back-431g.onrender.com/removeLink",
        {
          link: showRemoveLink,
          userId: loginContext.user._id,
        },
      );
      if (response.data.message === "OK") {
        // ابتدا modal را ببندیم
        loginContext.setUpdate((prev) => prev + 1);
        setRemoveProgress(false);
        setShowRemoveLink("");
        // سپس state را آپدیت کنیم
      } else {
        setRemoveProgress(false);
      }
    } catch (error) {
      console.log({ error });
      setRemoveProgress(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {showRemoveLink && (
        <motion.div
          key="remove-link-modal" // اضافه کردن key
          onClick={() => setShowRemoveLink("")}
          className="fixed w-[100vw] h-[100vh] bg-black/50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-[4vw] lg:p-[2vw] rounded-lg"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}>
            <div className="flex gap-[20vw] lg:gap-[10vw] justify-between items-center pb-[4vw] lg:pb-[2vw] border-b border-stone-200">
              <p className="text-[4.5vw] md:text-[2.5vw] lg:text-[1.2vw] font-semibold">
                Remove link
              </p>
              <X
                onClick={() => setShowRemoveLink("")}
                className="cursor-pointer w-[5.5vw] h-[5.5vw] md:w-[3.3vw]  md:h-[3.3vw] lg:w-[1.6vw]  lg:h-[1.6vw]"
                color="#194BFB"
              />
            </div>

            <p className="text-[#454C52] mt-[4vw] md:mt-[3vw] lg:mt-[2vw] text-[4vw] md:text-[2vw] lg:text-[1vw]">
              Are you sure you want to delete this link?
            </p>

            <div className="mt-[6vw] lg:mt-[2vw] flex gap-[2vw] lg:gap-[1vw] justify-between">
              <button
                onClick={() => handleLogout()}
                disabled={removeProgress}
                className="bg-[#F93D3D] text-white flex-1 rounded-lg p-[3vw] md:p-[2vw] lg:p-[1vw] hover:bg-[#D73232] transition-all text-[4vw] md:text-[2.2vw] lg:text-[1vw] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                {removeProgress ? (
                  <ClipLoader
                    color={"#fff"}
                    loading={true}
                    size={20}
                  />
                ) : (
                  "Remove"
                )}
              </button>
              <button
                onClick={() => setShowRemoveLink("")}
                disabled={removeProgress}
                className="bg-[#F6F7F9] flex-1 rounded-lg p-[3vw] md:p-[2.2vw] lg:p-[1vw] hover:bg-[#E1E3E8] transition-all text-[4vw] md:text-[2.2vw] lg:text-[1vw] disabled:opacity-50 disabled:cursor-not-allowed">
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RemoveLink;
