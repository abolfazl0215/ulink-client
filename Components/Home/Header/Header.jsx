// "use client";
import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
// import { Modal } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { LoginContext } from "@/context/LoginContext";

const Header = () => {
  // const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [address, setAddress] = useState("");

  // const router = useRouter();

  // const loginContext = useContext(LoginContext);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  return (
    <header className={styles.header}>
      <section className={styles.rightHeader}>
        <h1>همراه لینک</h1>
        <p className={styles.subTitle}>کارت ویزیت هوشمند</p>
        <Link href="/tutorial">
          <p className={styles.documentation}>
            آموزش کار با nfc کارت (کلیک کنید)
          </p>
        </Link>
        <div className={styles.buttons}>
          <Link className={styles.button1} href="/prices">
            <button>
              تعرفه ها <img src="/icons/arrowLeftWhite.svg" alt="" />
            </button>
          </Link>
          {/* {loginContext.user && loginContext.user.payments[0] ? ( */}
          <Link href="/createLink">
            <button
              className={styles.button2}
              // onClick={() => router.push("/createLink")}
            >
              لینک ساز (رایگان)
            </button>
          </Link>
          {/* ) : (
            <button className={styles.button2} onClick={handleOpen}>
              لینک ساز
            </button>
          )} */}
        </div>
      </section>
      <section className={styles.LeftHeader}>
        <Image
          width={300}
          height={400}
          src="/images/nfcCard.svg"
          alt="کارت ویزیت دیجیتال و هوشمند nfc"
        />
      </section>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className={styles.modal}>
          <p>ابتدا باید کارت ویزیت هوشمند تهیه کنید</p>
          <button onClick={() => router.push("/prices")}>
            مشاهده تعرفه ها
          </button>
        </div>
      </Modal> */}
    </header>
  );
};

export default Header;
