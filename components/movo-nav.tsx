"use client";

import { useState } from "react";

export function MovoNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-[100] text-white"
      style={{
        background: "rgba(10,8,20,0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-[1140px] mx-auto px-6 h-[68px] flex items-center justify-between">
        <div className="flex items-center gap-2.5 font-bold">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "linear-gradient(90deg, #7E64FF, #B39DFF)" }}
          />
          <span>movo</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#hear"
            className="text-white font-semibold opacity-90 hover:opacity-100 transition-opacity"
          >
            🎧 Hear a Call
          </a>
          <a
            href="https://calendly.com/ari-movo/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden px-[22px] py-[14px] text-white rounded-[12px] font-semibold transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(90deg, #7E64FF, #B39DFF)",
              boxShadow: "0 12px 34px rgba(126,100,255,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 16px 40px rgba(126,100,255,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 12px 34px rgba(126,100,255,0.35)";
            }}
          >
            🚀 Book a Demo
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 px-6 flex flex-col gap-4 max-w-[1140px] mx-auto">
          <a href="#hear" className="text-white font-semibold text-center py-3">
            🎧 Hear a Call
          </a>
          <a
            href="https://calendly.com/ari-movo/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-[22px] py-[14px] text-white rounded-[12px] font-semibold text-center"
            style={{
              background: "linear-gradient(90deg, #7E64FF, #B39DFF)",
              boxShadow: "0 12px 34px rgba(126,100,255,0.35)",
            }}
          >
            🚀 Book a Demo
          </a>
        </div>
      )}
    </nav>
  );
}
