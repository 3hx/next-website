"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Animation variants for pills with continuous floating effect
const pillVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.2 + custom * 0.1,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
  float: (custom: number) => ({
    y: [0, -10, 0, -5, 0],
    x: [0, 5, 0, -5, 0],
    transition: {
      y: {
        duration: 4 + custom * 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
      x: {
        duration: 5 + custom * 0.7,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }),
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

// Animation variants for the hero image - removed floating animation
const imageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export default function HeroSection() {
  // State to control animation phases
  const [animate, setAnimate] = useState(false);

  // Start animation after component mounts
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section className="pt-9 md:pt-15 lg:pt-18 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 max-w-screen-2xl mx-auto">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Stop unwanted calls with{" "}
          <span className="text-indigo-600">AI call screening</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Our AI-powered solution screens your calls, blocks spam, and provides
          you with peace of mind. Never be bothered by unwanted calls again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          {/* Try the Demo Button */}
          <a
            href="#demo"
            className="bg-[#544BF8] hover:bg-[#4841d4] text-white uppercase font-semibold tracking-wide px-10 py-3.5 rounded-md text-base sm:text-lg relative inline-flex items-center justify-center transition-colors duration-200 min-w-[180px] sm:min-w-[200px]"
          >
            <span className="flex items-center">
              <span className="mr-2 text-xl">✨</span>
              Try the Demo
            </span>
          </a>

          {/* Learn More Button */}
          <a
            href="#learn-more"
            className="px-10 py-3.5 rounded-md text-base sm:text-lg border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors duration-200 inline-flex items-center justify-center min-w-[180px] sm:min-w-[200px]"
          >
            Learn More
          </a>
        </div>

        {/* Hero image with surrounding pills */}
        <div className="relative w-full max-w-2xl mx-auto mb-0">
          {/* Spam Calls Pill - Top Left */}
          <motion.div
            className="absolute top-8 left-4 md:left-8 z-10"
            variants={pillVariants}
            initial="initial"
            animate={[animate ? "animate" : "initial", "float"]}
            whileHover="hover"
            custom={0}
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full backdrop-blur-xl shadow-[0_0_15px_rgba(99,102,241,0.5)] text-sm font-medium">
              Spam Calls
            </div>
          </motion.div>

          {/* Stress Pill - Top Right */}
          <motion.div
            className="absolute top-8 right-4 md:right-8 z-10"
            variants={pillVariants}
            initial="initial"
            animate={[animate ? "animate" : "initial", "float"]}
            whileHover="hover"
            custom={1}
          >
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2.5 rounded-full backdrop-blur-xl shadow-[0_0_15px_rgba(236,72,153,0.5)] text-sm font-medium">
              Stress
            </div>
          </motion.div>

          {/* Assholes Pill - Bottom Left */}
          <motion.div
            className="absolute bottom-12 left-4 md:left-12 z-10"
            variants={pillVariants}
            initial="initial"
            animate={[animate ? "animate" : "initial", "float"]}
            whileHover="hover"
            custom={2}
          >
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2.5 rounded-full backdrop-blur-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] text-sm font-medium">
              Assholes
            </div>
          </motion.div>

          {/* Distractions Pill - Bottom Right */}
          <motion.div
            className="absolute bottom-12 right-4 md:right-12 z-10"
            variants={pillVariants}
            initial="initial"
            animate={[animate ? "animate" : "initial", "float"]}
            whileHover="hover"
            custom={3}
          >
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2.5 rounded-full backdrop-blur-xl shadow-[0_0_15px_rgba(99,102,241,0.5)] text-sm font-medium">
              Distractions
            </div>
          </motion.div>

          {/* Hero Image - Static (no float animation) */}
          <motion.div
            className="relative"
            variants={imageVariants}
            initial="initial"
            animate="animate"
          >
            <Image
              src="/hero2.png"
              alt="Person frustrated by spam calls and distractions"
              width={800}
              height={600}
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
