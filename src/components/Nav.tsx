"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({
    features: null,
    pricing: null,
    contact: null,
  });
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isCurrentlyScrolled = latest > 50;
    setIsScrolled(isCurrentlyScrolled);
  });

  // Handle hover on navigation links
  const handleLinkHover = (linkId: string) => {
    setHoveredLink(linkId);

    // Get the current link's position information
    const link = linkRefs.current[linkId];
    if (link && navRef.current) {
      const rect = link.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();

      // Calculate position relative to the navigation container
      const left = rect.left - navRect.left;
      setPillStyle({
        left,
        width: rect.width,
      });
    }
  };

  // Simpler unified variants for smoother transitions
  const navVariants = {
    initial: {
      width: "100%",
      y: 0,
      transition: { duration: 0.3, ease: [0.1, 0.6, 0.3, 1] },
    },
    scrolled: {
      width: "40%",
      y: 20,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
  };

  const mobileVariants = {
    initial: {
      width: "100%",
      y: 0,
      borderRadius: "0rem",
      transition: { duration: 0.3, ease: [0.1, 0.6, 0.3, 1] },
    },
    scrolled: {
      width: "90%",
      y: 20,
      borderRadius: "2rem",
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
  };

  return (
    <div className="w-full fixed top-0 inset-x-0 z-50 mb-8">
      {/* Desktop Navigation */}
      <motion.div
        className="hidden lg:flex flex-row items-center justify-between py-2 max-w-7xl mx-auto px-4 rounded-full relative z-[60] w-full"
        initial="initial"
        animate={isScrolled ? "scrolled" : "initial"}
        variants={navVariants}
        style={{
          minWidth: "800px",
          willChange: "auto",
          backdropFilter: "blur(10px)",
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.8)"
            : "transparent",
          boxShadow: isScrolled
            ? "rgba(34, 42, 53, 0.06) 0px 0px 24px, rgba(0, 0, 0, 0.05) 0px 1px 1px, rgba(34, 42, 53, 0.04) 0px 0px 0px 1px, rgba(34, 42, 53, 0.08) 0px 0px 4px, rgba(47, 48, 55, 0.05) 0px 16px 68px, rgba(255, 255, 255, 0.1) 0px 1px 0px inset"
            : "none",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-normal flex space-x-2 items-center text-sm mr-4 text-slate-950 px-2 py-1 relative z-20"
        >
          <Image
            src="/logo.png"
            alt="No More Calls Logo"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="font-medium text-slate-950">no more calls</span>
        </Link>

        {/* Center Navigation with Sliding Pill */}
        <div
          ref={navRef}
          className="flex-1 flex items-center justify-center relative"
          onMouseEnter={() => setIsNavHovered(true)}
          onMouseLeave={() => {
            setIsNavHovered(false);
            setHoveredLink(null);
          }}
        >
          {/* The sliding pill background */}
          <motion.div
            className="absolute h-8 bg-slate-200 rounded-full -z-10"
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: isNavHovered ? 1 : 0,
              left: pillStyle.left,
              width: isNavHovered ? pillStyle.width : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          />

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link
              ref={(el) => (linkRefs.current.features = el)}
              className={`px-4 py-1.5 relative transition-colors duration-200 text-xs ${
                hoveredLink === "features"
                  ? "text-slate-950"
                  : "text-slate-600 hover:text-slate-950"
              }`}
              href="/#features"
              onMouseEnter={() => handleLinkHover("features")}
            >
              Features
            </Link>
            <Link
              ref={(el) => (linkRefs.current.pricing = el)}
              className={`px-4 py-1.5 relative transition-colors duration-200 text-xs ${
                hoveredLink === "pricing"
                  ? "text-slate-950"
                  : "text-slate-600 hover:text-slate-950"
              }`}
              href="/#pricing"
              onMouseEnter={() => handleLinkHover("pricing")}
            >
              Pricing
            </Link>
            <Link
              ref={(el) => (linkRefs.current.contact = el)}
              className={`px-4 py-1.5 relative transition-colors duration-200 text-xs ${
                hoveredLink === "contact"
                  ? "text-slate-950"
                  : "text-slate-600 hover:text-slate-950"
              }`}
              href="/#contact"
              onMouseEnter={() => handleLinkHover("contact")}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          <Button className="px-4 py-2 rounded-md bg-white text-slate-950 text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 text-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
            Book a call
          </Button>
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <motion.div
        className="flex relative flex-col lg:hidden w-full justify-between items-center max-w-[calc(100vw-2rem)] mx-auto px-0 py-2 z-50"
        initial="initial"
        animate={isScrolled ? "scrolled" : "initial"}
        variants={mobileVariants}
        style={{
          willChange: "auto",
          backdropFilter: "blur(10px)",
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.8)"
            : "transparent",
          boxShadow: isScrolled
            ? "rgba(34, 42, 53, 0.06) 0px 0px 24px, rgba(0, 0, 0, 0.05) 0px 1px 1px, rgba(34, 42, 53, 0.04) 0px 0px 0px 1px, rgba(34, 42, 53, 0.08) 0px 0px 4px, rgba(47, 48, 55, 0.05) 0px 16px 68px, rgba(255, 255, 255, 0.1) 0px 1px 0px inset"
            : "none",
          padding: isScrolled ? "12px" : "16px 24px",
        }}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm mr-4 text-slate-950 px-2 py-1 relative z-20"
          >
            <Image
              src="/logo.png"
              alt="No More Calls Logo"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="font-medium text-slate-950 lg:inline hidden">
              no more calls
            </span>
          </Link>

          <Button variant="ghost" size="icon" className="text-slate-950">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6l16 0"></path>
              <path d="M4 12l16 0"></path>
              <path d="M4 18l16 0"></path>
            </svg>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
