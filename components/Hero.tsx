export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-start"
      style={{
        minHeight: "100svh",
        overflow: "hidden",
        backgroundImage: "url('/images/hero-court.webp')",
        backgroundSize: "160%",
        backgroundPosition: "center 40%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: `radial-gradient(900px 600px at 25% 45%, rgba(255,185,120,0.3), transparent 70%),
                       linear-gradient(to bottom right, rgba(255,200,130,0.15), rgba(0,0,0,0.05) 60%)`,
        }}
      />

      <div
        className="relative"
        style={{
          zIndex: 2,
          marginInlineStart: "80px",
          marginBlockStart: "10svh",
          width: "540px",
          padding: "54px 60px",
          borderRadius: "28px",
          background: "rgba(255,218,180,0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 18px 60px rgba(255,170,100,0.18)",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.7,
            marginBlockEnd: "12px",
          }}
        >
          AI VOICE RECEPTIONIST FOR SPORTS ACADEMIES
        </div>

        <h1
          style={{
            fontSize: "62px",
            lineHeight: "1.05",
            letterSpacing: "-0.01em",
            margin: "0 0 18px 0",
            color: "#1C0E3D",
            fontWeight: 900,
          }}
        >
          Parents are calling.
          <br />
          You're not answering.
        </h1>

        <p
          style={{
            color: "rgba(20,10,45,0.9)",
            fontSize: "16px",
            lineHeight: "1.6",
            margin: "0 0 8px 0",
          }}
        >
          Every missed call is a missed enrollment. Movo answers instantly — in your voice.
        </p>
        <p
          style={{
            color: "rgba(20,10,45,0.9)",
            fontSize: "16px",
            lineHeight: "1.6",
            margin: "0 0 8px 0",
          }}
        >
          Books trials, sends payment links, and never sleeps.
        </p>

        <div className="flex items-center" style={{ gap: "18px", marginTop: "22px" }}>
          <a
            href="#audio"
            className="inline-flex items-center hover:translate-y-px active:translate-y-0.5 transition-transform"
            style={{
              gap: "10px",
              padding: "18px 26px",
              borderRadius: "18px",
              fontWeight: 800,
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(90deg, #8064F9, #A88FFF)",
              color: "#fff",
              boxShadow: "0 10px 24px rgba(127,90,240,0.25)",
            }}
          >
            🎧 Hear Movo Answer a Parent Call
          </a>
          <a
            href="#book"
            className="inline-flex items-center hover:translate-y-px active:translate-y-0.5 transition-transform"
            style={{
              gap: "10px",
              padding: "18px 26px",
              borderRadius: "18px",
              fontWeight: 800,
              textDecoration: "none",
              cursor: "pointer",
              background: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(0,0,0,0.08)",
              color: "#1C0E3D",
            }}
          >
            🚀 Book a Demo
          </a>
        </div>

        <div style={{ marginTop: "14px", fontSize: "12px", opacity: 0.75 }}>
          Trusted by leading academies like MPAC Sports.
        </div>
      </div>

      <figure
        className="absolute"
        style={{
          right: "10%",
          bottom: "60px",
          zIndex: 2,
          transform: "scale(1.35)",
          transformOrigin: "bottom right",
          filter: "brightness(1.05) contrast(1.08) drop-shadow(0 22px 38px rgba(0,0,0,0.35))",
        }}
      >
        <img
          src="/images/mascot-movo.png"
          alt="Movo mascot"
          style={{
            display: "block",
            width: "min(32vw, 520px)",
            height: "auto",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "auto 0 -10px 0",
            height: "200px",
            background: "radial-gradient(520px 200px at 65% 90%, rgba(255,160,80,0.35), transparent 70%)",
          }}
        />
      </figure>
    </section>
  )
}
