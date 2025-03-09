"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  content: string;
  videoUrl?: string;
};

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO",
    company: "StyleHair Salon",
    avatarUrl: "/testimonials/avatar1.png",
    content:
      "No More Calls has completely transformed how we manage our business communications. We're saving hours each week and our staff is much happier.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video URL
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Operations Manager",
    company: "Zen Spa",
    avatarUrl: "/testimonials/avatar2.png",
    content:
      "The AI screening is incredibly accurate. It filters out spam and unwanted calls while making sure we never miss important client communications.",
  },
  {
    id: "3",
    name: "Jessica Williams",
    role: "Owner",
    company: "Glow Beauty",
    avatarUrl: "/testimonials/avatar3.png",
    content:
      "We've reduced interruptions by 87% since implementing No More Calls. Our staff can focus on clients without constant phone distractions.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video URL
  },
  {
    id: "4",
    name: "David Rodriguez",
    role: "Salon Director",
    company: "Elite Cuts",
    avatarUrl: "/testimonials/avatar4.png",
    content:
      "The setup was seamless and the customer support has been outstanding. I recommend this to every salon owner I know.",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLIFrameElement | null }>({});

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const playVideo = (id: string) => {
    setVideoPlaying(id);
  };

  const closeVideo = () => {
    setVideoPlaying(null);
  };

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Businesses Like Yours
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hear what our customers have to say about how No More Calls has
            transformed their business communications.
          </p>
        </div>

        {/* Video Testimonials */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold mb-8 text-center">Video Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials
              .filter((t) => t.videoUrl)
              .map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => playVideo(testimonial.id)}
                >
                  <div className="aspect-video bg-gray-800 relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={testimonial.avatarUrl.replace(
                          ".png",
                          "-video-thumbnail.jpg"
                        )}
                        alt={`${testimonial.name} video testimonial`}
                        width={600}
                        height={340}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black opacity-40"></div>
                      <div className="absolute flex flex-col items-center justify-center text-white z-10">
                        <motion.div
                          className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                        >
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
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </motion.div>
                        <p className="mt-4 font-medium text-lg">
                          {testimonial.name}
                        </p>
                        <p className="text-sm opacity-90">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Text Testimonials */}
        <div>
          <h3 className="text-2xl font-bold mb-12 text-center">
            What People Say
          </h3>
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 z-10 hidden md:block">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white shadow-md hover:bg-gray-50"
                onClick={prevTestimonial}
              >
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
                  <path d="M15 18l-6-6 6-6"></path>
                </svg>
              </Button>
            </div>
            <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 z-10 hidden md:block">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white shadow-md hover:bg-gray-50"
                onClick={nextTestimonial}
              >
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
                  <path d="M9 18l6-6-6-6"></path>
                </svg>
              </Button>
            </div>

            {/* Testimonial Cards */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <motion.div
                      className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center mb-6">
                        <div className="mr-4">
                          <Image
                            src={testimonial.avatarUrl}
                            alt={testimonial.name}
                            width={56}
                            height={56}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-slate-950">
                            {testimonial.name}
                          </h4>
                          <p className="text-slate-600">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <svg
                          width="32"
                          height="24"
                          viewBox="0 0 32 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M31.2 0H23.2C22.08 0 21.12 0.42 20.48 1.06C19.84 1.7 19.36 2.66 19.36 3.72V11.72C19.36 12.78 19.84 13.74 20.48 14.38C21.12 15.02 22.08 15.44 23.2 15.44H26.72V17.58C26.72 18.64 26.24 19.6 25.6 20.24C24.96 20.88 24 21.3 22.88 21.3H22.4C21.76 21.3 21.28 21.72 21.28 22.36V23.94C21.28 24.58 21.76 25 22.4 25H22.88C25.12 25 27.2 24.16 28.64 22.78C30.08 21.4 31.04 19.32 31.04 17.14V3.72C31.04 2.66 30.56 1.7 29.92 1.06C29.28 0.42 28.32 0 27.2 0H31.2ZM11.84 0H3.84C2.72 0 1.76 0.42 1.12 1.06C0.48 1.7 0 2.66 0 3.72V11.72C0 12.78 0.48 13.74 1.12 14.38C1.76 15.02 2.72 15.44 3.84 15.44H7.36V17.58C7.36 18.64 6.88 19.6 6.24 20.24C5.6 20.88 4.64 21.3 3.52 21.3H3.04C2.4 21.3 1.92 21.72 1.92 22.36V23.94C1.92 24.58 2.4 25 3.04 25H3.52C5.76 25 7.84 24.16 9.28 22.78C10.72 21.4 11.68 19.32 11.68 17.14V3.72C11.68 2.66 11.2 1.7 10.56 1.06C9.92 0.42 8.96 0 7.84 0H11.84Z"
                            fill="#E2E8F0"
                          />
                        </svg>
                      </div>
                      <p className="text-slate-800 text-lg leading-relaxed">
                        {testimonial.content}
                      </p>
                      {testimonial.videoUrl && (
                        <Button
                          variant="ghost"
                          className="mt-6 text-indigo-600 flex items-center"
                          onClick={() => playVideo(testimonial.id)}
                        >
                          <svg
                            className="mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="10 8 16 12 10 16 10 8"></polygon>
                          </svg>
                          Watch video
                        </Button>
                      )}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center mt-8 space-x-2 md:hidden">
              <Button variant="outline" size="sm" onClick={prevTestimonial}>
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={nextTestimonial}>
                Next
              </Button>
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full mx-1 ${
                    index === activeIndex ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  title={`Testimonial ${index + 1}: ${
                    testimonials[index].name
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <Button
              variant="outline"
              size="icon"
              className="absolute -top-12 right-0 bg-white rounded-full"
              onClick={closeVideo}
            >
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              <iframe
                ref={(el) => {
                  videoRefs.current[videoPlaying] = el;
                }}
                width="100%"
                height="100%"
                src={testimonials.find((t) => t.id === videoPlaying)?.videoUrl}
                title="Testimonial Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
