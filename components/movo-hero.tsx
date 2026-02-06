"use client";

export function MovoHero() {
  return (
    <section
      className="relative min-h-[92vh] flex items-end text-white overflow-hidden"
      style={{
        background: `
          radial-gradient(1200px 600px at 60% 85%, rgba(126,100,255,0.28), transparent 70%),
          linear-gradient(180deg, rgba(8,6,18,0.15) 0%, rgba(8,6,18,0.55) 40%, rgba(8,6,18,0.75) 70%, rgba(8,6,18,0.9) 100%),
          url(/images/basketball-court-hero.jpg) center/cover no-repeat
        `,
      }}
    >
      <div
        className="absolute left-[55%] bottom-[120px] w-[360px] h-[360px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(126,100,255,0.55) 0%, rgba(126,100,255,0) 70%)",
          filter: "blur(6px)",
          animation: "pulse 5s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 max-w-[1140px] mx-auto px-6 pb-[120px] pt-20">
        <div
          className="uppercase mb-3 font-bold text-xs tracking-[0.18em]"
          style={{
            background: "linear-gradient(90deg, #7E64FF, #B39DFF, #7E64FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 100%",
            animation: "shimmer 7s linear infinite",
          }}
        >
          AI VOICE RECEPTIONIST FOR SPORTS ACADEMIES
        </div>

        <h1
          className="text-[64px] font-bold leading-[1.06] mb-2.5"
          style={{ textShadow: "0 2px 14px rgba(0,0,0,0.45)" }}
        >
          Parents are calling.
          <br />
          You're not answering.
        </h1>

        <p
          className="text-xl max-w-[620px] leading-relaxed mb-[18px]"
          style={{
            color: "rgba(255,255,255,0.9)",
            textShadow: "0 2px 10px rgba(0,0,0,0.35)",
          }}
        >
          Every missed call is a missed enrollment.
          <br />
          Movo answers instantly — in your voice.
          <br />
          Books trials, sends payment links, and never sleeps.
        </p>

        <div className="flex gap-3 flex-wrap mt-[18px]">
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
            🎧 Hear Movo Answer a Parent Call
          </a>

          <a
            href="https://calendly.com/ari-movo/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-[22px] py-[14px] text-white rounded-[12px] font-semibold border-2 transition-all"
            style={{
              borderColor: "rgba(255,255,255,0.6)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            🚀 Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}
