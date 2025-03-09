"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
};

const features: Feature[] = [
  {
    id: "ai-screening",
    title: "AI Call Screening",
    description:
      "Our advanced AI analyzes calls in real-time to identify and filter spam, sales calls, and other unwanted interruptions before they reach you.",
    icon: "/icons/ai-icon.svg",
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "custom-rules",
    title: "Custom Blocking Rules",
    description:
      "Create personalized rules to automatically handle specific callers or call types based on your preferences and schedule.",
    icon: "/icons/rules-icon.svg",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "virtual-receptionist",
    title: "Virtual Receptionist",
    description:
      "Let our AI receptionist handle call routing, basic inquiries, and appointment scheduling without disrupting your workflow.",
    icon: "/icons/receptionist-icon.svg",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "analytics",
    title: "Call Analytics",
    description:
      "Gain insights into your call patterns with detailed analytics showing call volumes, peak times, and common caller types.",
    icon: "/icons/analytics-icon.svg",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "seamless-integration",
    title: "Seamless Integration",
    description:
      "Integrates with your existing phone system with no hardware changes required. Works with mobile devices, landlines, and VoIP.",
    icon: "/icons/integration-icon.svg",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "priority-calls",
    title: "Priority Call Handling",
    description:
      "Important calls from family, clients, or VIPs always get through, while unwanted calls are filtered out automatically.",
    icon: "/icons/priority-icon.svg",
    color: "from-violet-500 to-purple-600",
  },
];

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  return (
    <section
      id="features"
      className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Peace of Mind
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our AI-powered solution gives you complete control over your
            communications, eliminating unwanted interruptions and streamlining
            your business calls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="relative bg-white rounded-2xl overflow-hidden shadow-lg group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setActiveFeature(feature.id)}
              onHoverEnd={() => setActiveFeature(null)}
            >
              {/* Card background gradient effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${feature.color}`}
              />

              {/* Border glow effect */}
              <div
                className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 bg-gradient-to-br ${feature.color}`}
                style={{ zIndex: -1 }}
              />

              <div className="p-8">
                <div className="mb-5">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${feature.color} text-white mb-4`}
                  >
                    {/* Fallback icon in case the SVG is not available */}
                    {feature.icon ? (
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={28}
                        height={28}
                        className="w-7 h-7"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>

                {/* Learn more link */}
                <div className="mt-6 flex items-center text-indigo-600 font-medium">
                  <span>Learn more</span>
                  <motion.span
                    className="ml-2"
                    animate={{ x: activeFeature === feature.id ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional feature highlight */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Take Back Control of Your Time
              </h3>
              <p className="text-lg mb-6 text-indigo-100">
                The average salon owner loses 3 hours per week to unwanted calls
                and interruptions. With No More Calls, you can reclaim that time
                and focus on what matters most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-white text-indigo-600 rounded-full font-medium hover:bg-opacity-90 transition">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:bg-opacity-10 transition">
                  See Demo
                </button>
              </div>
            </div>
            <div className="relative h-full min-h-[300px] bg-indigo-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 relative">
                  <Image
                    src="/feature-highlight.png"
                    alt="Feature highlight"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
