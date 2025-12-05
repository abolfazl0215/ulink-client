"use client";
import Image from "next/image";
import React, { useState, useContext, useEffect } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { LoginContext } from "../../context/LoginContext";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
// import { cookies } from "next/headers";

const Navbar = () => {
  // const cookieStore = cookies();
  // const cook = cookieStore.get("user");
  // const hasCookie = cookieStore.has("user");

  const loginContext = useContext(LoginContext);
  const router = useRouter();
  const pathname = usePathname();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        zIndex: 200000,
        width: "75vw",
      }}
      style={{ zIndex: "100000 !important" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <div className={styles.headerMenuMobile}>
        <Image src="/icons/logo.svg" width={20} height={20} />
        <div>
          <p>هـــــمــراه لینکــــــــ</p>
          <p>خرید کارت ویزیت دیجیتال</p>
        </div>
      </div>
      <ul className={styles.bodyMenuMobile}>
        <li onClick={() => router.push("/")}>
          <Image
            src="/icons/mobile-wave.svg"
            width={16}
            height={16}
            style={pathname != "/" && { display: "none" }}
          />
          <Image src="/icons/home.svg" width={16} height={16} />
          <span>خانه</span>
        </li>
        <li onClick={() => router.push("/prices")}>
          <Image
            src="/icons/mobile-wave.svg"
            width={16}
            height={16}
            style={pathname != "/prices" && { display: "none" }}
          />
          <Image src="/icons/price.svg" width={16} height={16} />
          <span> تعرفه ها</span>
        </li>
        <li onClick={() => router.push("/aboutUs")}>
          <Image
            src="/icons/mobile-wave.svg"
            width={16}
            height={16}
            style={pathname != "/aboutUs" && { display: "none" }}
          />
          <Image
            src="/icons/about-us-mobile.svg"
            width={16}
            height={16}
          />
          <span> درباره ما</span>
        </li>
        <li onClick={() => router.push("/call")}>
          <Image
            src="/icons/mobile-wave.svg"
            width={16}
            height={16}
            style={pathname != "/call" && { display: "none" }}
          />
          <Image
            src="/icons/call-mobile.svg"
            width={16}
            height={16}
          />
          <span>تماس با ما</span>
        </li>
      </ul>
      {Cookies.get("user") ? (
        <button
          className={styles.loginButton}
          onClick={() => router.push("/account")}>
          حساب کاربری
        </button>
      ) : (
        <button
          className={styles.loginButton}
          onClick={() => router.push("/login")}>
          ورود
        </button>
      )}
    </Box>
  );

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.rightNav}>
        <Link href="/">
          <div className={styles.logo}>
            <Image
              className={styles.logoImg}
              src="/icons/logo.svg"
              width={100}
              height={100}
            />
            <div>
              <p>همراه لینکـــــــــــ</p>
              <p>کارت ویزیت دیجیتال</p>
            </div>
          </div>
        </Link>
        <ul>
          <Link href="/prices">
            <li>
              <Image
                width={16}
                height={16}
                src="/icons/category.svg"
                alt=""
                className={styles.icon}
              />
              تعرفه ها{" "}
            </li>
          </Link>
          <li onClick={() => router.push("/aboutUs")}>
            <Image
              width={16}
              height={16}
              src="/icons/about-us.svg"
              alt=""
              className={styles.icon}
            />
            درباره ما
          </li>
          <li onClick={() => router.push("/call")}>
            <Image
              width={16}
              height={16}
              src="/icons/support.svg"
              alt=""
              className={styles.icon}
            />
            تماس با ما
          </li>
        </ul>
      </div>
      <div className={styles.rightNavMobile}>
        {" "}
        <div>
          <Image
            onClick={toggleDrawer("right", true)}
            width={16}
            height={16}
            src="/icons/menu.svg"
            alt=""
          />{" "}
          <SwipeableDrawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}>
            {list("right")}
          </SwipeableDrawer>
        </div>
        <Image
          onClick={() => router.push("/")}
          width={16}
          height={16}
          src="/icons/logo.svg"
          alt=""
        />
      </div>
      <div className={styles.leftNav}>
        {loginContext.userExist ? (
          <Link href="/account">
            {!loginContext.userExist ? (
              <div className={styles.login}>
                ورود
                <Image
                  src="/icons/login.svg"
                  width={16}
                  height={16}
                />
              </div>
            ) : (
              <div className={styles.user}>
                <Image src="/icons/user.svg" width={16} height={16} />
              </div>
            )}
          </Link>
        ) : (
          <Link href="/login">
            {!loginContext.userExist ? (
              <div className={styles.login}>
                ورود
                <Image
                  src="/icons/login.svg"
                  width={16}
                  height={16}
                />
              </div>
            ) : (
              <div className={styles.user}>
                <Image src="/icons/user.svg" width={16} height={16} />
              </div>
            )}
          </Link>
        )}
        <Link href="/cart">
          <div className={styles.cart}>
            <Image
              width={16}
              height={16}
              src="/icons/cart.svg"
              alt=""
            />
            <span>
              {/* {loginContext.user
                ? loginContext.user.cart.length
                : "0"} */}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
