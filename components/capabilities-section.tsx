export function CapabilitiesSection() {
  const capabilities = [
    {
      icon: "📞",
      title: "24/7 Availability",
      description: "Never miss a call with round-the-clock AI coverage",
    },
    {
      icon: "🎯",
      title: "Lead Qualification",
      description: "Automatically qualify and route high-intent prospects",
    },
    {
      icon: "📅",
      title: "Smart Scheduling",
      description: "Book appointments seamlessly without back-and-forth",
    },
    {
      icon: "💬",
      title: "Natural Conversations",
      description: "Human-like interactions that feel authentic",
    },
    {
      icon: "📊",
      title: "Real-time Analytics",
      description: "Track performance and insights in your dashboard",
    },
    {
      icon: "🔗",
      title: "CRM Integration",
      description: "Sync directly with your existing tools and workflows",
    },
  ]

  return (
    <section className="py-24 md:py-32 px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-movo-lavender/30 via-transparent to-transparent" />

      <div className="container max-w-7xl mx-auto relative">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Everything you need to scale
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto text-balance">
            Movo handles every aspect of customer communication so you can focus on what matters most
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-2xl p-8 hover:shadow-frosted transition-all duration-500 hover:-translate-y-1 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                {capability.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{capability.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{capability.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
