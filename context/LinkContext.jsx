"use client";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoginContext } from "./LoginContext";

export const LinkContext = createContext({
  update: "",
  setUpdate: () => {},
  link: "",
  setLink: () => {},
  image: "",
  setImage: () => {},
  title: "",
  setTitle: () => {},
  subTitle: "",
  setSubTitle: () => {},
  job: "",
  setJob: () => {},
  addLink: () => {},
  loading: "",
  setLoading: () => {},
  preview: "",
  setPreview: () => {},
  section: "",
  setSection: () => {},
  step: "",
  setStep: () => {},
});

const LinkContextComponent = ({ children }) => {
  const [update, setUpdate] = useState(0);
  const [link, setLink] = useState("");
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [job, setJob] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [section, setSection] = useState("myLinks");
  const [step, setStep] = useState(1);

  const loginContext = useContext(LoginContext);
  const router = useRouter();

  const addLink = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // تبدیل فایل به Base64
      // const base64 = await fileToBase64(image);

      // console.log("step1");
      const formData = new FormData();
      // console.log(image);
      formData.append("image", image); // فایل اصلی
      // console.log("step2");

      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      // آپلود تصویر
      const response = await axios.post(
        "https://ulink-back-431g.onrender.com/upload2",
        formData, // فایل + سایر فیلدها
        {
          timeout: 30000,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) /
                (progressEvent.total || 1),
            );
            console.log("Upload Progress:", percent, "%");
          },
        },
      );

      // ساخت لینک جدید
      const response2 = await axios.post(
        "https://ulink-back-431g.onrender.com/newLink",
        {
          userId: loginContext.user._id,
          title,
          mainImage: response.data.link,
          subTitle,
          job,
          address: link,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      console.log(response2.data);

      // موفقیت
      setLoading(false);
      loginContext.setUpdate((prev) => prev + 1);
      toast.success("link created successfully");

      // پاک کردن فرم
      setSection("myLinks");
      setStep(1);
      setLink("");
      setTitle("");
      setImage();
      setSubTitle("");
      setJob("");
    } catch (error) {
      console.error(error);
      toast.error("خطا در ارسال به سرور");
      setLoading(false);
    }
  };

  // تابع تبدیل فایل به Base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <LinkContext.Provider
      value={{
        update,
        setUpdate,
        link,
        setLink,
        image,
        setImage,
        title,
        setTitle,
        subTitle,
        setSubTitle,
        job,
        setJob,
        addLink,
        loading,
        setLoading,
        preview,
        setPreview,
        section,
        setSection,
        step,
        setStep,
      }}>
      {children}
    </LinkContext.Provider>
  );
};

export default LinkContextComponent;
