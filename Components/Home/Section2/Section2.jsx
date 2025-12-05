import React from "react";
import styles from "./section2.module.css";
import Image from "next/image";

const Section2 = () => {
  return (
    <section className={styles.section2}>
      <div className={styles.rightSection}>
        <Image
          width={300}
          height={600}
          src="/images/phoneLink.png"
          alt="همراه لینک"
        />
      </div>
      <div className={styles.leftSection}>
        <h2>لینک خودتو بساز :</h2>
        <p>
          صفحه شخصی خودتو داخل گوگل بساز . شما میتوانید با استفاده از
          همراه لینک لینک صفحه وب شخصی خودتون رو بسازید و مخاطبان
          خودتان را به این صفحه هدایت کنید تا اطلاعات خود را با آنها
          به اشتراک بگذارید . این اطلاعات شامل راه های ارتباطی ،
          پیامرسان ها ، شبکه های اجتماعی ، محصولات ، ویدیو و... است .
        </p>
      </div>
    </section>
  );
};

export default Section2;
