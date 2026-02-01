import React from "react";
import styles from "./addSection.module.css";
import Image from "next/image";
import { useState } from "react";
import EditSocialMedia from "./socialMedia/EditSociaMedia";
import EditCall from "./call/EditCall";
import EditLink from "./link/EditLink";
import EditSuperLink from "./sperLink/EditSuperLink";
import EditQuestion from "./question/EditQuestion";
import EditPayment from "./payment/EditPayment";
import EditMap from "./map/EditMap";
import EditText from "./text/EditText";
import EditVideo from "./video/EditVideo";
import EditBanner from "./banner/EditBanner";
import EditSlider from "./slider/EditSlider";
import EditMessenger from "./messenger/EditMessenger";
import EditLine from "./line/EditLine";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddSection = ({
  showAddSection,
  setShowAddSection,
  address,
  setUpdate,
}) => {
  // All sections for web Page
  const [blocks] = useState([
    {
      type: "messenger",
      name: "Messengers",
      description: "Direct access to all messaging apps",
      logo: "/icons/messengerColor.svg",
    },
    {
      type: "socialMedia",
      name: "Social Networks & Services",
      description: "Guide your audience to your social media accounts",
      logo: "/icons/socialMediaColor.svg",
    },
    {
      type: "call",
      name: "Contact & Communication",
      description: "Connect via mobile number, SMS, landline, and more",
      logo: "/icons/callColor.svg",
    },
    {
      type: "slider",
      name: "Images & Slider",
      description: "Ability to add images and sliders",
      logo: "/icons/sliderColor.svg",
    },
    {
      type: "banner",
      name: "Banner",
      description: "Clickable and linked images",
      logo: "/icons/bannerColor.svg",
    },
    {
      type: "video",
      name: "Video",
      description: "Add any type of video or clip",
      logo: "/icons/videoColor.svg",
    },
    {
      type: "link",
      name: "Link",
      description: "Ability to add a link",
      logo: "/icons/linkColor.svg",
    },
    {
      type: "superlink",
      name: "Superlink",
      description: "A link with text, icon, and animation",
      logo: "/icons/superLinkColor.svg",
    },
    {
      type: "map",
      name: "Map & Navigation",
      description: "Show your exact location on the map",
      logo: "/icons/mapColor.svg",
    },
    {
      type: "text",
      name: "Text or Description",
      description: "Any text including biography, description, and more",
      logo: "/icons/textColor.svg",
    },
    {
      type: "question",
      name: "FAQ",
      description: "Ready-made template for answering frequently asked questions",
      logo: "/icons/questionColor.svg",
    },
    {
      type: "payment",
      name: "Payment Link",
      description: "Direct payments to your wallet",
      logo: "/icons/paymentColor.svg",
    },
    {
      type: "line",
      name: "Separator",
      description: "Separate sections from each other",
      logo: "/icons/paymentColor.svg",
    },
  ]);

  // select section for add web page
  const [section, setSection] = useState("");

  return (
    <div>
      {section == "messenger" ? (
        <EditMessenger
          setSection={setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : section == "socialMedia" ? (
        <EditSocialMedia
          setSection={setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : section == "call" ? (
        <EditCall
          setSection={setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : section == "link" ? (
        <EditLink
          setSection={setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : section == "superlink" ? (
        <EditSuperLink
          setSection={setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : section == "question" ? (
        <EditQuestion
          setSection={setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : section == "payment" ? (
        <EditPayment
          setSection={setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : section == "map" ? (
        <EditMap
          setSection={setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : section == "text" ? (
        <EditText
          setSection={setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : section == "video" ? (
        <EditVideo
          setSection={setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : section == "banner" ? (
        <EditBanner
          setSection={setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : section == "slider" ? (
        <EditSlider
          setSection={setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : section == "line" ? (
        <EditLine
          setSection={setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : (
        ""
      )}

      {/* add section modal page */}
      <AnimatePresence>
        {showAddSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowAddSection(false)}
            className="fixed inset-0 w-full h-full bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className={styles.addSection}>
              <div className={styles.header}>
                <div className="flex items-center gap-2">
                  <Image width={20} height={20} src="/icons/zarbdar.svg" alt="" />
                  <p className="font-semibold text-lg">Add new section</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setShowAddSection(false)}
                  className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors">
                  <X size={20} color="#194BFB" />
                </motion.button>
              </div>

              <div className={styles.blocks}>
                {blocks.map((b, index) => (
                  <motion.div
                    key={b.type}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 8px 24px rgba(25, 75, 251, 0.12)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={styles.block}
                    onClick={() => {
                      setSection(b.type);
                      setShowAddSection(false);
                    }}>
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.3 }}>
                      <Image width={40} height={40} src={b.logo} alt={b.name} />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-gray-800">{b.name}</p>
                      <p className="text-sm text-gray-500">{b.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* end add section modal page */}
    </div>
  );
};

export default AddSection;