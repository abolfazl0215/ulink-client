"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const Logout = ({ showLogout, setShowLogout }) => {
  const [logoutProcess, setLogoutProcess] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setLogoutProcess(true);
    try {
      const response = await axios.get(
        "https://ulinkkk.liara.run/logout",
        {
          withCredentials: true,
        },
      );
      console.log("dataaaaaa :", response.data);
      if (response.data.logout) {
        setLogoutProcess(false);
        router.push("/login");
      } else {
        setLogoutProcess(false);
      }
    } catch (error) {
      console.log({ error });
      setLogoutProcess(false);
    } finally {
      setLogoutProcess(false);
    }
  };
  return (
    <AnimatePresence>
      {showLogout && (
        <motion.div
          onClick={() => setShowLogout(false)}
          className="fixed w-[100vw] h-[100vh] bg-black/50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
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
                Log out of the account
              </p>
              <X
                onClick={() => setShowLogout(false)}
                className="cursor-pointer w-[5.5vw] h-[5.5vw] md:w-[3.3vw]  md:h-[3.3vw] lg:w-[1.6vw]  lg:h-[1.6vw]"
                color="#194BFB"
              />
            </div>

            <p className="text-[#454C52] mt-[4vw] md:mt-[3vw] lg:mt-[2vw] text-[4vw] md:text-[2vw] lg:text-[1vw]">
              Are you logging out of your account?
            </p>

            <div className="mt-[6vw] md:mt-[3.5vw] lg:mt-[2vw] flex gap-[2vw] lg:gap-[1vw] justify-between">
              <button
                onClick={() => handleLogout()}
                className="bg-[#F93D3D] text-white flex-1 rounded-lg p-[3vw] md:p-[2vw] lg:p-[1vw] hover:bg-[#D73232] transition-all  text-[4vw] md:text-[2.2vw] lg:text-[1vw]">
                {logoutProcess ? (
                  <ClipLoader
                    color={"#fff"}
                    loading={true}
                    size={20}
                  />
                ) : (
                  "Yes"
                )}
              </button>
              <button
                onClick={() => setShowLogout(false)}
                className="bg-[#F6F7F9] flex-1 rounded-lg p-[3vw] md:p-[2.2vw] lg:p-[1vw] hover:bg-[#E1E3E8] transition-all text-[4vw] md:text-[2vw] lg:text-[1vw]">
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Logout;
