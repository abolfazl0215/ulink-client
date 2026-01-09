"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { available } from "./available";
import styles from "./drag.module.css";
import "./index.css";
import Messenger from "./Messenger";
import Call from "./call";
import Slider from "./Slider";
import Banner from "./Banner";
import Preview from "./Preview";
import Video from "./Video";
import Link from "./Link";
import SuperLink from "./SuperLink";
import Map from "./Map";
import Text from "./Text";
import Questions from "./Questions";
import Payment from "./Payment";
import SocialMedia from "./SocialMedia";
import AddSection from "./edit/AddSection";
import Navbar from "../../../Components/Navbar/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import AddSelectSection from "./selectEdit/AddSelectSection";
import EditContextComponent, {
  EditContext,
} from "./selectEdit/EditContext";
import Loading from "../../../Components/Loading/Loading";
import { useRouter } from "next/navigation";
import { LoginContext } from "../../../context/LoginContext";
import Cookies from "js-cookie";
import Line from "./Line";
import Theme from "./theme/Theme";
import Font from "./font/Font";
import localFont from "next/font/local";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

const mikhak = localFont({
  src: [
    {
      path: "./fonts/mikhak/Mikhak-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/mikhak/Mikhak-SemiBold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/mikhak/Mikhak-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/mikhak/Mikhak-ExtraBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/mikhak/Mikhak-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/mikhak/Mikhak-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});
const aseman = localFont({
  src: [
    {
      path: "./fonts/aseman/Aseman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/aseman/Aseman.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/aseman/Aseman.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/aseman/Aseman.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/aseman/Aseman.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/aseman/Aseman.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});
const estedad = localFont({
  src: [
    {
      path: "./fonts/estedad/Estedad-Medium.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/estedad/Estedad-Bold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/estedad/Estedad-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/estedad/Estedad-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/estedad/Estedad-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/estedad/Estedad-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});
const yekan = localFont({
  src: [
    {
      path: "./fonts/yekan/YekanBakh-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/yekan/YekanBakh-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/yekan/YekanBakh-ExtraBlack.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/yekan/YekanBakh-ExtraBold.woff2",
      weight: "700",
      style: "normal",
    },
    // {
    //   path: "./fonts/yekan/YekanBakh-Light.woff2",
    //   weight: "700",
    //   style: "normal",
    // },
    {
      path: "./fonts/yekan/YekanBakh-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/yekan/YekanBakh-SemiBold.woff2",
      weight: "500",
      style: "normal",
    },
    // {
    //   path: "./fonts/yekan/YekanBakh-Thin.woff2",
    //   weight: "700",
    //   style: "normal",
    // },
  ],
  display: "swap",
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Drag = ({ params }) => {
  const [data, setData] = useState([
    {
      type: "loading",
    },
  ]);
  const [dataForPreview, setDataForPreview] = useState(null);
  const [isDragging, setIsDragging] = useState();
  const [showPreview, setShowPreview] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  // const [showJsx, setShowJsx] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const [showFonts, setShowFonts] = useState(false);
  const [theme, setTheme] = useState("");

  const [font, setFont] = useState("");
  // const [showJsx, setShowJsx] = useState(false);
  const [update, setUpdate] = useState(0);
  const [showAddSelectSection, setShowAddSelectSection] =
    useState(false);
  const [update2, setUpdate2] = useState(0);

  const router = useRouter();
  const loginContext = useContext(LoginContext);
  const editContext = useContext(EditContext);

  const getData = async () => {
    console.log("get starttt");
    const response = await axios.post(
      "https://http://localhost:3001/getLink",
      {
        link: params.slug,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response);
    setData(response.data.link.sections);
    setDataForPreview(response.data.link);
    setTheme(response.data.link.theme);
    setFont(response.data.link.font);
    // setShowJsx(true);
    // console.log("daaaaaataaaaa:", response.data);
  };

  useEffect(() => {
    if (!loginContext.user) {
      toast.error("ابتدا وارد شوید");
      router.push("/login");
    }
    if (
      loginContext.user &&
      loginContext.user.links &&
      loginContext.user.links[0] &&
      !loginContext.user.links.find((f) => f == params.slug)
    ) {
      toast.error("شما اجازه تغییر این لینک را ندارید");
      router.push("/");
    }
  });

  const checkToken = async () => {
    try {
      const response = await axios.get(
        "https://http://localhost:3001/checkExistUser",
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

  useEffect(() => {
    getData();
  }, [update]);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [update2]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     editContext.setSection("");
  //   }, 500);
  // }, [data]);

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const updatedItems = reorder(
      data,
      result.source.index,
      result.destination.index,
    );

    if (updatedItems[0].type !== "information") {
      return [];
    }
    console.log({ data });
    console.log({ updatedItems });

    setData(updatedItems);
    setDataForPreview((f) => ({ ...f, sections: updatedItems }));

    try {
      const res = await axios.post(
        "https://http://localhost:3001/setDrag",
        {
          address: params.slug,
          sections: updatedItems,
        },
        { headers: { "Content-Type": "application/json" } },
      );
      toast.success("Changes have been applied");
    } catch (error) {
      console.log(error);
      toast.error("Changes were not saved");
    }
  };

  if (!showPreview) {
    return (
      <>
        {/* <div>.</div> */}
        <div
          className={
            font == "estedad"
              ? estedad.className
              : font == "mikhak"
              ? mikhak.className
              : font == "aseman"
              ? aseman.className
              : font == "yekan"
              ? yekan.className
              : ""
          }>
          {/* <Navbar /> */}
          <AddSection
            setShowAddSection={setShowAddSection}
            showAddSection={showAddSection}
            address={params.slug}
            setUpdate={setUpdate}
          />
          <AddSelectSection
            setShowAddSection={setShowAddSelectSection}
            showAddSection={showAddSelectSection}
            address={params.slug}
            setUpdate={setUpdate2}
          />
          <Theme
            setShowMenu={setShowMenu}
            address={params.slug}
            setUpdate={setUpdate2}
            showTheme={showTheme}
            setShowTheme={setShowTheme}
          />
          <Font
            setShowMenu={setShowMenu}
            address={params.slug}
            setUpdate={setUpdate2}
            showTheme={showFonts}
            setShowTheme={setShowFonts}
          />

          <div
            className={styles.addButtonContainer}
            style={showMenu ? { bottom: 0 } : {}}>
            <button
              style={showMenu ? { transform: "rotate(45deg)" } : {}}
              onClick={() => setShowMenu(!showMenu)}>
              +
            </button>
            <div>
              <p
                className="text-center w-[10vw] p-[1vw] border border-[#1212E2] rounded-lg text-[1.1vw] text-[#1212E2] hover:bg-[#1212E2] hover:text-white transition-all cursor-pointer mb-[1vw]"
                onClick={() => {
                  setShowAddSection(true);
                  setShowMenu(false);
                }}>
                New section
              </p>

              <p
                className="text-center w-[10vw] p-[1vw] border border-[#1212E2] rounded-lg text-[1.1vw] text-[#1212E2] hover:bg-[#1212E2] hover:text-white transition-all cursor-pointer mb-[1vw]"
                onClick={() => {
                  setShowTheme(true);
                }}>
                Theme
              </p>
              <p
                className="text-center w-[10vw] p-[1vw] border border-[#1212E2] rounded-lg text-[1.1vw] text-[#1212E2] hover:bg-[#1212E2] hover:text-white transition-all cursor-pointer mb-[1vw]"
                onClick={() => {
                  setShowFonts(true);
                }}>
                Font
              </p>
              <p
                className="text-center w-[10vw] p-[1vw] border border-[#1212E2] rounded-lg text-[1.1vw] text-[#1212E2] hover:bg-[#1212E2] hover:text-white transition-all cursor-pointer mb-[1vw]"
                onClick={() => {
                  setShowPreview(true);
                  setShowMenu(false);
                }}>
                Preview
              </p>
            </div>
          </div>

          <div className={`${styles[theme]} ${styles.themeContane}`}>
            {/* animatin 1 */}
            <div
              style={
                theme == "bg_animation_1" ? {} : { display: "none" }
              }
              className={`${styles.light} ${styles.x1}`}></div>
            <div
              style={
                theme == "bg_animation_1" ? {} : { display: "none" }
              }
              className={`${styles.light} ${styles.x2}`}></div>
            <div
              style={
                theme == "bg_animation_1" ? {} : { display: "none" }
              }
              className={`${styles.light} ${styles.x3}`}></div>
            <div
              style={
                theme == "bg_animation_1" ? {} : { display: "none" }
              }
              className={`${styles.light} ${styles.x4}`}></div>
            <div
              style={
                theme == "bg_animation_1" ? {} : { display: "none" }
              }
              className={`${styles.light} ${styles.x5}`}></div>
            <div
              style={
                theme == "bg_animation_1" ? {} : { display: "none" }
              }
              className={`${styles.light} ${styles.x6}`}></div>
            <div
              style={
                theme == "bg_animation_1" ? {} : { display: "none" }
              }
              className={`${styles.light} ${styles.x7}`}></div>
            <div
              style={
                theme == "bg_animation_1" ? {} : { display: "none" }
              }
              className={`${styles.light} ${styles.x8}`}></div>
            <div
              style={
                theme == "bg_animation_1" ? {} : { display: "none" }
              }
              className={`${styles.light} ${styles.x9}`}></div>
            {/* end animatin 1 */}
            {/* animation2 */}
            {/* <section className={styles.bg_2}> */}
            <div
              style={
                theme == "bg_animation_2" ? {} : { display: "none" }
              }
              className={styles.bg2}>
              <div className={`${styles.air} ${styles.air1}`}></div>
              <div className={`${styles.air} ${styles.air2}`}></div>
              <div className={`${styles.air} ${styles.air3}`}></div>
              <div className={`${styles.air} ${styles.air4}`}></div>
            </div>
            {/* </section> */}
            {/* end animation2 */}
            {/* animation 3 */}
            <div
              style={
                theme == "bg_animation_3" ? {} : { display: "none" }
              }
              className={styles.area}>
              <ul className={styles.circles}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            {/* end animation 3 */}
            {/*  animation 4 */}
            {/* <div id="bg-wrap" className={styles.bg_animation_4}> */}
            <div
              style={
                theme == "bg_animation_4" ? {} : { display: "none" }
              }
              className={styles.bg4}>
              <svg
                viewBox="0 0 100 150"
                preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient
                    id="Gradient1"
                    cx="50%"
                    cy="50%"
                    fx="0.441602%"
                    fy="50%"
                    r=".5">
                    <animate
                      attributeName="fx"
                      dur="34s"
                      values="0%;3%;0%"
                      repeatCount="indefinite"></animate>
                    <stop
                      offset="0%"
                      stop-color="rgba(255, 0, 255, 1)"></stop>
                    <stop
                      offset="100%"
                      stop-color="rgba(255, 0, 255, 0)"></stop>
                  </radialGradient>
                  <radialGradient
                    id="Gradient2"
                    cx="50%"
                    cy="50%"
                    fx="2.68147%"
                    fy="50%"
                    r=".5">
                    <animate
                      attributeName="fx"
                      dur="23.5s"
                      values="0%;3%;0%"
                      repeatCount="indefinite"></animate>
                    <stop
                      offset="0%"
                      stop-color="rgba(255, 255, 0, 1)"></stop>
                    <stop
                      offset="100%"
                      stop-color="rgba(255, 255, 0, 0)"></stop>
                  </radialGradient>
                  <radialGradient
                    id="Gradient3"
                    cx="50%"
                    cy="50%"
                    fx="0.836536%"
                    fy="50%"
                    r=".5">
                    <animate
                      attributeName="fx"
                      dur="21.5s"
                      values="0%;3%;0%"
                      repeatCount="indefinite"></animate>
                    <stop
                      offset="0%"
                      stop-color="rgba(0, 255, 255, 1)"></stop>
                    <stop
                      offset="100%"
                      stop-color="rgba(0, 255, 255, 0)"></stop>
                  </radialGradient>
                  <radialGradient
                    id="Gradient4"
                    cx="50%"
                    cy="50%"
                    fx="4.56417%"
                    fy="50%"
                    r=".5">
                    <animate
                      attributeName="fx"
                      dur="23s"
                      values="0%;5%;0%"
                      repeatCount="indefinite"></animate>
                    <stop
                      offset="0%"
                      stop-color="rgba(0, 255, 0, 1)"></stop>
                    <stop
                      offset="100%"
                      stop-color="rgba(0, 255, 0, 0)"></stop>
                  </radialGradient>
                  <radialGradient
                    id="Gradient5"
                    cx="50%"
                    cy="50%"
                    fx="2.65405%"
                    fy="50%"
                    r=".5">
                    <animate
                      attributeName="fx"
                      dur="24.5s"
                      values="0%;5%;0%"
                      repeatCount="indefinite"></animate>
                    <stop
                      offset="0%"
                      stop-color="rgba(0,0,255, 1)"></stop>
                    <stop
                      offset="100%"
                      stop-color="rgba(0,0,255, 0)"></stop>
                  </radialGradient>
                  <radialGradient
                    id="Gradient6"
                    cx="50%"
                    cy="50%"
                    fx="0.981338%"
                    fy="50%"
                    r=".5">
                    <animate
                      attributeName="fx"
                      dur="25.5s"
                      values="0%;5%;0%"
                      repeatCount="indefinite"></animate>
                    <stop
                      offset="0%"
                      stop-color="rgba(255,0,0, 1)"></stop>
                    <stop
                      offset="100%"
                      stop-color="rgba(255,0,0, 0)"></stop>
                  </radialGradient>
                </defs>
                {/* <!--<rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient4)">
  <animate attributeName="x" dur="20s" values="25%;0%;25%" repeatCount="indefinite" />
  <animate attributeName="y" dur="21s" values="0%;25%;0%" repeatCount="indefinite" />
  <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="17s" repeatCount="indefinite"/>
  </rect>
  <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient5)">
  <animate attributeName="x" dur="23s" values="0%;-25%;0%" repeatCount="indefinite" />
  <animate attributeName="y" dur="24s" values="25%;-25%;25%" repeatCount="indefinite" />
  <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="18s" repeatCount="indefinite"/>
  </rect>
  <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient6)">
  <animate attributeName="x" dur="25s" values="-25%;0%;-25%" repeatCount="indefinite" />
  <animate attributeName="y" dur="26s" values="0%;-25%;0%" repeatCount="indefinite" />
  <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="19s" repeatCount="indefinite"/>
  </rect> */}
                <rect
                  x="13.744%"
                  y="1.18473%"
                  width="100%"
                  height="100%"
                  fill="url(#Gradient1)"
                  transform="rotate(334.41 50 50)">
                  <animate
                    attributeName="x"
                    dur="20s"
                    values="25%;0%;25%"
                    repeatCount="indefinite"></animate>
                  <animate
                    attributeName="y"
                    dur="21s"
                    values="0%;25%;0%"
                    repeatCount="indefinite"></animate>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur="7s"
                    repeatCount="indefinite"></animateTransform>
                </rect>
                <rect
                  x="-2.17916%"
                  y="35.4267%"
                  width="100%"
                  height="100%"
                  fill="url(#Gradient2)"
                  transform="rotate(255.072 50 50)">
                  <animate
                    attributeName="x"
                    dur="23s"
                    values="-25%;0%;-25%"
                    repeatCount="indefinite"></animate>
                  <animate
                    attributeName="y"
                    dur="24s"
                    values="0%;50%;0%"
                    repeatCount="indefinite"></animate>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur="12s"
                    repeatCount="indefinite"></animateTransform>
                </rect>
                <rect
                  x="9.00483%"
                  y="14.5733%"
                  width="100%"
                  height="100%"
                  fill="url(#Gradient3)"
                  transform="rotate(139.903 50 50)">
                  <animate
                    attributeName="x"
                    dur="25s"
                    values="0%;25%;0%"
                    repeatCount="indefinite"></animate>
                  <animate
                    attributeName="y"
                    dur="12s"
                    values="0%;25%;0%"
                    repeatCount="indefinite"></animate>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="360 50 50"
                    to="0 50 50"
                    dur="9s"
                    repeatCount="indefinite"></animateTransform>
                </rect>
              </svg>
            </div>
            {/* </div> */}
            {/* end animation 4 */}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ backgroundColor: "#2ac27c00" }}
                    className={`${styles.container}`}>
                    {data.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            // style={getItemStyle(
                            //   snapshot.isDragging,
                            //   provided.draggableProps.style,
                            // )}
                            className={styles.containerBox}>
                            {item.type &&
                            item.type == "information" ? (
                              ""
                            ) : (
                              <div className={styles.dargIcon}>
                                <Image
                                  width={100}
                                  height={100}
                                  src="/icons/drag2.svg"
                                />
                              </div>
                            )}
                            {item.type &&
                            item.type == "information" ? (
                              <div className={styles.information}>
                                <Image
                                  width={100}
                                  height={100}
                                  src={item.imageUrl}
                                  draggable="false"
                                />
                                <p
                                  style={
                                    theme == "bg_animation_1"
                                      ? {
                                          color: "#fff",
                                        }
                                      : theme == "bg_animation_3"
                                      ? {
                                          color: "#fff",
                                        }
                                      : {}
                                  }>
                                  {item.title}
                                </p>
                                <p
                                  style={
                                    theme == "bg_animation_1"
                                      ? {
                                          color: "#fff",
                                        }
                                      : theme == "bg_animation_3"
                                      ? {
                                          color: "#fff",
                                        }
                                      : theme == "bg_animation_2"
                                      ? {
                                          color: "#deeafc",
                                        }
                                      : {}
                                  }>
                                  {item.subTitle}
                                </p>
                              </div>
                            ) : item.type &&
                              item.type == "loading" ? (
                              <div style={{ marginTop: "30vh" }}>
                                <Loading />
                              </div>
                            ) : item.type &&
                              item.type == "messenger" ? (
                              <Messenger item={item} theme={theme} />
                            ) : item.type &&
                              item.type == "socialmedia" ? (
                              <SocialMedia
                                item={item}
                                theme={theme}
                              />
                            ) : item.type && item.type == "call" ? (
                              <Call item={item} theme={theme} />
                            ) : item.type && item.type == "slider" ? (
                              <Slider item={item} theme={theme} />
                            ) : item.type && item.type == "banner" ? (
                              <Banner item={item} theme={theme} />
                            ) : item.type && item.type == "video" ? (
                              <Video item={item} theme={theme} />
                            ) : item.type && item.type == "link" ? (
                              <Link item={item} theme={theme} />
                            ) : item.type &&
                              item.type == "superlink" ? (
                              <SuperLink item={item} theme={theme} />
                            ) : item.type && item.type == "map" ? (
                              <Map item={item} theme={theme} />
                            ) : item.type && item.type == "text" ? (
                              <Text item={item} theme={theme} />
                            ) : item.type &&
                              item.type == "question" ? (
                              <Questions item={item} theme={theme} />
                            ) : item.type &&
                              item.type == "payment" ? (
                              <Payment item={item} theme={theme} />
                            ) : item.type && item.type == "line" ? (
                              <Line
                                item={item}
                                theme={theme}
                                update={update}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div
        className={styles.preview}
        style={
          showPreview
            ? {
                display: "inline-block",
                boxShadow: "0 0 50px rgba(0, 0, 0, 0.714)",
              }
            : {
                display: "none",
                boxShadow: "0 0 0px rgba(0, 0, 0, 0)",
              }
        }>
        {/* <iframe
  src={`https:hamrahlink.com/${params.slug}`}
  title="preview"></iframe> */}
        <Preview address={params.slug} data={dataForPreview} />
        <button
          className={styles.closeButton}
          onClick={() => setShowPreview(false)}>
          <Image src="/icons/zarbdar.svg" width={16} height={16} />
        </button>
      </div>
    );
  }
};

export default Drag;
