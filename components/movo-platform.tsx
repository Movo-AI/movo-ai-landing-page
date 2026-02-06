"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function MovoPlatform() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 150 && !isVisible) {
          setIsVisible(true);
          setTimeout(() => setImageVisible(true), 200);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="see-it"
      className={`py-20 md:py-32 bg-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-[#111] leading-tight">
              Every call. Every lead.
              <br />
              All in one place.
            </h2>

            <p className="text-lg text-[#555] leading-relaxed">
              Your Movo dashboard shows every conversation — who called, what
              they asked, and what happened next. Follow up instantly or let
              Movo close the loop for you.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-[#333]">
                <span className="text-green-600 text-xl flex-shrink-0">✅</span>
                <span>Full call transcripts and summaries</span>
              </li>
              <li className="flex items-start gap-3 text-[#333]">
                <span className="text-green-600 text-xl flex-shrink-0">✅</span>
                <span>Missed-call alerts with instant callback</span>
              </li>
              <li className="flex items-start gap-3 text-[#333]">
                <span className="text-green-600 text-xl flex-shrink-0">✅</span>
                <span>WhatsApp and SMS integrations</span>
              </li>
              <li className="flex items-start gap-3 text-[#333]">
                <span className="text-green-600 text-xl flex-shrink-0">✅</span>
                <span>Lead and payment tracking</span>
              </li>
            </ul>

            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <a
                href="https://calendly.com/ari-movo/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                See the Dashboard
              </a>
            </Button>
          </div>

          <div
            className={`relative transition-all duration-700 delay-200 ${
              imageVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/movo-dashboard.png"
                alt="Movo Sport Center dashboard showing call logs, customer interactions, and key metrics"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl transform scale-110" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
