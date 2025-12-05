"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import styles from "./style.module.css";

import { useContext } from "react";
import { LinkContext } from "../../context/LinkContext";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Navbar from "../../Components/Navbar/Navbar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LoginContext } from "../../context/LoginContext";

const CreateLink = () => {
  const [step, setStep] = useState(0);

  const router = useRouter();
  const loginContext = useContext(LoginContext);

  useEffect(() => {
    if (!loginContext.user) {
      router.replace("/login");
      toast.error("ابتدا وارد شوید");
    }
  });

  return (
    <>
      <Navbar />
      <section className={styles.createLink}>
        <Box
          dir="ltr"
          className={styles.container}
          sx={{ width: "100%" }}>
          <Stepper activeStep={step} alternativeLabel>
            <Step className={styles.step}>
              <StepLabel className={styles.StepLabel}>
                آدرس همراه لینک
              </StepLabel>
            </Step>
            <Step className={styles.step}>
              <StepLabel className={styles.StepLabel}>
                مشخصات همراه لینک
              </StepLabel>
            </Step>
            <Step className={styles.step}>
              <StepLabel className={styles.StepLabel}>
                انتخاب حوزه فعالیت
              </StepLabel>
            </Step>
          </Stepper>
        </Box>
        {step === 0 ? (
          <Step1 setStep={setStep} />
        ) : step === 1 ? (
          <Step2 setStep={setStep} />
        ) : step === 2 ? (
          <Step3 setStep={setStep} />
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default CreateLink;
