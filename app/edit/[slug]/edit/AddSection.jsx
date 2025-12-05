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
      description:
        "Guide your audience to your social media accounts",
      logo: "/icons/socialMediaColor.svg",
    },
    {
      type: "call",
      name: "Contact & Communication",
      description:
        "Connect via mobile number, SMS, landline, and more",
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
      description:
        "Any text including biography, description, and more",
      logo: "/icons/textColor.svg",
    },
    {
      type: "question",
      name: "FAQ",
      description:
        "Ready-made template for answering frequently asked questions",
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
  // const [section, setSection] = useState("");

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
      {/* add sectionmodal page */}

      <div
        onClick={() => setShowAddSection(false)}
        style={
          showAddSection
            ? {
                // top: "0vh",
                display: "block",
                opacity: 1,
                transition: ".4s all ease-out",
                // boxShadow: "0 0 50px rgba(0, 0, 0, 0.714)",
              }
            : {}
        }
        className="fixed hidden opacity-0  w-[100vw] h-[100vh] bg-black/10 backdrop-blur-sm z-50">
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.addSection}>
          <div className={styles.header}>
            <Image width={16} height={16} src="/icons/zarbdar.svg" />
            <p>Add new section</p>
            <X
              onClick={() => setShowAddSection(false)}
              color="#194BFB"
              className="cursor-pointer"
            />
          </div>
          <div className={styles.blocks}>
            {blocks.map((b) => (
              <div
                className={styles.block}
                onClick={() => {
                  setSection(b.type);
                  setShowAddSection(false);
                }}>
                <Image width={16} height={16} src={b.logo} />
                <div>
                  <p>{b.name}</p>
                  <p>{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* end add sectionmodal page */}
    </div>
  );
};

export default AddSection;

// -----------------------------------
