"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden text-[#1A1A1A]">
      <div
        className="absolute inset-0 bg-[url('/court-grounded.png')] bg-no-repeat bg-cover"
        style={{
          backgroundPosition: "center bottom",
          backgroundSize: "115%",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#00000020] via-[#00000008] to-transparent" />

      <header className="absolute top-0 left-0 right-0 flex justify-between items-center px-8 py-6 z-20">
        <div className="text-[20px] font-bold tracking-tight text-[#1A1A1A]">
          MOVO
        </div>
        <nav className="flex items-center space-x-6">
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-[#1A1A1A]/80 hover:text-[#1A1A1A]"
          >
            How It Works
          </Link>
          <Link
            href="#demo"
            className="bg-white text-[#1A1A1A] font-semibold px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-all text-sm"
          >
            Book a Demo
          </Link>
        </nav>
      </header>

      <div className="relative z-20 flex flex-col md:flex-row items-center justify-between max-w-7xl w-full px-6 md:px-12">
        <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl p-10 md:p-12 max-w-lg shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-[-0.01em] mb-6">
            Parents are calling. <br />
            You're not answering.
          </h1>

          <p className="text-[17px] md:text-[18px] leading-relaxed text-[#2E2E2E] mb-8">
            Every missed call is a missed enrollment. Movo answers instantly —
            in your voice. Books trials, sends payment links, and never sleeps.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 rounded-xl font-semibold text-white text-[16px] bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:scale-[1.02] transition-transform">
              🎧 Hear Movo Answer a Parent Call
            </button>
            <button className="px-6 py-3 rounded-xl font-semibold text-[#1a1a1a] text-[16px] bg-white border border-[#e2e2e2] shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-transform">
              🚀 Book a Demo
            </button>
          </div>

          <p className="text-xs text-[#6B6B6B] mt-6">
            Trusted by leading academies like{" "}
            <strong>All Star Sports Academy</strong>.
          </p>
        </div>

        <div className="absolute bottom-[80px] right-[5%] md:right-[8%] w-[500px] md:w-[600px] lg:w-[700px] z-10">
          <Image
            src="/movo-avatar.png"
            alt="Movo Mascot"
            width={700}
            height={700}
            className="relative z-10 w-full h-auto select-none pointer-events-none"
            priority
          />
          <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[350px] h-[55px] bg-black/30 blur-[60px] rounded-full z-0" />
        </div>
      </div>
    </section>
  );
}
