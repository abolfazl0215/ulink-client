import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import LoginContextComponent from "../context/LoginContext";
import ProductContextComponent from "../context/ProductContext";
import LinkContextComponent from "../context/LinkContext";
import Image from "next/image";
import EditContextComponent from "./edit/[slug]/selectEdit/EditContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "همراه لینک | کارت ویزیت هوشمند | لینک ساز",
  description:
    " کارت ویزیت هوشمند NFC ، نسل جدید کارت ویزیت دیجیتال ، اطلاعات شما را از جمله راه های ارتباطی ، وبسایت ، پیج های کاری ، شبکه های اجتماعی و ... با دیگران به اشتراک میگذارد . با یک بار هزینه به صورت دائمی یک کارت ویزیت خاص و قابل تغییر را داشته باشید .",
};

const yekan = localFont({
  src: [
    {
      path: "./fonts/YekanBakh-Black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/YekanBakh-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/YekanBakh-ExtraBlack.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/YekanBakh-ExtraBold.woff2",
      weight: "700",
      style: "normal",
    },
    // {
    //   path: "./fonts/YekanBakh-Light.woff2",
    //   weight: "700",
    //   style: "normal",
    // },
    {
      path: "./fonts/YekanBakh-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/YekanBakh-SemiBold.woff2",
      weight: "500",
      style: "normal",
    },
    // {
    //   path: "./fonts/YekanBakh-Thin.woff2",
    //   weight: "700",
    //   style: "normal",
    // },
  ],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/icons/logo.svg" sizes="any" />
      </head>
      <body>
        <div id="root"></div>
        <LoginContextComponent>
          <ProductContextComponent>
            <LinkContextComponent>
              <EditContextComponent>
                <Toaster containerStyle={{ direction: "rtl" }} />
                {children}
              </EditContextComponent>
            </LinkContextComponent>
          </ProductContextComponent>
        </LoginContextComponent>
      </body>
    </html>
  );
}
