import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { LinkContext } from "../../context/LinkContext";
import toast from "react-hot-toast";
import {
  FormHelperText,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import Image from "next/image";

import styles from "./step1.module.css";

const Step1 = ({ setStep }) => {
  const [loading, setLoading] = useState(false);
  const [exist, setExist] = useState(false);
  const [linkAddress, setLinkAddress] = useState("");
  const [showError, setShowError] = useState(false);

  const linkContext = useContext(LinkContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(true);
    if (loading) {
      return toast.success("لطفا صبر کنید تا آیدی بررسی شود");
    }
    if (linkAddress.length < 3) {
      return toast.error(
        "آدرس لینک شما نباید کمتر از 3 کاراکتر باشد",
      );
    }
    if (exist) {
      return toast.error("این آیدی از قبل  موجود است");
    }
    setStep(1);
  };

  const addressHandler = async (e) => {
    setLinkAddress(e.target.value);
    setLoading(true);
    linkContext.setLink(e.target.value);
    try {
      const response = await axios.post(
        "https://ulinkk-back.onrender.com/findLink",
        { link: e.target.value.trim() },
        { headers: { "Content-Type": "application/json" } },
      );
      setLoading(false);
      if (response.data.exist) {
        setExist(true);
      } else {
        setExist(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="">آدرس همراه لینک شما :</label>
      <OutlinedInput
        id="outlined-adornment-weight"
        sx={{ borderRadius: "3vw", alignItems: "center" }}
        fullWidth
        dir="ltr"
        className="MuiOutlinedInput-inputSizeSmall"
        startAdornment={
          <InputAdornment sx={{ mr: 1, pb: 1 }} position="end">
            hamrahlink.com/
          </InputAdornment>
        }
        endAdornment={
          loading ? (
            <ClipLoader
              color={"#e30017 "}
              loading={true}
              cssOverride={{
                display: "block",
                // margin: "0.3vw auto",

                // paddingBottom: "1vw",
                borderColor: "red",
              }}
              size={17}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : exist ? (
            <Image width={16} height={16} src="/icons/zarbdar.svg" />
          ) : (
            <Image width={16} height={16} src="/icons/true.svg" />
          )
        }
        onChange={(e) => addressHandler(e)}
        aria-describedby="outlined-weight-helper-text"
        required
        inputProps={{
          "aria-label": "weight",

          pattern: "[a-zA-Z0-9_.]+", // اعتبارسنجی با استفاده از pattern
          title:
            "لینک شما فقط میتواند شامل حروف انگلیسی ، اعداد انگلیسی ، نقطه و _ باشد .",
        }}
      />
      {linkAddress.length < 3 && showError && (
        <p className={styles.errorText}>
          مقدار وارد شده نباید کمتر از 4 کارکتر باشد
        </p>
      )}
      <p>
        مثلا milad و یا ewza0231 و یا ID اینستاگرامتان. آیدی همراه
        لینک شما می‌تواند شامل حروف انگلیسی، اعداد انگلیسی، نقطه و _
        باشد.
      </p>
      <div className={styles.buttonContainer}>
        <button type="submit">مرحله بعد</button>
      </div>
    </form>
  );
};

export default Step1;
