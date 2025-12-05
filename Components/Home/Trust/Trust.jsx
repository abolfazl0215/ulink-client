import React from "react";
import styles from "./trust.module.css";
import Image from "next/image";

const Trust = () => {
  return (
    <section className={styles.trust}>
      <div>
        <div>
          <Image width={100} height={100} src="/icons/quality.svg" />
        </div>
        <p>تضمین کیفیت</p>
      </div>
      <div>
        <div>
          <Image width={100} height={100} src="/icons/return.svg" />
        </div>
        <p>تضمین بازگشت وجه</p>
      </div>
      <div>
        <div>
          <Image width={100} height={100} src="/icons/express.svg" />
        </div>
        <p>ارسال فوری</p>
      </div>
      <div>
        <div>
          <Image width={100} height={100} src="/icons/trust.svg" />
        </div>
        <p>نماد اعتماد الکترونیکی</p>
      </div>
    </section>
  );
};

export default Trust;
