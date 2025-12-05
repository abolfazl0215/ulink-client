"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import styles from "./prices.module.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ProductContext } from "../../../context/ProductContext";
import { LoginContext } from "../../../context/LoginContext";
import PropagateLoader from "react-spinners/PropagateLoader";

const Prices = () => {
  const [loading, setLoading] = useState({});

  const router = useRouter();

  const productContext = useContext(ProductContext);
  const loginContext = useContext(LoginContext);

  const addToCart = async (plan) => {
    const loadingCopy = { ...loading };
    loadingCopy[plan] = true;
    setLoading(loadingCopy);
    const filterCart =
      loginContext.user &&
      loginContext.user.cart &&
      loginContext.user?.cart.filter((c) => c.plan == plan);
    if (filterCart && filterCart[0]) {
      toast.success(
        "این محصول از قبل به سبد خرید شما اضافه شده است ",
      );
      router.push("/cart");
      return [];
    }
    if (Cookies.get("user")) {
      // const userid = jwtDecode(Cookies.get("user"));
      try {
        const response = await axios.post(
          "https://ulinkkk.liara.run/addToCart",
          {
            userId: Cookies.get("user"),
            plan,
            amount: 978000,
          },
          { headers: { "Content-Type": "application/json" } },
        );
        // console.log(response.data);
        toast.success(response.data.message);
        loginContext.setUpdate((prev) => prev + 1);
        router.push("/cart");
        loadingCopy[plan] = false;
        setLoading(loadingCopy);
      } catch (error) {
        console.log(error);
        loadingCopy[plan] = false;
        setLoading(loadingCopy);
      }
      loadingCopy[plan] = false;
      setLoading(loadingCopy);
    } else {
      toast.success("ابتدا وارد حساب کاربری خود شوید");
      router.push("/login");
    }
  };

  return (
    <section className={styles.prices}>
      <div className={styles.titleContainer}>
        <h2>تعرفه ها</h2>
        <Image
          className={styles.priceTag}
          src="/icons/priceTag.svg"
          width={300}
          height={400}
        />
      </div>
      <div className={`${styles.plans} ${styles.plansLg}`}>
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}>
          {productContext.plans[0] &&
            productContext.plans.map((plan) => (
              <SwiperSlide className={styles[plan.name]}>
                {plan.total <= 0 ? (
                  <p className={styles.noExist}>اتمام موجودی</p>
                ) : (
                  ""
                )}
                <p className={styles.planTitle}>{plan.name}</p>
                {plan.options.map((opt) => (
                  <div className={styles.row}>
                    <p>{opt.option}</p>
                    {opt.value == "-" ? (
                      <Image
                        width={30}
                        height={30}
                        src="/icons/false.svg"
                      />
                    ) : opt.value == "+" ? (
                      <Image
                        width={30}
                        height={30}
                        src="/icons/true.svg"
                      />
                    ) : (
                      <span>{opt.value}</span>
                    )}
                  </div>
                ))}

                <div className={styles.price}>
                  <p>
                    {plan.price && plan.price.toLocaleString()} تومان
                  </p>
                </div>
                {loading[plan.name] ? (
                  <button className={styles.cartButton}>
                    <PropagateLoader
                      color={"#fff"}
                      loading={true}
                      cssOverride={{
                        display: "block",
                        margin: "0.3vw auto",
                        paddingBottom: "1vw",
                        borderColor: "red",
                      }}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </button>
                ) : (
                  <button
                    className={styles.cartButton}
                    onClick={() => {
                      if (plan.total > 0) {
                        addToCart(plan.name);
                      } else {
                        toast.error(
                          "موجودی این محصول به اتمام رسیده است",
                        );
                      }
                    }}>
                    افزودن به سبد خرید
                  </button>
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className={`${styles.plans} ${styles.plansSm}`}>
        <Swiper
          spaceBetween={10}
          slidesPerView={1.4}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}>
          {productContext.plans[0] &&
            productContext.plans.map((plan) => (
              <SwiperSlide className={styles[plan.name]}>
                {plan.total <= 0 ? (
                  <p className={styles.noExist}>اتمام موجودی</p>
                ) : (
                  ""
                )}
                <p className={styles.planTitle}>پلن {plan.name}</p>
                {plan.options.map((opt) => (
                  <div className={styles.row}>
                    <p>{opt.option}</p>
                    {opt.value == "-" ? (
                      <Image
                        width={30}
                        height={30}
                        src="/icons/false.svg"
                      />
                    ) : opt.value == "+" ? (
                      <Image
                        width={30}
                        height={30}
                        src="/icons/true.svg"
                      />
                    ) : (
                      <span>{opt.value}</span>
                    )}
                  </div>
                ))}

                <div className={styles.price}>
                  <p>
                    {plan.price && plan.price.toLocaleString()} تومان
                  </p>
                </div>
                {loading[plan.name] ? (
                  <button className={styles.cartButton}>
                    <PropagateLoader
                      color={"#fff"}
                      loading={true}
                      cssOverride={{
                        display: "block",
                        margin: "1vw auto",
                        paddingBottom: "4vw",
                        borderColor: "red",
                      }}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </button>
                ) : (
                  <button
                    className={styles.cartButton}
                    onClick={() => {
                      if (plan.total > 0) {
                        addToCart(plan.name);
                      } else {
                        toast.error(
                          "موجودی این محصول به اتمام رسیده است",
                        );
                      }
                    }}>
                    افزودن به سبد خرید
                  </button>
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Prices;
