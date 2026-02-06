export function Hero() {
  return (
    <section className="relative py-8 md:py-12 lg:py-16 bg-background">
      <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/5 via-background to-accent/10 border-2 border-accent/20 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center p-8 md:p-12 lg:p-16 xl:p-20">
            {/* Left content */}
            <div className="relative z-10 space-y-6 md:space-y-8">
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-balance text-foreground">
                Your phone rings at 9 PM.
                <span className="block mt-2 text-accent">Movo picks up.</span>
              </h1>

              <p className="font-sans text-lg md:text-xl lg:text-2xl leading-relaxed text-pretty max-w-2xl text-muted-foreground">
                The AI receptionist for sports academies — fluent in your
                programs, pricing, and tone. Answers every parent call 24/7, on
                the court, in the car, or finally off the clock.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://calendly.com/ari-movo/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-secondary text-accent-foreground font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Hear Movo in Action
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background border-2 border-foreground/20 hover:border-foreground hover:bg-muted text-foreground font-semibold rounded-xl transition-all text-lg"
                >
                  See How It Works
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right content - Line illustration */}
            <div className="relative flex items-center justify-center lg:justify-end min-h-[400px]">
              <svg
                className="w-full h-full max-w-lg"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Basketball player outline */}
                <g
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-foreground/30"
                >
                  {/* Head */}
                  <circle cx="200" cy="80" r="25" />
                  {/* Body */}
                  <line x1="200" y1="105" x2="200" y2="200" />
                  {/* Arms */}
                  <line x1="200" y1="130" x2="150" y2="180" />
                  <line x1="200" y1="130" x2="250" y2="160" />
                  {/* Legs */}
                  <line x1="200" y1="200" x2="170" y2="280" />
                  <line x1="200" y1="200" x2="230" y2="280" />
                  {/* Basketball */}
                  <circle cx="260" cy="150" r="20" />
                  <path d="M 240 150 Q 260 140 280 150" />
                  <path d="M 240 150 Q 260 160 280 150" />
                  <line x1="260" y1="130" x2="260" y2="170" />
                </g>

                {/* Accent elements */}
                <circle
                  cx="100"
                  cy="100"
                  r="3"
                  fill="currentColor"
                  className="text-accent"
                />
                <circle
                  cx="300"
                  cy="120"
                  r="3"
                  fill="currentColor"
                  className="text-accent"
                />
                <circle
                  cx="120"
                  cy="300"
                  r="3"
                  fill="currentColor"
                  className="text-accent"
                />
                <circle
                  cx="320"
                  cy="280"
                  r="3"
                  fill="currentColor"
                  className="text-accent"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
