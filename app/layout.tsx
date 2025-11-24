import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Playfair_Display, Caveat } from "next/font/google"
import Script from "next/script"
import { Suspense } from "react"
import { PostHogProvider } from "@/components/posthog-provider"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Movo AI - The AI Platform for Sports Academies",
  description: "Turn missed calls into enrollments with AI phone reps",
  metadataBase: new URL("https://movoai.co"),
  openGraph: {
    title: "Movo AI - The AI Platform for Sports Academies",
    description: "Movo calls every parent, books enrollments, and grows your revenue - automatically.",
    url: "https://movoai.co",
    siteName: "Movo AI",
    images: [
      {
        url: "/movo-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Movo AI - The AI Platform for Sports Academies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Movo AI - The AI Platform for Sports Academies",
    description: "Movo calls every parent, books enrollments, and grows your revenue - automatically.",
    images: ["/movo-og-image.jpg"],
  },
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              id="warmly-script-loader"
              src="https://opps-widget.getwarmly.com/warmly.js?clientId=ce6fb70f7dbeb5a4e6315f9069535677"
              strategy="afterInteractive"
            />
            <Script
              id="midbound-script-loader"
              src="https://px.midbound.ai/cmidmjuyy0001s601fj8m5nyt"
              strategy="afterInteractive"
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${playfair.variable} ${caveat.variable} font-sans overflow-x-hidden max-w-full`}
      >
        <Suspense fallback={null}>
          <PostHogProvider>{children}</PostHogProvider>
        </Suspense>
      </body>
    </html>
  )
}
