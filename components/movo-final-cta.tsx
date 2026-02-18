"use client";

import { useEffect, useRef, useState } from "react";

export function MovoFinalCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 150) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden text-white text-center py-32 md:py-44 px-6"
      style={{
        background: "linear-gradient(90deg, #7E64FF 0%, #FFB88E 100%)",
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/basketball-court-hero.jpg)",
        }}
      />

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,10,50,0.8) 0%, rgba(15,10,50,0.6) 60%, rgba(15,10,50,0.9) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Headline */}
        <h2
          className={`text-5xl md:text-6xl font-bold mb-5 font-sans transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Ready to see it in action?
        </h2>

        {/* Subtext */}
        <p
          className={`text-xl md:text-2xl leading-relaxed mb-12 transition-all duration-700 ease-out delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ color: "#E8E8EE" }}
        >
          Stop missing calls. Let Movo handle your academy's communication —
          24/7, in your tone, with zero missed leads.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-5 mb-8 transition-all duration-700 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="https://calendly.com/ari-movo/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-4 bg-primary text-white rounded-xl font-semibold text-lg uppercase transition-all hover:scale-105 hover:brightness-110"
          >
            Book a walkthrough
          </a>
          <a
            href="https://calendly.com/ari-movo/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg uppercase transition-all hover:scale-105 hover:bg-white hover:text-primary"
          >
            Hear a real call
          </a>
        </div>

        {/* Footnote */}
        <p
          className={`text-base opacity-90 mt-10 transition-all duration-700 ease-out delay-300 ${
            isVisible ? "opacity-90 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ color: "#C8C8D8" }}
        >
          Join academies like MPAC Sports already using Movo to stay always
          connected.
        </p>
      </div>
    </section>
  );
}
