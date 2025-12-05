import React from "react";
import styles from "./orders.module.css";
import moment from "jalali-moment";

const Orders = ({ users }) => {
  return (
    <>
      {/* <p className={styles.title}>سفارشات</p> */}
      <div className={styles.container}>
        {users &&
          users[0] &&
          users.map((u) => {
            return (
              u.payments &&
              u.payments[0] &&
              u.payments.map((p) => (
                <div className={styles.box}>
                  <p>نام : {u.name}</p>
                  <p>شماره موبایل : {u.userName}</p>
                  <p>آدرس : {p.address}</p>
                  <p>قیمت کل : {p.totalAmount}</p>
                  <p>پرداخت شده : {p.ok ? "بله" : "خیر"}</p>
                  <p>تایید پرداخت شده : {p.verify ? "بله" : "خیر"}</p>
                  <p>نحوه ارسال : {p.sendType}</p>
                  <p>ارسال شده : {p.isSend ? "بله" : "خیر"}</p>
                  <p>
                    زمان خرید :{" "}
                    {moment(new Date(p.time))
                      .locale("fa")
                      .format("YYYY/M/D")}
                  </p>
                  {p.cart.map((c) => (
                    <div className={styles.cart}>
                      <p>پلن : {c.plan}</p>
                      <p>تعداد : {c.total}</p>
                      <p>
                        قیمت هر عدد :{" "}
                        {c.amount ? c.amount.toLocaleString() : ""}
                      </p>
                    </div>
                  ))}
                  {p.isSend ? (
                    <button
                      style={{ backgroundColor: "red" }}
                      className={styles.sendButton}>
                      ارسال نشده
                    </button>
                  ) : (
                    <button className={styles.sendButton}>
                      ارسال شد
                    </button>
                  )}
                </div>
              ))
            );
          })}
      </div>
    </>
  );
};

export default Orders;
