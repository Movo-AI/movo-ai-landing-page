export function MidPageCTA() {
  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-sans font-bold text-4xl md:text-5xl mb-6 text-balance">
            Ready to answer every call?
          </h2>
          <p className="text-lg text-foreground/70 mb-8 text-pretty">
            See how Movo can transform your academy's phone operations in less
            than 30 minutes.
          </p>
          <a
            href="https://calendly.com/ari-movo/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}
