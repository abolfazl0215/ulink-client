import React, { useEffect } from "react";
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
import { useContext } from "react";
import { EditContext } from "./EditContext";
import EditLine from "./line/EditLine";

const AddSelectSection = ({
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
        "Guide your audience to your social media platforms",
      logo: "/icons/socialMediacolor.svg",
    },
    {
      type: "call",
      name: "Contact & Communication",
      description:
        "Connect via mobile number, SMS, landline, and more",
      logo: "/icons/callcolor.svg",
    },
    {
      type: "slider",
      name: "Images & Slider",
      description: "Add images or an image slider",
      logo: "/icons/sliderColor.svg",
    },
    {
      type: "banner",
      name: "Banner",
      description: "Clickable images with links",
      logo: "/icons/bannerColor.svg",
    },
    {
      type: "video",
      name: "Video",
      description: "Add videos or clips",
      logo: "/icons/videoColor.svg",
    },
    {
      type: "link",
      name: "Link",
      description: "Add any type of link",
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
      name: "Navigation",
      description: "Show your exact location on the map",
      logo: "/icons/mapColor.svg",
    },
    {
      type: "text",
      name: "Text or Description",
      description:
        "Add any text, including biography or descriptions",
      logo: "/icons/textColor.svg",
    },
    {
      type: "question",
      name: "FAQ",
      description:
        "A ready-made template for frequently asked questions",
      logo: "/icons/questionColor.svg",
    },
    {
      type: "payment",
      name: "Payment Link",
      description: "Direct payment to your wallet",
      logo: "/icons/paymentColor.svg",
    },
  ]);

  // select section for add web page
  // const [section, setSection] = useState("");

  const editContext = useContext(EditContext);

  useEffect(() => {
    console.log("============= : ", editContext.section);
  }, [editContext.section]);

  return (
    <div>
      {editContext.section == "messenger" ? (
        <EditMessenger
          setSection={editContext.setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : editContext.section == "socialMedia" ? (
        <EditSocialMedia
          setSection={editContext.setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : editContext.section == "call" ? (
        <EditCall
          setSection={editContext.setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : editContext.section == "link" ? (
        <EditLink
          setSection={editContext.setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : editContext.section == "superlink" ? (
        <EditSuperLink
          setSection={editContext.setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : editContext.section == "question" ? (
        <EditQuestion
          setSection={editContext.setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : editContext.section == "payment" ? (
        <EditPayment
          setSection={editContext.setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : editContext.section == "map" ? (
        <EditMap
          setSection={editContext.setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : editContext.section == "text" ? (
        <EditText
          setSection={editContext.setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : editContext.section == "video" ? (
        <EditVideo
          setSection={editContext.setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : editContext.section == "banner" ? (
        <EditBanner
          setSection={editContext.setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : editContext.section == "slider" ? (
        <EditSlider
          setSection={editContext.setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : editContext.section == "line" ? (
        <EditLine
          setSection={editContext.setSection}
          address={address}
          setUpdate={setUpdate}
        />
      ) : (
        ""
      )}
      {/* add editContext.sectionmodal page */}

      <div
        style={showAddSection ? { top: "2vh" } : {}}
        className={styles.addSection}>
        <div className={styles.header}>
          <Image width={16} height={16} src="/icons/zarbdar.svg" />
          <p>افزودن بخش جدید</p>
          <Image
            onClick={() => setShowAddSection(false)}
            width={16}
            height={16}
            src="/icons/zarbdar.svg"
          />
        </div>
        <div className={styles.blocks}>
          {blocks.map((b) => (
            <div
              className={styles.block}
              onClick={() => {
                editContext.setSection(b.type);
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
      {/* end add editContext.sectionmodal page */}
    </div>
  );
};

export default AddSelectSection;

// -----------------------------------
