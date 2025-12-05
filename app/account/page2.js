"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./account.module.css";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoginContext } from "../../context/LoginContext";
import { Modal } from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";
import Link from "next/link";
import moment from "jalali-moment";
import QrCode from "./QrCode";

const Account = () => {
  const [detail, setDetail] = useState("orders");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [qrCode, setQrCode] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const loginContext = useContext(LoginContext);

  // useEffect(() => {
  //   if (!Cookies.get("user")) {
  //     router.push("/login");
  //     toast.success("ابتدا وارد شوید");
  //   }
  // });
  return (
    <>
      <Navbar />
      <section className={styles.account}>
        <header className={styles.header}>
          <p>
            <span>{loginContext.user.name} عزیز ;</span>
            <span>به جمع همراه لینکی ها خوش اومدی 💕</span>
          </p>
        </header>
        <div className={styles.main}>
          <div className={styles.sidebar}>
            <p
              className={
                detail == "orders" ? styles.selectedButton : ""
              }
              onClick={() => setDetail("orders")}>
              سفارش های من
            </p>
            <p
              className={
                detail == "links" ? styles.selectedButton : ""
              }
              onClick={() => setDetail("links")}>
              لینک های من
            </p>
            <p style={{ cursor: "pointer" }} onClick={handleOpen2}>
              خروج
            </p>
          </div>
          {/* {detail == "orders" ? (
            <div className={styles.details}>
              {loginContext.user && !loginContext.user.payments[0] ? (
                <div>شما هنوز سفارشی ثبت نکرده اید</div>
              ) : (
                ""
              )}
              {loginContext.user &&
              loginContext.user.payments &&
              loginContext.user.payments[0]
                ? loginContext.user.payments.map((p) => (
                    <>
                      <div className={styles.headOrder}>
                        <div>
                          <p>قیمت کل :</p>
                          <p>
                            {p.totalAmount &&
                              (
                                p.totalAmount / 10
                              ).toLocaleString()}{" "}
                            تومان
                          </p>
                        </div>
                        <div>
                          <p>تاریخ :</p>
                          <p>
                            {p.time &&
                              moment(new Date(p.time))
                                .locale("fa")
                                .format("YYYY/M/D")}
                          </p>
                        </div>
                        <div>
                          <p>وضعیت ارسال :</p>
                          <p>
                            {p.isSend ? "ارسال شده" : "ارسال نشده"}
                          </p>
                        </div>
                        <div>
                          <p>نوع ارسال :</p>
                          <p>{p.sendType}</p>
                        </div>
                      </div>
                      {p.cart.map((c) => (
                        <div>
                          <p>plan {c.plan}</p>
                          <p>تعداد : {c.total}</p>
                          <p>
                            قیمت هر عدد :
                            {c.amount && c.amount.toLocaleString()}{" "}
                            تومان
                          </p>
                        </div>
                      ))}
                    </>
                  ))
                : ""}
            </div>
          ) : ( */}
          <div className={styles.links}>
            {/* {loginContext.user &&
              loginContext.user.payments &&
              loginContext.user.payments[0] ? (
                <p className={styles.point}>
                  شما مجاز به ساخت تنها 5 لینک هستید{" "}
                </p>
              ) : (
                ""
              )} */}

            {loginContext.user &&
            loginContext.user.links &&
            loginContext.user.links[0] ? (
              loginContext.user.links.map((l) => (
                <div className={styles.showLinks}>
                  <p>{l}</p>
                  <Link href={`/edit/${l}`}>
                    <button>ویرایش</button>
                  </Link>
                  <Link href={`/${l}`} target="_blank">
                    <button>نمایش</button>
                  </Link>
                  <button onClick={() => setQrCode(l)}>qrCode</button>
                </div>
              ))
            ) : (
              <p className={styles.noExistLink}>
                شما هنوز لینکی نساخته اید
              </p>
            )}
            <button
              className={styles.button2}
              onClick={() => router.push("/createLink")}>
              ساخت لینک جدید +
            </button>
            {/* {loginContext.user && loginContext.user.payments[0] ? (
              ) : (
                <button
                  className={styles.button2}
                  onClick={handleOpen}>
                  ساخت لینک جدید +
                </button>
              )} */}
          </div>
          {/* )} */}
        </div>
        <Modal
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
        </Modal>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ zIndex: "20000" }}>
          <div className={styles.modal2}>
            <p>آیا میخواهید از حساب کاربری خود خارج شوید ؟</p>
            <div>
              <button
                onClick={() => {
                  Cookies.remove("user");
                  handleClose2();
                  loginContext.setUpdate((prev) => prev + 1);
                  loginContext.setUser("");
                }}>
                بله
              </button>
              <button onClick={handleClose2}>خیر</button>
            </div>
          </div>
        </Modal>
      </section>
      {qrCode ? <QrCode setQrCode={setQrCode} value={qrCode} /> : ""}
    </>
  );
};

export default Account;

// ns127.pws-dns.net
// ns128.pws-dns.net
