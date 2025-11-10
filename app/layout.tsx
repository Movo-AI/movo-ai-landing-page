import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Playfair_Display, Caveat } from "next/font/google"
import Script from "next/script"
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
  generator: "v0.app",
  icons: {
    icon: "/movo-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === "production" && (
          <Script
            id="warmly-script-loader"
            src="https://opps-widget.getwarmly.com/warmly.js?clientId=ce6fb70f7dbeb5a4e6315f9069535677"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`${geistSans.variable} ${playfair.variable} ${caveat.variable} font-sans`}>{children}</body>
    </html>
  )
}
