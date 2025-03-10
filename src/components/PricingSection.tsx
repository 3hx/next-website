"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ElevenLabsDemo } from "./ElevenLabsDemo";

// Plan feature types
type PlanFeature = {
  id: string;
  text: string;
  included: boolean;
};

// Plan types
type Plan = {
  id: string;
  title: string;
  price: string;
  description: string;
  features: PlanFeature[];
  isPopular?: boolean;
};

// Basic and AI Secretary Plans
const plans: Plan[] = [
  {
    id: "ai-assistant",
    title: "AI Assistant",
    price: "£19.99",
    description:
      "Perfect for individuals who need AI assistance with everyday tasks",
    features: [
      { id: "f1", text: "Can handle 1 call at a time", included: true },
      { id: "f2", text: "24/7 AI assistant access", included: true },
      { id: "f3", text: "Basic task automation", included: true },
      { id: "f4", text: "Email drafting", included: true },
      { id: "f5", text: "Calendar management", included: true },
      { id: "f6", text: "Advanced analytics", included: false },
      { id: "f7", text: "Marketing & lead generation", included: false },
      { id: "f8", text: "Research capabilities", included: false },
      { id: "f9", text: "Multi-user access", included: false },
    ],
  },
  {
    id: "ai-secretary",
    title: "AI Secretary",
    price: "£47.99",
    description: "Comprehensive solution for professionals and small teams",
    features: [
      { id: "f1", text: "Can handle 3 calls at a time", included: true },
      { id: "f2", text: "24/7 AI assistant access", included: true },
      { id: "f3", text: "Advanced task automation", included: true },
      { id: "f4", text: "Email drafting and management", included: true },
      { id: "f5", text: "Smart calendar optimization", included: true },
      { id: "f6", text: "Advanced analytics dashboard", included: true },
      { id: "f7", text: "Marketing & lead generation", included: true },
      { id: "f8", text: "Research capabilities", included: true },
      { id: "f9", text: "Multi-user access (up to 3 users)", included: true },
      { id: "f10", text: "15+ additional specialized tasks", included: true },
    ],
    isPopular: true,
  },
];

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "monthly"
  );

  return (
    <section
      id="pricing"
      className="py-24 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 max-w-screen-2xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-950">
          Simple, transparent pricing
        </h2>
        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
          Choose the plan that works best for you, all with a risk-free trial
        </p>

        {/* Billing toggle */}
        <div className="mt-8 inline-flex items-center p-1 bg-slate-100 rounded-full">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              billingPeriod === "monthly"
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("annual")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              billingPeriod === "annual"
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            Annual <span className="text-emerald-500 font-semibold">-20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: plan.id === "ai-assistant" ? 0 : 0.1,
            }}
            viewport={{ once: true }}
            className={`relative rounded-2xl overflow-hidden border ${
              plan.isPopular
                ? "border-slate-300 bg-white shadow-xl"
                : "border-slate-200 bg-white/50"
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-md">
                MOST POPULAR
              </div>
            )}

            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-950 mb-2">
                {plan.title}
              </h3>
              <p className="text-slate-600 mb-4">{plan.description}</p>

              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-slate-950">
                  {billingPeriod === "annual"
                    ? `£${Math.floor(
                        parseFloat(plan.price.replace("£", "")) * 0.8
                      )}.99`
                    : plan.price}
                </span>
                <span className="text-slate-600 ml-2">/month</span>
              </div>

              {plan.isPopular ? (
                <ElevenLabsDemo />
              ) : (
                <Button
                  className={`w-full py-6 rounded-lg mb-6 ${
                    plan.isPopular
                      ? "bg-slate-950 hover:bg-slate-900 text-white"
                      : "bg-white text-slate-950 border border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  Start free trial
                </Button>
              )}

              <p className="text-slate-600 text-sm mb-6 text-center">
                No credit card required. 14-day free trial.
              </p>

              <div className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature.id} className="flex items-start">
                    <div
                      className={`mt-1 rounded-full p-1 ${
                        feature.included ? "bg-emerald-100" : "bg-slate-100"
                      }`}
                    >
                      <Check
                        size={16}
                        className={
                          feature.included
                            ? "text-emerald-500"
                            : "text-slate-300"
                        }
                      />
                    </div>
                    <span
                      className={`ml-3 text-sm ${
                        feature.included ? "text-slate-700" : "text-slate-400"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
