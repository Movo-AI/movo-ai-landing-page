"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Phone, Play, Pause } from "lucide-react"
import { Header } from "@/components/header"
import { ProblemSection } from "@/components/problem-section"
import { WhoItsFor } from "@/components/who-its-for"
import { HowItWorks } from "@/components/how-it-works"
import { UseCaseStory } from "@/components/use-case-story"
import { LiveActivity } from "@/components/live-activity"
import { FinalCTA } from "@/components/final-cta"
import { SuccessStoriesSection } from "@/components/success-stories-section"

export default function Home() {
  const [showCallMe, setShowCallMe] = useState(false)
  const [showHearMovo, setShowHearMovo] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHeroAudioPlaying, setIsHeroAudioPlaying] = useState(false)
  const [isLearnVideoPlaying, setIsLearnVideoPlaying] = useState(false)
  const learnVideoRef = useRef<HTMLAudioElement>(null)
  const heroAudioRef = useRef<HTMLAudioElement>(null)
  const [audioProgress, setAudioProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isPhonePlaying, setIsPhonePlaying] = useState(false)
  const [phoneAudioProgress, setPhoneAudioProgress] = useState(0)
  const phoneAudioRef = useRef<HTMLAudioElement>(null)

  const [activePillar, setActivePillar] = useState<"multi-channel" | "payment" | "learning">("multi-channel")

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const previewQuestions = [
    '"Hi, do you have soccer for 10-year-olds?"',
    '"Can we schedule a trial for this Friday?"',
    '"What packages do you offer after the trial?"',
    '"Is there a discount for siblings?"',
    '"Do you have availability on weekends?"',
    '"Can we try a class before committing?"',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % previewQuestions.length)
    }, 3000) // Change question every 3 seconds
    return () => clearInterval(interval)
  }, [previewQuestions.length])

  const [calculatedRevenue, setCalculatedRevenue] = useState(0) // Initialize with a default value or calculate later
  const [missedCalls, setMissedCalls] = useState(50)
  const [conversionRate, setConversionRate] = useState(40)
  const [avgEnrollment, setAvgEnrollment] = useState(600)

  const [liveActivities, setLiveActivities] = useState([
    { city: "Charlotte", action: "Trial booked", time: "2m ago", revenue: "$600" },
    { city: "Atlanta", action: "Enrollment confirmed", time: "5m ago", revenue: "$1,200" },
    { city: "Miami", action: "Payment received", time: "8m ago", revenue: "$450" },
  ])

  const [socialProofMessages, setSocialProofMessages] = useState([
    "John from Chicago just booked $1,200 in enrollments",
    "Sarah from Miami confirmed 3 trial sessions",
    "Mike from Dallas recovered $850 from a missed call",
  ])
  const [currentProofIndex, setCurrentProofIndex] = useState(0)

  const [callMeForm, setCallMeForm] = useState({ name: "", email: "", phone: "", newsletter: true })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProofIndex((prev) => (prev + 1) % socialProofMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [socialProofMessages.length])

  useEffect(() => {
    const activities = [
      { city: "Charlotte", action: "Trial booked", revenue: "$600" },
      { city: "Atlanta", action: "Enrollment confirmed", revenue: "$1,200" },
      { city: "Miami", action: "Payment received", revenue: "$450" },
      { city: "Phoenix", action: "Trial confirmed", revenue: "$550" },
      { city: "Boston", action: "Package purchased", revenue: "$2,400" },
      { city: "Seattle", action: "Trial booked", revenue: "$650" },
    ]

    const interval = setInterval(() => {
      const newActivity = activities[Math.floor(Math.random() * activities.length)]
      setLiveActivities((prev) => [{ ...newActivity, time: "Just now" }, ...prev.slice(0, 2)])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (showHearMovo && audioRef.current) {
      console.log("[v0] Hear Movo modal opened, attempting to play audio")
      // Small delay to ensure modal is visible
      setTimeout(() => {
        const playPromise = audioRef.current?.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("[v0] Audio playback started successfully")
              setIsPlaying(true)
            })
            .catch((error) => {
              console.log("[v0] Auto-play prevented by browser:", error)
              // Browser prevented autoplay, user needs to click play button
              setIsPlaying(false)
            })
        }
      }, 500)
    } else if (!showHearMovo && audioRef.current) {
      console.log("[v0] Modal closed, stopping audio")
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setAudioProgress(0)
    }
  }, [showHearMovo])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px",
    }

    const animateOnScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }

    const observer = new IntersectionObserver(animateOnScroll, observerOptions)
    const elements = document.querySelectorAll(".fade-on-scroll")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      const progress = (audio.currentTime / audio.duration) * 100
      setAudioProgress(progress)
    }

    audio.addEventListener("timeupdate", updateProgress)
    return () => audio.removeEventListener("timeupdate", updateProgress)
  }, [])

  const [counts, setCounts] = useState({ response: 0, conversion: 0, revenue: 0 })
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  const handleHeroAudioPlay = () => {
    if (heroAudioRef.current) {
      if (isHeroAudioPlaying) {
        heroAudioRef.current.pause()
        setIsHeroAudioPlaying(false)
      } else {
        const playPromise = heroAudioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsHeroAudioPlaying(true)
            })
            .catch((error) => {
              console.error("Error playing audio:", error)
              setIsHeroAudioPlaying(false)
            })
        }
      }
    }
  }

  useEffect(() => {
    const audio = heroAudioRef.current
    if (!audio) return

    const handleEnded = () => {
      setIsHeroAudioPlaying(false)
    }

    audio.addEventListener("ended", handleEnded)
    return () => audio.removeEventListener("ended", handleEnded)
  }, [])

  const handleLearnVideoPlay = () => {
    if (learnVideoRef.current) {
      if (isLearnVideoPlaying) {
        learnVideoRef.current.pause()
        setIsLearnVideoPlaying(false)
      } else {
        const playPromise = learnVideoRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsLearnVideoPlaying(true)
            })
            .catch((error) => {
              console.error("Error playing video:", error)
              setIsLearnVideoPlaying(false)
            })
        }
      }
    }
  }

  useEffect(() => {
    const audio = learnVideoRef.current
    if (!audio) return

    const handleEnded = () => {
      setIsLearnVideoPlaying(false)
    }

    audio.addEventListener("ended", handleEnded)
    return () => audio.removeEventListener("ended", handleEnded)
  }, [])

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              console.error("Error playing audio:", error)
              setIsPlaying(false)
            })
        }
      }
    }
  }

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle demo submission logic
  }

  const handleCallMeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Call Me form submitted:", callMeForm)
    // Here you would typically send this to your backend
    setShowCallMe(false)
    // Reset form
    setCallMeForm({ name: "", email: "", phone: "", newsletter: true })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (phoneAudioRef.current && isPhonePlaying) {
        const progress = (phoneAudioRef.current.currentTime / phoneAudioRef.current.duration) * 100
        setPhoneAudioProgress(progress)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isPhonePlaying])

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        // The error was here: `audio` was used instead of `audioRef.current`
        const audio = audioRef.current
        if (!audio) return // Added safety check
        const progress = (audio.currentTime / audio.duration) * 100
        setAudioProgress(progress)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying])

  useEffect(() => {
    const audio = phoneAudioRef.current
    if (!audio) return

    const updateProgress = () => {
      const progress = (audio.currentTime / audio.duration) * 100
      setPhoneAudioProgress(progress)
    }

    audio.addEventListener("timeupdate", updateProgress)
    return () => audio.removeEventListener("timeupdate", updateProgress)
  }, [])

  useEffect(() => {
    const audio = phoneAudioRef.current
    if (!audio) return

    const handleEnded = () => {
      setIsPhonePlaying(false)
      setPhoneAudioProgress(0)
    }

    audio.addEventListener("ended", handleEnded)
    return () => audio.removeEventListener("ended", handleEnded)
  }, [])

  const handlePhonePlayAudio = () => {
    if (phoneAudioRef.current) {
      if (isPhonePlaying) {
        phoneAudioRef.current.pause()
        setIsPhonePlaying(false)
      } else {
        const playPromise = phoneAudioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPhonePlaying(true)
            })
            .catch((error) => {
              console.error("Error playing audio:", error)
              setIsPhonePlaying(false)
            })
        }
      }
    }
  }

  // Placeholder for calculatedRevenue, assuming it's derived from other states
  // You might want to move the calculation to a place where all dependencies are guaranteed to be set
  useEffect(() => {
    // Dummy calculation for now, replace with actual logic if needed
    setCalculatedRevenue((missedCalls * (conversionRate / 100) * avgEnrollment) / 1000)
  }, [missedCalls, conversionRate, avgEnrollment])

  const [weeklyRevenue, setWeeklyRevenue] = useState(0)
  const [isRevenueVisible, setIsRevenueVisible] = useState(false)
  const revenueTargetRef = useRef<HTMLDivElement>(null)

  // Animate revenue counter when section is visible
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px",
    }

    const animateRevenue = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isRevenueVisible) {
          setIsRevenueVisible(true)
          let currentValue = 0
          const target = 2840
          const duration = 2000 // 2 seconds
          const increment = target / (duration / 16) // 60fps

          const timer = setInterval(() => {
            currentValue += increment
            if (currentValue >= target) {
              setWeeklyRevenue(target)
              clearInterval(timer)
            } else {
              setWeeklyRevenue(Math.floor(currentValue))
            }
          }, 16)
        }
      })
    }

    const observer = new IntersectionObserver(animateRevenue, observerOptions)
    if (revenueTargetRef.current) {
      observer.observe(revenueTargetRef.current)
    }

    return () => observer.disconnect()
  }, [isRevenueVisible])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px",
    }

    const animateStats = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsVisible) {
          setStatsVisible(true)

          // Animate response time (target: 5)
          let responseVal = 0
          const responseTimer = setInterval(() => {
            responseVal += 0.1
            if (responseVal >= 5) {
              setCounts((prev) => ({ ...prev, response: 5 }))
              clearInterval(responseTimer)
            } else {
              setCounts((prev) => ({ ...prev, response: Math.round(responseVal * 10) / 10 }))
            }
          }, 30)

          // Animate conversion (target: 47)
          let conversionVal = 0
          const conversionTimer = setInterval(() => {
            conversionVal += 0.8
            if (conversionVal >= 47) {
              setCounts((prev) => ({ ...prev, conversion: 47 }))
              clearInterval(conversionTimer)
            } else {
              setCounts((prev) => ({ ...prev, conversion: Math.floor(conversionVal) }))
            }
          }, 30)

          // Animate revenue (target: 4200)
          let revenueVal = 0
          const revenueTimer = setInterval(() => {
            revenueVal += 70
            if (revenueVal >= 4200) {
              setCounts((prev) => ({ ...prev, revenue: 4200 }))
              clearInterval(revenueTimer)
            } else {
              setCounts((prev) => ({ ...prev, revenue: Math.floor(revenueVal) }))
            }
          }, 30)
        }
      })
    }

    const observer = new IntersectionObserver(animateStats, observerOptions)
    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [statsVisible])

  return (
    <>
      <Header />
      <section className="relative min-h-screen">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kids%20Playing%20Sport%20Graphic%20Nov%209%202025%20%283%29-8bYxHxAQ0hnWrqQq3P4GKmM3DkXslx.png)",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-8 lg:px-16 py-32 md:py-20 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight text-white mb-6 max-w-5xl">
            AI That Sells for Your Academy
            <br />
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-3xl leading-relaxed px-4">
            Movo calls every parent, fills your classes, and grows your revenue - automatically.
          </p>

          <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a
              href="https://calendly.com/ari-movoai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#D97948] hover:bg-[#C96838] text-white text-sm sm:text-base font-medium rounded-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 w-full sm:w-auto cursor-pointer min-h-[48px]"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              Book a demo
            </a>
            <button
              onClick={handleHeroAudioPlay}
              className="group flex items-center justify-center gap-3 px-4 py-2 md:px-6 md:py-3 bg-white/10 hover:bg-white/20 text-white text-sm md:text-base font-medium rounded-sm transition-all duration-300 border border-white/20 backdrop-blur-sm hover:shadow-2xl hover:scale-105 w-full sm:w-auto cursor-pointer min-h-[40px] md:min-h-[48px] min-w-[200px] md:min-w-[240px]"
            >
              <div className="relative w-6 h-6 md:w-8 md:h-8 flex items-center justify-center flex-shrink-0">
                {/* Animated waveform dots */}
                {isHeroAudioPlaying ? (
                  <div className="flex items-center gap-1">
                    <div
                      className="w-1 bg-white rounded-full animate-pulse"
                      style={{ height: "12px", animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-1 bg-white rounded-full animate-pulse"
                      style={{ height: "18px", animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-1 bg-white rounded-full animate-pulse"
                      style={{ height: "10px", animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="w-1 bg-white rounded-full animate-pulse"
                      style={{ height: "14px", animationDelay: "100ms" }}
                    ></div>
                  </div>
                ) : (
                  <Play className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </div>
              <span className="font-medium whitespace-nowrap text-sm md:text-base">Hear how Movo sells</span>
            </button>

            <audio
              ref={heroAudioRef}
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mono%20Audio%20File%20%281%29-Ky1VPeJmOkmuanheihF0JpGzdJSFY3.wav"
              className="hidden"
            />
          </div>

          <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 px-6 sm:px-8">
            <p className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest font-medium">
              Trusted by leading sports academies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
              {["Supreme Hoops", "MPAC Sports", "Haifa Swim", "Pro Soccer Academy", "Champion Tennis"].map(
                (name, i) => (
                  <span
                    key={i}
                    className="text-white/70 font-semibold text-sm sm:text-base md:text-lg lg:text-xl hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    {name}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
      <button
        onClick={() => setShowCallMe(true)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white text-gray-900 font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group cursor-pointer"
      >
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 rounded-lg bg-green-500 animate-ping opacity-40"></div>
        </div>
        <span className="text-sm sm:text-base">Talk to Movo</span>
      </button>
      <section id="product" className="min-h-screen flex items-center">
        <div className="w-full grid lg:grid-cols-2">
          {/* Left side - White background with content */}
          <div className="bg-white px-8 md:px-16 lg:px-20 py-20 flex items-center">
            <div className="max-w-xl">
              <div className="text-xs font-semibold tracking-widest text-gray-500 mb-8">BUILT FOR SPORTS ACADEMIES</div>

              <div
                ref={revenueTargetRef}
                className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full shadow-sm"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold text-green-700">+$4,840 in new trials this week</span>
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-gray-900 mb-8">
                AI that learns your academy
                <span className="block text-gray-400 italic">inside out.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-10">
                Trains on your programs, pricing, and families - then sells like your best rep.
              </p>

              <button
                onClick={handleLearnVideoPlay}
                className="group flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm md:text-base font-medium rounded-sm transition-all duration-300 mb-16 hover:shadow-2xl hover:scale-105 cursor-pointer w-auto max-w-fit"
              >
                <div className="relative w-5 h-5 md:w-6 md:h-6 flex items-center justify-center flex-shrink-0">
                  {isLearnVideoPlaying ? (
                    <div className="flex items-center gap-1">
                      <div
                        className="w-1 bg-white rounded-full animate-pulse"
                        style={{ height: "14px", animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-1 bg-white rounded-full animate-pulse"
                        style={{ height: "20px", animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-1 bg-white rounded-full animate-pulse"
                        style={{ height: "12px", animationDelay: "300ms" }}
                      ></div>
                      <div
                        className="w-1 bg-white rounded-full animate-pulse"
                        style={{ height: "16px", animationDelay: "100ms" }}
                      ></div>
                    </div>
                  ) : (
                    <Play className="w-4 h-4 md:w-4 md:h-4" />
                  )}
                </div>
                <span className="font-medium whitespace-nowrap text-sm md:text-base">See Movo learn in action</span>
              </button>
              <audio
                ref={learnVideoRef}
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mono%20Audio%20File%20%281%29-Ky1VPeJmOkmuanheihF0JpGzdJSFY3.wav"
                className="hidden"
              />

              {/* Numbered features */}
              <div className="space-y-8 border-t border-gray-200 pt-12">
                <div className="flex gap-6 group cursor-pointer hover:translate-x-2 transition-all duration-500">
                  <div className="text-3xl font-bold text-gray-900 flex-shrink-0 group-hover:text-[#D97948] transition-colors duration-300">
                    01
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Understands your playbook</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Knows your age groups, pricing, and peak hours so every parent gets the right answer instantly.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 group cursor-pointer hover:translate-x-2 transition-all duration-500">
                  <div className="text-3xl font-bold text-gray-900 flex-shrink-0 group-hover:text-[#D97948] transition-colors duration-300">
                    02
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Connects your systems</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Syncs with your tools like iClassPro, Stripe, and your calendar to manage bookings and payments
                      automatically.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 group cursor-pointer hover:translate-x-2 transition-all duration-500">
                  <div className="text-3xl font-bold text-gray-900 flex-shrink-0 group-hover:text-[#D97948] transition-colors duration-300">
                    03
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Gets sharper every week</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Learns from every call and message to close faster next time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Gradient background with Premium Movo Dashboard */}
          <div
            className="relative px-8 md:px-16 lg:px-20 py-20 flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage:
                "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kids%20Playing%20Sport%20Graphic%20Nov%2010%202025%20%282%29-V8JNogRABiiVjppDmMwDRCWb6aV7yD.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-blue-50/40 to-white/50" />

            <div className="relative z-10 w-full max-w-2xl">
              {/* Premium Dashboard Interface - Compact Frame */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 backdrop-blur-sm hover:shadow-3xl transition-shadow duration-500">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">M</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">Movo Intelligence</h3>
                        <p className="text-xs text-gray-500">Real-time academy insights</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-green-700">Live</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4">
                      <div className="text-xs font-medium text-purple-600 mb-1">This Week</div>
                      <div className="text-2xl font-bold text-purple-900">$7,840</div>
                      <div className="text-xs text-purple-600 mt-1">↑ 23% from last week</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4">
                      <div className="text-xs font-medium text-blue-600 mb-1">Conversations</div>
                      <div className="text-2xl font-bold text-blue-900">47</div>
                      <div className="text-xs text-blue-600 mt-1">18 trials booked</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4">
                      <div className="text-xs font-medium text-green-600 mb-1">Data Intelligence </div>
                      <div className="text-2xl font-bold text-green-900">142</div>
                      <div className="text-xs text-green-600 mt-1">new parent leads this month </div>
                    </div>
                  </div>

                  {/* Recent Activity Feed */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-gray-900">Recent Activity</h4>
                      <span className="text-xs text-gray-500">Last 30 minutes</span>
                    </div>
                    <div className="space-y-3">
                      {/* Activity Item 1 */}
                      <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-transparent rounded-lg border border-green-100">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Emma's family booked trial</p>
                            </div>
                            <span className="text-xs font-semibold text-green-600 flex-shrink-0">+$160</span>
                          </div>
                        </div>
                      </div>

                      {/* Activity Item 2 */}
                      <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">💬</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Mike's mom asked about pricing</p>
                            </div>
                            <span className="text-xs text-blue-600 flex-shrink-0">2m ago</span>
                          </div>
                        </div>
                      </div>

                      {/* Activity Item 3 */}
                      <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-transparent rounded-lg border border-purple-100">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">🔄</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Re-engaged Sarah Martinez</p>
                            </div>
                            <span className="text-xs text-purple-600 flex-shrink-0">5m ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connected Systems */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Connected Systems</h4>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-gray-700">iClassPro</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-gray-700">Stripe</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-gray-700">Google Calendar</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-gray-700">Mindbody</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Caption below dashboard */}
              <div className="text-center mt-8"></div>
            </div>
          </div>
        </div>
      </section>
      <section id="solution" className="py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 leading-tight">
            Sales, Solved.
              <br />
              <span className="text-gray-400 italic">Automatically</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Movo turns every missed call, old lead, and empty slot into new revenue - without you lifting a finger.
            </p>
          </div>

          {/* More Leads Group */}
          <div className="mb-24">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <span className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Drives New Revenue
              </span>
              <span className="text-gray-400 font-normal text-xl ml-5 md:ml-0">→ Capture every opportunity</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Never Miss a Call */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 group">
                <div className="mb-6">
                  <div className="w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 relative overflow-hidden">
                    {/* Live stat badge */}
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse w-[240px] justify-center">
                      <span>💰</span>
                      <span>+$2,300 booked this week</span>
                    </div>
                    <div className="flex items-center justify-center mb-4 mt-6">
                      <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="bg-gray-900 text-white text-center py-3 rounded-lg text-base font-medium">
                      Handled by Movo
                    </div>
                    <div className="mt-4 text-center text-sm text-gray-600">247 calls answered this month</div>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Never Miss a Call</h4>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Every parent gets answered instantly - even after hours. Movo never lets an opportunity go to
                  voicemail.
                </p>
                <p className="text-sm italic text-gray-500">"Peace of mind - no more lost signups" - Supreme Hoops</p>
              </div>

              {/* Re-Engage Old Leads */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 group">
                <div className="mb-6">
                  <div className="w-full bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 space-y-4 relative">
                    {/* Live stat badge */}
                    <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 w-[240px] justify-center">
                      <span>💬</span>
                      <span>47% conversion</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm mt-6">
                      <div className="text-xs text-gray-500 mb-2">Text from Movo:</div>
                      <div className="text-sm font-medium text-gray-900 mb-3">
                        "Hey, we have one last spot for this week — want it?"
                      </div>
                      <div className="flex items-center justify-center my-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mb-1">Parent replied:</div>
                      <div className="text-sm font-medium text-gray-900">"Yes! Book it please"</div>
                      <div className="text-xs text-green-700 font-semibold mt-2">✓ Reactivated Parent</div>
                    </div>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Re-Engage Old Leads</h4>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Movo follows up automatically with families who asked months ago - and gets them to finally sign up.
                </p>
                <p className="text-sm italic text-gray-500">"Wow, it even remembers the ones I forgot" - Haifa Swim </p>
              </div>
            </div>
          </div>

          {/* More Sales Group */}
          <div className="mb-24">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <span className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Closes Every Conversation
              </span>
              <span className="text-gray-400 font-normal text-xl ml-5 md:ml-0">→ Turn calls into enrollments</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Fill Every Program */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 group">
                <div className="mb-6">
                  <div className="w-full bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 relative">
                    {/* Live stat badge */}
                    <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 w-[240px] justify-center">
                      <span>📈</span>
                      <span>+85% fill rate</span>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-semibold text-gray-900">Tues 5 PM Swim</div>
                        <div className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded">FULL ✅</div>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">11/12 spots filled</div>
                      <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full shadow"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                      <div className="text-xs text-green-700 font-semibold bg-green-50 rounded px-2 py-1 text-center">
                        Booked ✓
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Fill Every Program</h4>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Movo knows which classes have openings and actively promotes them to interested parents - until
                  they're full.
                </p>
                <p className="text-sm italic text-gray-500">"It actually sells my classes for me" - MPAC Sports</p>
              </div>

              {/* Learn What Converts */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 group">
                <div className="mb-6">
                  <div className="w-full bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 relative">
                    {/* Live stat badge */}
                    <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 w-[240px] justify-center">
                      <span>🧠</span>
                      <span>+72% lift</span>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm mt-6">
                      <div className="text-xs font-semibold text-gray-500 mb-2">Top Converting Offer</div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">"Free Trial"</div>
                      <div className="text-sm text-green-700 font-medium">Converts 72% better</div>
                      <div className="text-xs text-gray-500 mt-3 italic">Discovers best offers automatically</div>
                    </div>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Learn What Converts</h4>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Movo analyzes every conversation and learns what words close more trials - constantly improving
                  performance.
                </p>
                <p className="text-sm italic text-gray-500">
                  "It gets better - I don't have to micromanage" - Haifa Swim
                </p>
              </div>
            </div>
          </div>

          {/* Less Work Group */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <span className="flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Handles Everything Else
              </span>
              <span className="text-gray-400 font-normal text-xl ml-5 md:ml-0">→ Runs on autopilot</span>
            </h3>
            {/* Centered the single card using mx-auto */}
            <div className="max-w-2xl mx-auto">
              {/* Everything, Automatically */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 group">
                <div className="mb-6">
                  <div className="w-full bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 relative">
                    {/* Live stat badge */}
                    <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      ⚙️ 10+ hours saved weekly
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center group-hover:scale-105 transition-transform">
                        <div className="text-2xl mb-1">💳</div>
                        <div className="text-xs font-semibold text-gray-700">Payments</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center group-hover:scale-105 transition-transform delay-75">
                        <div className="text-2xl mb-1">📅</div>
                        <div className="text-xs font-semibold text-gray-700">Scheduling</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center group-hover:scale-105 transition-transform delay-150">
                        <div className="text-2xl mb-1">📧</div>
                        <div className="text-xs font-semibold text-gray-700">Follow-ups</div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="bg-white/80 backdrop-blur-sm text-teal-800 text-xs font-bold px-4 py-2 rounded-full inline-block">
                        All synced automatically
                      </div>
                    </div>
                  </div>
                </div>
                {/* Centered the description text */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Everything, Automatically</h3>
                <p className="text-gray-600 leading-relaxed mb-3 text-center">
                  Movo syncs payments, follow-ups, and schedules - so your team can focus on coaching, not chasing
                  parents.
                </p>
                <p className="text-sm italic text-gray-500 text-center">"Freedom - I can finally breathe."</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <a
              href="https://calendly.com/ari-movoai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 bg-gray-900 hover:bg-gray-800 text-white text-lg font-semibold rounded-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
            >
              Book a demo
            </a>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-b from-blue-50 to-white fade-on-scroll py-[60px]"></section>
      <SuccessStoriesSection id="success" />
      <section ref={statsRef} className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left - Headline and subheadline with CTA */}
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 leading-tight mb-6">
                The Numbers <span className="text-gray-400 italic">Don't Lie.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-10">
                Every academy using Movo sees new bookings within days -<br />
                with no extra staff or marketing spend.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleHeroAudioPlay}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white text-lg font-medium rounded-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer min-h-[56px]"
                >
                  <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0">
                    {isHeroAudioPlaying ? (
                      <div className="flex items-center gap-1">
                        <div
                          className="w-1 bg-white rounded-full animate-pulse"
                          style={{ height: "16px", animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-1 bg-white rounded-full animate-pulse"
                          style={{ height: "24px", animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-1 bg-white rounded-full animate-pulse"
                          style={{ height: "14px", animationDelay: "300ms" }}
                        ></div>
                        <div
                          className="w-1 bg-white rounded-full animate-pulse"
                          style={{ height: "20px", animationDelay: "100ms" }}
                        ></div>
                      </div>
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </div>
                  <span className="whitespace-nowrap">Hear Movo in Action</span>
                </button>
                <a
                  href="https://calendly.com/ari-movoai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 text-lg font-medium rounded-sm border-2 border-gray-900 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer min-h-[56px]"
                >
                  Book a Demo
                </a>
              </div>
            </div>

            {/* Right - Horizontal stats with static numbers */}
            <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 justify-center">
              {/* Stat 1 - Response time */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-6xl md:text-7xl font-bold text-gray-900 mb-2">
                  <span>{"<"}5s</span>
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                  Average response time
                </div>
              </div>

              {/* Stat 2 - Conversions */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-6xl md:text-7xl font-bold text-gray-900 mb-2">
                  <span>+47%</span>
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                  More conversions
                </div>
              </div>

              {/* Stat 3 - Revenue */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-6xl md:text-7xl font-bold text-gray-900 mb-2">
                  <span>+$4.2K</span>
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                  New monthly revenue
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-32 bg-gray-100">
        <div className="max-w-4xl mx-auto px-8 md:px-16 text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 leading-tight mb-6">
            Parents are calling.
            <br />
            <span className="text-gray-400 italic">Never miss a lead again.</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
            Movo sells your programs while you coach - converting every conversation into a booked trial, a new
            enrolment, or a spot filled.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={() => setShowCallMe(true)}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white text-lg font-medium rounded-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer min-h-[56px]"
            >
              <Phone className="w-5 h-5" />
              Call Me
            </button>
            <a
              href="https://calendly.com/ari-movoai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 text-lg font-medium rounded-sm border-2 border-gray-900 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer min-h-[56px]"
            >
              Book a Demo
            </a>
          </div>

          <p className="text-sm text-gray-500">Most academies see results within the first 2 weeks.</p>
        </div>
      </section>
      <ProblemSection />
      <WhoItsFor />
      <HowItWorks />
      <UseCaseStory />
      <LiveActivity />
      <FinalCTA />
      {/* Footer */}
      <footer className="py-24 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-10">
          {/* Moved disclaimer to bottom, copyright and links first */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <p className="text-gray-600">© 2025 Movo AI, Inc. All rights reserved.</p>
            <div className="flex items-center gap-8">
              <a href="/portal/login" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Portal
              </a>
              <a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Terms
              </a>
              <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Privacy
              </a>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Movo AI automates communications and may use AI-generated voice or text responses. Conversations may be
              recorded or analyzed to improve service quality, consistent with our{" "}
              <a href="/privacy" className="text-gray-900 underline hover:text-gray-700 transition-colors">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
      {showCallMe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <button
              onClick={() => setShowCallMe(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors text-2xl leading-none"
            >
              ✕
            </button>

            <div className="flex flex-col items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Get a Call from Movo</h2>
              <p className="text-gray-600 text-center leading-relaxed">
                Fill your info and get a call from Movo. One call is all it takes to see why academies trust Movo.
              </p>
            </div>

            <form onSubmit={handleCallMeSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Smith"
                  value={callMeForm.name}
                  onChange={(e) => setCallMeForm({ ...callMeForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="jane@framer.com"
                  value={callMeForm.email}
                  onChange={(e) => setCallMeForm({ ...callMeForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="000-000-0000"
                  value={callMeForm.phone}
                  onChange={(e) => setCallMeForm({ ...callMeForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none"
                  required
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  id="newsletter"
                  type="checkbox"
                  checked={callMeForm.newsletter}
                  onChange={(e) => setCallMeForm({ ...callMeForm, newsletter: e.target.checked })}
                  className="mt-1 w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-2 focus:ring-teal-500/20"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                  I agree to get a call from Movo
                </label>
              </div>

              <div className="pt-2 pb-2">
                <p className="text-xs text-gray-500 leading-relaxed">
                  By submitting your phone number above, you consent to the{" "}
                  <a href="#" className="text-gray-700 underline hover:text-gray-900">
                    Mobile Terms
                  </a>{" "}
                  and to receive automated calls (including AI-generated calls) and texts from Movo AI at the number
                  provided. Message and data rates may apply. Frequency may vary. Reply STOP anytime to opt out of
                  texts. Consent is not a condition of purchase. See our{" "}
                  <a href="#" className="text-gray-700 underline hover:text-gray-900">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl cursor-pointer"
              >
                Call me
              </button>
            </form>
          </div>
        </div>
      )}
      {showHearMovo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative bg-white rounded-sm p-8 max-w-md w-full">
            <button
              onClick={() => setShowHearMovo(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Hear Movo Sell</h2>
            <p className="text-gray-600 mb-6">Listen to how Movo handles a real parent inquiry</p>
            <audio
              ref={audioRef}
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mono%20Audio%20File%20%281%29-Ky1VPeJmOkmuanheihF0JpGzdJSFY3.wav"
              className="hidden"
            />
            <button
              onClick={handlePlayAudio}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#D97948] hover:bg-[#C96838] text-white rounded-sm"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? "Pause" : "Play"} Audio
            </button>
            {audioProgress > 0 && (
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#D97948] h-2 rounded-full transition-all" style={{ width: `${audioProgress}%` }} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
