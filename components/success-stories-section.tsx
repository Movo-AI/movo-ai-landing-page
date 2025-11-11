"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const caseStudies = [
  {
    company: "Supreme Hoops Basketball Academy",
    logo: "/supreme-hoops-logo.png",
    headline: "Clinic campaigns now sell themselves.",
    quote:
      "Before Movo, we missed dozens of clinic calls each week. Now every parent gets a reply instantly — even after hours. Movo runs our clinic campaigns, sends personalized emails and texts, and even closes payments. It's like having a sales team that never clocks out.",
    stats: [
      { value: "+$7,800", label: "new revenue in 30 days" },
      { value: "+61%", label: "trial sign-ups" },
      { value: "0", label: "missed calls after hours" },
    ],
    timestamp: "Results after 30 days",
  },
  {
    company: "MPAC Sports Training",
    logo: "/mpac-sports-logo.png",
    headline: "Every parent gets a personal response.",
    quote:
      "Movo learned our pricing, schedule, and class levels within a week. It now handles 90% of parent conversations — from first inquiry to booked trial. Families love how personal it feels. We just check Stripe and see new payments every day.",
    stats: [
      { value: "+$23.2K", label: "new monthly revenue" },
      { value: "1,200+", label: "parent conversations handled" },
      { value: "+48%", label: "faster follow-ups" },
    ],
    timestamp: "Since January 2025",
  },
]

export function SuccessStoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToPrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <section id="success" className="py-12 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-2">SUCCESS STORIES</p>
          <div className="flex items-start justify-between gap-8">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 leading-tight max-w-4xl mb-6">
                Real revenue from <span className="text-gray-400 italic">real families.</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl">
                From basketball clinics to swim trials, Movo turns everyday parent conversations into booked programs
                and recurring revenue.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              
              
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[0, 1].map((offset) => {
            const index = (currentIndex + offset) % caseStudies.length
            const caseStudy = caseStudies[index]
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 rounded-3xl p-10 min-h-[500px] flex flex-col justify-between transition-all duration-500 hover:shadow-xl relative"
              >
                <div className="absolute top-6 right-6 text-xs text-gray-400 italic">{caseStudy.timestamp}</div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <Image
                      src={caseStudy.logo || "/placeholder.svg"}
                      alt={`${caseStudy.company} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{caseStudy.company}</h3>
                </div>

                <div className="mb-4">
                  <p className="text-2xl font-bold text-gray-900">{caseStudy.headline}</p>
                </div>

                <blockquote className="text-lg md:text-xl font-serif text-gray-800 leading-relaxed mb-8 flex-grow">
                  "{caseStudy.quote}"
                </blockquote>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-300">
                  {caseStudy.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-600 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {caseStudies.map((_, index) => (
            null
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-lg text-gray-600 italic">
            Academies using Movo see new revenue within their first 2 weeks.
          </p>
        </div>
      </div>
    </section>
  )
}
