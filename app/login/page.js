"use client";

import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { LoginContext } from "../../context/LoginContext";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    axios
      .get("https://ulinkkk.liara.run/me", { withCredentials: true })
      .then((res) => {
        if (res.data.loggedIn) {
          router.push("/account");
        } else {
          console.log("  // لاگین نیست");
        }
      });
  }, []);

  // Firebase فقط در کلاینت initialize می‌شود
  const firebaseConfig = {
    apiKey: "AIzaSyDfBfS05cW2zwhawjDQKtpDmXXgk5NjYSU",
    authDomain: "pounes-global-dater-205bd.firebaseapp.com",
    projectId: "pounes-global-dater-205bd",
    storageBucket: "pounes-global-dater-205bd.firebasestorage.app",
    messagingSenderId: "503340338653",
    appId: "1:503340338653:web:7a7a71bf90ec971d7ffa34",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginContext = useContext(LoginContext);
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const response = await axios.post(
        "https://ulinkkk.liara.run/login",
        { email: result.user.email },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log("result : ", response.data);
      if (response.data.loggedIn) {
        toast.success("Login Successful");
        loginContext.setUser(response.data.user);
        loginContext.setUpdate(loginContext.update + 1);
        router.push("/account");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed, check console", error.message);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const backButtonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.1,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-[#3AC481] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full relative"
        variants={cardVariants}
        initial="hidden"
        animate="visible">
        {/* Back Button */}
        <motion.button
          onClick={handleBack}
          className="absolute top-6 left-6 text-[#005822] hover:text-[#3AC481] transition-colors duration-200"
          variants={backButtonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap={{ scale: 0.9 }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Logo/Brand */}
        <motion.div
          className="text-center mb-8 mt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          <motion.div
            onClick={() => router.push("/account")}
            className="text-5xl font-bold text-[#3AC481] mb-4 tracking-wider cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            ULink
          </motion.div>
          <motion.div
            className="text-2xl text-[#005822] font-medium"
            variants={itemVariants}>
            Welcome
          </motion.div>
          <motion.div
            className="text-gray-500 mt-2 text-sm"
            variants={itemVariants}>
            Sign in to continue
          </motion.div>
        </motion.div>

        {/* Google Login Button */}
        <motion.button
          onClick={handleGoogleLogin}
          className="w-full bg-white border-2 border-gray-200 hover:border-[#3AC481] text-gray-700 font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg group"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap">
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}>
            <path
              d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z"
              fill="#4285F4"
            />
            <path
              d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z"
              fill="#34A853"
            />
            <path
              d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z"
              fill="#FBBC05"
            />
            <path
              d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z"
              fill="#EA4335"
            />
          </motion.svg>
          <span className="group-hover:text-[#005822] transition-colors duration-200">
            Continue with Google
          </span>
        </motion.button>

        {/* Footer Text */}
        <motion.div
          className="text-center mt-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}>
          <p className="text-sm text-gray-500">
            Secure login with your Google account
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
