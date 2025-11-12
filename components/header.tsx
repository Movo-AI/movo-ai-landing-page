export default function Header() {
  return (
    <div
      className="absolute flex items-center justify-between"
      style={{
        insetBlockStart: "60px",
        insetInline: "80px",
        zIndex: 3,
      }}
    >
      <div
        style={{
          fontWeight: 800,
          letterSpacing: "0.5px",
          color: "#1C0E3D",
          fontSize: "18px",
        }}
      >
        MOVO
      </div>

      <nav className="flex items-center" style={{ gap: "28px" }}>
        <a
          href="#how"
          className="hover:opacity-70 transition-opacity"
          style={{
            color: "rgba(28,14,61,0.8)",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "15px",
          }}
        >
          How It Works
        </a>
        <a
          href="#book"
          className="hover:opacity-90 transition-opacity"
          style={{
            padding: "12px 20px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(0,0,0,0.06)",
            color: "#1C0E3D",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Book a Demo
        </a>
      </nav>
    </div>
  )
}
