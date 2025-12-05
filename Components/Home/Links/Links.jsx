import React from "react";
import styles from "./links.module.css";
import Image from "next/image";

const Links = () => {
  return (
    <section className={styles.links}>
      <div className={styles.rightSection}>
        <h2>
          نمونه لینک های <br className={styles.break} /> ساخته شده
        </h2>
        <Image width={100} height={100} src="/icons/links.svg" />
        {/* <p>مشاهده همه لینک ها &gt;</p> */}
      </div>
      <div className={styles.leftSection}>
        <div>لینک اختصاصی سایت پونس</div>
        <div>لینک اختصاصی سایت پونس</div>
        <div>لینک اختصاصی سایت پونس</div>
        <div>لینک اختصاصی سایت پونس</div>
        <div>لینک اختصاصی سایت پونس</div>
        <div>لینک اختصاصی سایت پونس</div>
      </div>
    </section>
  );
};

export default Links;
