export function IntegrationsGrid() {
  const integrations = [
    {
      name: "iClassPro",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GmsDzcv4LLPTHbJmEb9kv2ZGkl93at.png",
      height: 40,
    },
    {
      name: "NBC Sports Engine",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JfDrb7Hoh33HIsnDzIVEQ9UpDpATLQ.png",
      height: 60,
    },
    {
      name: "Amilia",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bW6RMmQeiivluMyQuyppVS9sBAKX3M.png",
      height: 35,
    },
    {
      name: "Acuity Scheduling",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DI9epqKjKWkqOsRCMdIacDcg64Xxue.png",
      height: 35,
    },
    {
      name: "MindBody",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BzUTcirfRSnLDoHaqchLGDVzUGf8bC.png",
      height: 40,
    },
    {
      name: "Stripe",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xmKrrG018WsW7Rws22ACjZYtidvSj3.png",
      height: 45,
    },
    {
      name: "LeagueApps",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aoq2duf4sUBSqFOY9hOmI8uVJAgK6d.png",
      height: 35,
    },
    {
      name: "DaySmart",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-c1AtkgfOhAayGGdOwpi3D6xrynnGxR.png",
      height: 35,
    },
    {
      name: "Salesforce",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cOFVdqV01YkencCwLKj8XAGTQgS9ez.png",
      height: 50,
    },
    {
      name: "Square",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZCgf56rVfQGyV3F9sktuE7P7g3kSdp.png",
      height: 40,
    },
  ]

  return (
    <section className="py-16 border-y border-border bg-muted/30">
      <div className="container max-w-7xl mx-auto px-6">
        <h3 className="text-2xl md:text-3xl font-bold font-sans text-center mb-4 text-foreground">
          Connects to the systems you already use.
        </h3>
        <p className="text-center text-sm text-muted-foreground mb-12">
          No migration, no new software — just plug in and go live.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={integration.logo || "/placeholder.svg"}
                alt={integration.name}
                className="max-h-full w-auto object-contain"
                style={{ height: `${integration.height}px` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
