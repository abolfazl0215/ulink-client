"use client";
import { motion } from "framer-motion";
import styles from "../app/style.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

export default function AnimatedLanding() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex-1 w-full flex flex-col lg:flex-row mt-5 items-center">
      {/* VIDEO */}
      <motion.section
        variants={fadeLeft}
        className="w-full md:w-3/4 lg:w-1/2   flex items-center justify-center order-2 lg:order-1 mt-[10vw] md:mt-[5vw] lg:mt-0">
        <motion.video
          variants={fadeUp}
          src="/video.webm"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-auto"
        />
      </motion.section>

      {/* TEXT */}
      <motion.section
        variants={fadeRight}
        className="w-full lg:w-1/2 flex items-center justify-center order-1 lg:order-2">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center lg:items-start">
          <motion.h2
            variants={fadeUp}
            className="text-[8vw] px-[5vw] md:px-[7vw] lg:px-0 mt-[7vw] lg:mt-0 md:text-[6vw] lg:text-[4.5vw] font-extrabold leading-[10vw] text-center lg:text-left md:leading-[6vw]  lg:leading-[5vw]">
            Create and customize your ULink in minutes
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-[4vw] md:mt-[3vw] lg:mt-[3vw] px-[2vw] md:px-[4vw] lg:px-0 text-center lg:text-left text-[4vw] md:text-[2.5vw] lg:text-[1.2vw] text-white font-semibold">
            Connect all your content in one link in bio. Customize
            every detail or let ULink do it automatically.
          </motion.p>

          <motion.a
            variants={fadeUp}
            href="/login"
            className={`${styles.blinking_element} relative overflow-hidden bg-[#005822] p-[4vw] md:p-[2vw] lg:p-[1.2vw] px-[6vw] md:px-[2vw] rounded-full text-white text-[4.3vw] md:text-[2.1vw] lg:text-[1vw] mt-[4vw] md:mt-[3vw]`}>
            Get started for free
          </motion.a>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
