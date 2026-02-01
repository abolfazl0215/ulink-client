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
      .get("https://ulinkk-back.onrender.com/me", {
        withCredentials: true,
      })
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
        "https://ulinkk-back.onrender.com/login",
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
        staggerChildren: 0.12,
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
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
      y: -2,
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
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/60 p-8 md:p-12 max-w-md w-full relative z-10"
        variants={cardVariants}
        initial="hidden"
        animate="visible">
        {/* Back Button */}
        <motion.button
          onClick={handleBack}
          className="absolute top-6 left-6 text-emerald-700 hover:text-emerald-600 transition-colors duration-200 bg-white/60 backdrop-blur-sm p-2 rounded-full border-2 border-white/80 hover:border-emerald-200 shadow-lg"
          variants={backButtonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap={{ scale: 0.9 }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Logo/Brand */}
        <motion.div
          className="text-center mb-10 mt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          <motion.div
            onClick={() => router.push("/")}
            className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-4 tracking-tight cursor-pointer inline-block"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            ULink
          </motion.div>
          <motion.div
            className="text-2xl md:text-3xl text-slate-900 font-bold mb-2"
            variants={itemVariants}>
            Welcome
          </motion.div>
          <motion.div
            className="text-slate-600 mt-2 text-sm font-medium"
            variants={itemVariants}>
            Sign in to manage your links
          </motion.div>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-8"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        {/* Google Login Button */}
        <motion.button
          onClick={handleGoogleLogin}
          className="w-full bg-white/90 backdrop-blur-sm border-2 border-white/80 hover:border-emerald-300 text-slate-800 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl group"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap">
          <motion.svg
            width="24"
            height="24"
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
          <span className="group-hover:text-emerald-700 transition-colors duration-200 text-base">
            Continue with Google
          </span>
        </motion.button>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-4 my-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          <span className="text-xs text-slate-500 font-medium">
            SECURE LOGIN
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-2 gap-3 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}>
          {[
            { icon: "🔒", text: "Secure" },
            { icon: "⚡", text: "Fast" },
            { icon: "🌐", text: "Global" },
            { icon: "✨", text: "Free" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border-2 border-white/70 rounded-xl px-3 py-2 shadow-sm">
              <span className="text-lg">{feature.icon}</span>
              <span className="text-xs font-bold text-slate-700">
                {feature.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Text */}
        <motion.div
          className="text-center mt-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}>
          <p className="text-sm text-slate-600 font-medium">
            Your data is protected with enterprise-grade security
          </p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <svg
              className="w-4 h-4 text-emerald-600"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs text-emerald-700 font-bold">
              Verified & Trusted
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
