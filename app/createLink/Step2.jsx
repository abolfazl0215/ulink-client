import React, { useContext, useEffect, useState } from "react";
import styles from "./step2.module.css";
import { useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { LinkContext } from "../../context/LinkContext";

// import "./step2.css";

const Step2 = ({ setStep }) => {
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [submited, setSubmited] = useState(false);
  const fileInputRef = useRef();

  const linkContext = useContext(LinkContext);
  const { title, setTitle, setSubTitle, subTitle } = linkContext;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmited(true);
    console.log("linkContext image: ", linkContext.image);
    console.log("image: ", image);
    if (!image || !title)
      return toast.error("مقادیر خواسته شده را وارد نمایید");
    setStep(2);
  };

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imgInput" className={styles.imgLabel}>
          تصویر اصلی همراه لینک :
        </label>
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
        {!image && submited ? (
          <p className={styles.error}>پر کردن این فیلد الزامی است</p>
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
              linkContext.setImage(file);
              setImage(file);
              // sendimage(e);
            } else {
              linkContext.setImage(null);
              setImage(null);
            }
          }}
        />
        <div>
          <label htmlFor="mainTitle">عنوان همراه لینک :</label>
          <input
            id="mainTitle"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          {!title && submited ? (
            <p className={styles.error}>
              پر کردن این فیلد الزامی است
            </p>
          ) : (
            ""
          )}
          <p>
            یک عنوان دلخواه برای زیلینک خود انتخاب کنید. مثلا نازنین
            احمدی، شرکت دیجیکالا، نام فروشگاه اینترنتی شما و یا ....
          </p>
        </div>
        <div>
          <label htmlFor="subTitle">
            زیر عنوان همراه لینک (اختیاری) :
          </label>
          <input
            id="subTitle"
            type="text"
            onChange={(e) => setSubTitle(e.target.value)}
          />
          <p>
            مثلا مدیر واحد دیجیتال کاله، توسعه دهنده وب، فروش محصولات
            بهداشتی و یا ...
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <button>مرحله بعد</button>
        </div>
      </form>
    </section>
  );
};

export default Step2;
