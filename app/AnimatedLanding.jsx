"use client";
import { motion } from "framer-motion";
import styles from "../app/style.module.css";
import { memo } from "react";

// انیمیشن‌ها را بیرون از کامپوننت تعریف کنید تا در هر رندر دوباره ساخته نشوند
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// transition مشترک
const smoothTransition = { duration: 0.4, ease: "easeOut" };

// فیچرها را بیرون از کامپوننت بیاورید
const features = [
  { icon: "⚡", text: "Quick Setup" },
  { icon: "🎨", text: "Custom Design" },
  { icon: "📊", text: "Analytics" },
  { icon: "🔗", text: "Unlimited Links" },
];

// کامپوننت‌های کوچک را memo کنید
const FloatingBadge = memo(({ delay, position, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className={`absolute ${position} bg-white/95 backdrop-blur-md text-emerald-700 px-5 py-2.5 rounded-full shadow-xl text-xs md:text-sm font-bold border-2 border-white`}>
    {text}
  </motion.div>
));
FloatingBadge.displayName = "FloatingBadge";

const FeatureCard = memo(({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5 + index * 0.08, duration: 0.3 }}
    className="flex items-center gap-2 bg-white/70 backdrop-blur-md border-2 border-white/80 rounded-xl px-3 py-2.5 hover:bg-white/90 hover:border-white hover:shadow-lg transition-all duration-200">
    <span className="text-xl">{feature.icon}</span>
    <span className="text-slate-800 font-semibold text-sm">
      {feature.text}
    </span>
  </motion.div>
));
FeatureCard.displayName = "FeatureCard";

function AnimatedLanding() {
  return (
    <div className="w-full relative overflow-hidden grid-bg">
      {/* Background elements - با تعداد انیمیشن کمتر */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 lg:py-16 gap-8 lg:gap-20">
        {/* VIDEO SECTION */}
        <motion.section
          variants={fadeLeft}
          transition={smoothTransition}
          className="w-full lg:w-[48%] flex items-center justify-center order-2 lg:order-1">
          <div className="relative w-full">
            {/* Decorative glow - ساده‌تر */}
            <div className="absolute -inset-3 bg-gradient-to-r from-emerald-300/20 to-teal-200/20 rounded-3xl blur-2xl" />

            {/* Video container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/60 bg-white/40 backdrop-blur-sm">
              <motion.video
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                src="/video.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-auto rounded-2xl"
              />
            </div>

            {/* Floating badges */}
            <FloatingBadge
              delay={0.7}
              position="-bottom-3 -left-3"
              text="✨ 100% Free"
            />
            <FloatingBadge
              delay={0.85}
              position="-top-3 -right-3"
              text="🚀 No Code"
            />
          </div>
        </motion.section>

        {/* TEXT SECTION */}
        <motion.section
          variants={fadeRight}
          transition={smoothTransition}
          className="w-full lg:w-[48%] flex items-center justify-center order-1 lg:order-2">
          <div className="flex flex-col items-center lg:items-start w-full">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              transition={smoothTransition}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border-2 border-white/90 text-emerald-700 px-4 py-2 rounded-full text-xs md:text-sm font-bold mb-4 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              10,000+ Active Users
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              transition={smoothTransition}
              className="text-4xl md:text-5xl lg:text-5xl font-black text-center lg:text-left leading-tight mb-4">
              <span className="bg-gradient-to-r from-slate-900 via-emerald-800 to-slate-900 bg-clip-text text-transparent">
                Create and customize
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent drop-shadow-sm">
                your ULink
              </span>
              <br />
              <span className="bg-gradient-to-r from-slate-900 via-emerald-800 to-slate-900 bg-clip-text text-transparent">
                in minutes
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              transition={smoothTransition}
              className="text-center lg:text-left text-base md:text-lg text-slate-800 font-medium leading-relaxed mb-6">
              Connect all your content in one link in bio. Customize
              every detail or let ULink do it{" "}
              <span className="text-emerald-700 font-bold">
                automatically
              </span>
              .
            </motion.p>

            {/* Features list */}
            <motion.div
              variants={fadeUp}
              transition={smoothTransition}
              className="grid grid-cols-2 gap-3 mb-6 w-full">
              {features.map((feature, i) => (
                <FeatureCard key={i} feature={feature} index={i} />
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              variants={fadeUp}
              transition={smoothTransition}
              className="flex flex-col w-full gap-3">
              <motion.a
                href="/login"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={`${styles.blinking_element} relative overflow-hidden group bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-600 hover:from-emerald-700 hover:via-emerald-800 hover:to-emerald-700 px-8 py-4 rounded-full text-white text-base md:text-lg font-bold shadow-2xl shadow-emerald-600/40 hover:shadow-emerald-700/50 transition-all duration-200 text-center w-full`}>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get started for free
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center gap-2 text-emerald-800 text-sm">
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
                <span className="font-bold">
                  No credit card required
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

export default memo(AnimatedLanding);
