"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "./admin.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import imageCompression from "browser-image-compression";

const Gallery = () => {
  const [isSubmit, setIsSubmit] = useState(false);

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [gallery, setGallery] = useState([]);
  const [pass, setPass] = useState();
  const [update, setUpdate] = useState(0);
  const fileInputRef = useRef();

  const getGallery = async () => {
    const res = await axios.get(
      "https://ulinkkk.liara.run/getGallery",
    );
    if (res.data.gallery && res.data.gallery[0]) {
      setGallery(res.data.gallery[0].url);
    }
    // res.data.gallery[0].url
  };

  useEffect(() => {
    getGallery();
  }, []);
  useEffect(() => {
    getGallery();
  }, [update]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      return toast.error("لطفا یک تصویر انتخاب کنید");
    }

    // تنظیمات فشرده‌سازی
    const options = {
      maxSizeMB: 1, // حداکثر حجم تصویر پس از فشرده‌سازی (به مگابایت)
      maxWidthOrHeight: 500, // حداکثر عرض یا ارتفاع تصویر
      useWebWorker: true,
    };

    // فشرده‌سازی تصویر
    const compressedFile = await imageCompression(image, options);

    // تبدیل به Base64
    const base64 = await imageCompression.getDataUrlFromFile(
      compressedFile,
    );

    try {
      setLoading(true);
      const response = await axios.post(
        "https://ulinkkk.liara.run/upload",
        { image: base64 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      try {
        const res = await axios.post(
          "https://ulinkkk.liara.run/setGallery",
          {
            imageUrl: `${response.data.link}`,
          },
        );
        // setUpdate((prev) => prev + 1);
        setLoading(false);
        toast.success("عملیات موفقیت آمیز بود");
        setUpdate((prev) => prev + 1);
      } catch (error) {
        toast.error("مشکلی پیش آمد");
        setLoading(false);
        console.log(error);
      }
    } catch (error) {
      toast.error("مشکلی در ذخیره تصویر پیش آمد");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <>
        {/* <p className={styles.title}>گالری تصاویر</p> */}
        <form className={styles.form}>
          <div
            className={
              !image && isSubmit
                ? `${styles.formBlock} ${styles.redBorder}`
                : styles.formBlock
            }>
            <div className={styles.formBlockBody}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  fileInputRef.current.click();
                }}
                className={styles.button}>
                {preview ? (
                  <Image width={200} height={200} src={preview} />
                ) : (
                  "بارگذاری تصویر همراه لینک (کلیک کنید)"
                )}
              </button>
              {!image && isSubmit ? (
                <p className={styles.errorText}>
                  پر کردن این فیلد الزامی است
                </p>
              ) : (
                ""
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
                  if (file && file.type.substring(0, 5) == "image") {
                    setImage(file);

                    // sendimage(e);
                  } else {
                    setImage(null);
                  }
                }}
              />
              {!loading ? (
                <button
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                  className={styles.submitButton}>
                  آپلود
                </button>
              ) : (
                <button
                  type="submit"
                  style={{ display: "flex", alignItems: "center" }}>
                  <BeatLoader
                    color={"#fff"}
                    loading={true}
                    cssOverride={{
                      display: "block",
                      // margin: "2vw auto",

                      // paddingBottom: "1vw",
                      borderColor: "red",
                    }}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </button>
              )}
            </div>
          </div>
        </form>
        <div className={styles.container}>
          {gallery.map((i) => (
            <div>
              <Image width={300} height={200} src={i} />
              <span
                onClick={() => {
                  navigator.clipboard
                    .writeText(i)
                    .then(() => {
                      toast.success("کپی شد");
                    })
                    .catch((err) => {
                      toast.error("مشکل در کپی تصویر");
                    });
                }}>
                کپی
              </span>
            </div>
          ))}
        </div>
      </>
    </>
  );
};

export default Gallery;
