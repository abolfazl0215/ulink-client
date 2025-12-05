import React, { useContext, useState } from "react";
import styles from "./step3.module.css";
import { category } from "./category";
import { LinkContext } from "../../context/LinkContext";
import toast from "react-hot-toast";
import PropagateLoader from "react-spinners/PropagateLoader";

const Step3 = () => {
  const [data, setData] = useState(category);

  const linkContext = useContext(LinkContext);

  const handleSearch = (e) => {
    console.log(e.target.value);
    const filterData = category.filter(
      (f) =>
        f.title.includes(e.target.value) ||
        f.subTitle.includes(e.target.value),
    );
    console.log(filterData);
    setData(filterData);
  };
  return (
    <section className={styles.category}>
      <p className={styles.description}>
        با توجه به توضیحات ارائه شده، از بین موارد زیر حوزه‌ی فعالیت
        مرتبط با همراه لینک خود را مشخص کنید.
      </p>
      <input
        type="search"
        placeholder="جستجو کنید ..."
        onChange={(e) => handleSearch(e)}
      />
      {data.map((c) => (
        <>
          {c.type === "header" ? (
            <div className={styles.header}>
              <p>{c.title}</p>
              <p>{c.subTitle}</p>
            </div>
          ) : (
            <div
              onClick={() => linkContext.setJob(c.title)}
              className={
                linkContext.job == c.title
                  ? styles.selecteSection
                  : styles.section
              }>
              <p>{c.title}</p>
              <p>{c.subTitle}</p>
            </div>
          )}
        </>
      ))}
      <div className={styles.buttonContainer}>
        {linkContext.job ? (
          <>
            {linkContext.loading ? (
              <>
                {window.innerWidth > 640 ? (
                  <button>
                    <PropagateLoader
                      color={"#fff"}
                      loading={true}
                      cssOverride={{
                        display: "block",
                        margin: ".8vw auto",

                        paddingBottom: "1vw",
                        borderColor: "red",
                      }}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </button>
                ) : (
                  <button>
                    <PropagateLoader
                      color={"#fff"}
                      loading={true}
                      cssOverride={{
                        display: "block",
                        margin: "2vw auto",

                        paddingBottom: "3vw",
                        borderColor: "red",
                      }}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </button>
                )}
              </>
            ) : (
              <button onClick={(e) => linkContext.addLink(e)}>
                ثبت لینک
              </button>
            )}
          </>
        ) : (
          <button
            style={{ opacity: "0.4" }}
            onClick={() =>
              toast.error("لطفا حوضه فعالیت خود را مشخص کنید ")
            }>
            ثبت لینک
          </button>
        )}
      </div>
    </section>
  );
};

export default Step3;
