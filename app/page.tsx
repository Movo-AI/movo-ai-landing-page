"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Phone, Play, Pause } from 'lucide-react';
import posthog from "posthog-js";
import { Header } from "@/components/header";
import { ProblemSection } from "@/components/problem-section";
import { WhoItsFor } from "@/components/who-its-for";
import { HowItWorks } from "@/components/how-it-works";
import { UseCaseStory } from "@/components/use-case-story";
import { LiveActivity } from "@/components/live-activity";
import { FinalCTA } from "@/components/final-cta";
import { SuccessStoriesSection } from "@/components/success-stories-section";
import { containsUnsafeLanguage } from "@/lib/moderation";

export default function Home() {
  const [showCallMe, setShowCallMe] = useState(false);
  const [showHearMovo, setShowHearMovo] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHeroAudioPlaying, setIsHeroAudioPlaying] = useState(false);
  const [isLearnVideoPlaying, setIsLearnVideoPlaying] = useState(false);

  const [isCallConnecting, setIsCallConnecting] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  const trackClick = (
    elementType: string,
    elementText: string,
    section: string,
    metadata?: Record<string, any>
  ) => {
    posthog.capture("button_click", {
      element_type: elementType,
      element_text: elementText,
      section,
      page_url: typeof window !== "undefined" ? window.location.pathname : "",
      ...metadata,
    });
  };
  const learnVideoRef = useRef<HTMLAudioElement>(null);
  const heroAudioRef = useRef<HTMLAudioElement>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPhonePlaying, setIsPhonePlaying] = useState(false);
  const [phoneAudioProgress, setPhoneAudioProgress] = useState(0);
  const phoneAudioRef = useRef<HTMLAudioElement>(null);

  const [activePillar, setActivePillar] = useState<
    "multi-channel" | "payment" | "learning"
  >("multi-channel");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const previewQuestions = [
    '"Hi, do you have soccer for 10-year-olds?"',
    '"Can we schedule a trial for this Friday?"',
    '"What packages do you offer after the trial?"',
    '"Is there a discount for siblings?"',
    '"Do you have availability on weekends?"',
    '"Can we try a class before committing?"',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % previewQuestions.length);
    }, 3000); // Change question every 3 seconds
    return () => clearInterval(interval);
  }, [previewQuestions.length]);

  const [calculatedRevenue, setCalculatedRevenue] = useState(0); // Initialize with a default value or calculate later
  const [missedCalls, setMissedCalls] = useState(50);
  const [conversionRate, setConversionRate] = useState(40);
  const [avgEnrollment, setAvgEnrollment] = useState(600);

  const [liveActivities, setLiveActivities] = useState([
    {
      city: "Charlotte",
      action: "Trial booked",
      time: "2m ago",
      revenue: "$600",
    },
    {
      city: "Atlanta",
      action: "Enrollment confirmed",
      time: "5m ago",
      revenue: "$1,200",
    },
    {
      city: "Miami",
      action: "Payment received",
      time: "8m ago",
      revenue: "$450",
    },
  ]);

  const [socialProofMessages, setSocialProofMessages] = useState([
    "John from Chicago just booked $1,200 in enrollments",
    "Sarah from Miami confirmed 3 trial sessions",
    "Mike from Dallas recovered $850 from a missed call",
  ]);
  const [currentProofIndex, setCurrentProofIndex] = useState(0);

  const [callMeForm, setCallMeForm] = useState({
    name: "",
    email: "",
    phone: "",
    newsletter: true,
  });
  const [isSubmittingCall, setIsSubmittingCall] = useState(false);
  const [callError, setCallError] = useState<string | null>(null);
  const [callSuccess, setCallSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProofIndex((prev) => (prev + 1) % socialProofMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [socialProofMessages.length]);

  useEffect(() => {
    const activities = [
      { city: "Charlotte", action: "Trial booked", revenue: "$600" },
      { city: "Atlanta", action: "Enrollment confirmed", revenue: "$1,200" },
      { city: "Miami", action: "Payment received", revenue: "$450" },
      { city: "Phoenix", action: "Trial confirmed", revenue: "$550" },
      { city: "Boston", action: "Package purchased", revenue: "$2,400" },
      { city: "Seattle", action: "Trial booked", revenue: "$650" },
    ];

    const interval = setInterval(() => {
      const newActivity =
        activities[Math.floor(Math.random() * activities.length)];
      setLiveActivities((prev) => [
        { ...newActivity, time: "Just now" },
        ...prev.slice(0, 2),
      ]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showHearMovo && audioRef.current) {
      console.log("[v0] Hear Movo modal opened, attempting to play audio");
      // Small delay to ensure modal is visible
      setTimeout(() => {
        const playPromise = audioRef.current?.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("[v0] Audio playback started successfully");
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("[v0] Auto-play prevented by browser:", error);
              // Browser prevented autoplay, user needs to click play button
              setIsPlaying(false);
            });
        }
      }, 500);
    } else if (!showHearMovo && audioRef.current) {
      console.log("[v0] Modal closed, stopping audio");
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setAudioProgress(0);
    }
  }, [showHearMovo]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px",
    };

    const animateOnScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll, observerOptions);
    const elements = document.querySelectorAll(".fade-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      setAudioProgress(progress);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  const [counts, setCounts] = useState({
    response: 0,
    conversion: 0,
    revenue: 0,
  });
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const handleHeroAudioPlay = () => {
    if (heroAudioRef.current) {
      if (isHeroAudioPlaying) {
        heroAudioRef.current.pause();
        setIsHeroAudioPlaying(false);
      } else {
        const playPromise = heroAudioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsHeroAudioPlaying(true);
            })
            .catch((error) => {
              console.error("Error playing audio:", error);
              setIsHeroAudioPlaying(false);
            });
        }
      }
    }
  };

  useEffect(() => {
    const audio = heroAudioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsHeroAudioPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const handleLearnVideoPlay = () => {
    if (learnVideoRef.current) {
      if (isLearnVideoPlaying) {
        learnVideoRef.current.pause();
        setIsLearnVideoPlaying(false);
      } else {
        const playPromise = learnVideoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsLearnVideoPlaying(true);
            })
            .catch((error) => {
              console.error("Error playing video:", error);
              setIsLearnVideoPlaying(false);
            });
        }
      }
    }
  };

  useEffect(() => {
    const audio = learnVideoRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsLearnVideoPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Error playing audio:", error);
              setIsPlaying(false);
            });
        }
      }
    }
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle demo submission logic
  };

  const handleCallMeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallError(null);
    setCallSuccess(false);

    const submittedText = [callMeForm.name, callMeForm.email, callMeForm.phone]
      .filter(Boolean)
      .join(" ");
    if (containsUnsafeLanguage(submittedText)) {
      setCallError(
        "We couldn't process your request. Please remove unsafe language and try again."
      );
      posthog.capture("call_request_blocked", {
        reason: "unsafe_language",
        form: "call_me",
      });
      return;
    }

    setIsSubmittingCall(true);
    setIsCallConnecting(true);

    try {
      const response = await fetch("/api/create-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: callMeForm.name,
          email: callMeForm.email,
          phone: callMeForm.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate call");
      }

      setCallSuccess(true);
      setIsCallActive(true);
      setIsCallConnecting(false);

      setShowCallMe(false);

      const emailDomain = callMeForm.email.split("@")[1] || "unknown";
      let phoneCountryCode = "+1";
      const cleanedPhone = callMeForm.phone.replace(/[^\d+]/g, "");
      if (cleanedPhone.startsWith("+")) {
        const match = cleanedPhone.match(/^\+(\d{1,3})/);
        if (match) {
          phoneCountryCode = `+${match[1]}`;
        }
      } else if (cleanedPhone.startsWith("1") && cleanedPhone.length >= 11) {
        phoneCountryCode = "+1";
      }

      const firstName = callMeForm.name.trim().split(" ")[0] || "";

      posthog.capture("call_request_submitted", {
        call_id: data.callId,
        email_domain: emailDomain,
        phone_country_code: phoneCountryCode,
        first_name: firstName,
      });

      fetch("/api/notify-slack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          call_id: data.callId,
          name: callMeForm.name,
          email: callMeForm.email,
          phone: callMeForm.phone,
          email_domain: emailDomain,
          phone_country_code: phoneCountryCode,
          first_name: firstName,
        }),
      }).catch((error) => {
        console.error("Failed to send Slack notification:", error);
      });

      setTimeout(() => {
        setIsCallActive(false);
        setCallMeForm({ name: "", email: "", phone: "", newsletter: true });
        setCallSuccess(false);
      }, 30000); // 30 seconds
    } catch (error) {
      setCallError(
        error instanceof Error
          ? error.message
          : "Failed to initiate call. Please try again."
      );
      setIsCallConnecting(false);
      setIsCallActive(false);
    } finally {
      setIsSubmittingCall(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (phoneAudioRef.current && isPhonePlaying) {
        const progress =
          (phoneAudioRef.current.currentTime / phoneAudioRef.current.duration) *
          100;
        setPhoneAudioProgress(progress);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPhonePlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        // The error was here: `audio` was used instead of `audioRef.current`
        const audio = audioRef.current;
        if (!audio) return; // Added safety check
        const progress = (audio.currentTime / audio.duration) * 100;
        setAudioProgress(progress);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const audio = phoneAudioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      setPhoneAudioProgress(progress);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  useEffect(() => {
    const audio = phoneAudioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPhonePlaying(false);
      setPhoneAudioProgress(0);
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const handlePhonePlayAudio = () => {
    if (phoneAudioRef.current) {
      if (isPhonePlaying) {
        phoneAudioRef.current.pause();
        setIsPhonePlaying(false);
      } else {
        const playPromise = phoneAudioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPhonePlaying(true);
            })
            .catch((error) => {
              console.error("Error playing audio:", error);
              setIsPhonePlaying(false);
            });
        }
      }
    }
  };

  // Placeholder for calculatedRevenue, assuming it's derived from other states
  // You might want to move the calculation to a place where all dependencies are guaranteed to be set
  useEffect(() => {
    // Dummy calculation for now, replace with actual logic if needed
    setCalculatedRevenue(
      (missedCalls * (conversionRate / 100) * avgEnrollment) / 1000
    );
  }, [missedCalls, conversionRate, avgEnrollment]);

  const [weeklyRevenue, setWeeklyRevenue] = useState(0);
  const [isRevenueVisible, setIsRevenueVisible] = useState(false);
  const revenueTargetRef = useRef<HTMLDivElement>(null);

  // Animate revenue counter when section is visible
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px",
    };

    const animateRevenue = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isRevenueVisible) {
          setIsRevenueVisible(true);
          let currentValue = 0;
          const target = 2840;
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps

          const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= target) {
              setWeeklyRevenue(target);
              clearInterval(timer);
            } else {
              setWeeklyRevenue(Math.floor(currentValue));
            }
          }, 16);
        }
      });
    };

    const observer = new IntersectionObserver(animateRevenue, observerOptions);
    if (revenueTargetRef.current) {
      observer.observe(revenueTargetRef.current);
    }

    return () => observer.disconnect();
  }, [isRevenueVisible]);

  const [dashboardStats, setDashboardStats] = useState({
    revenue: 0,
    calls: 0,
    messages: 0,
    emails: 0,
  });
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1, // Trigger when 10% visible
      rootMargin: "0px",
    };

    const animateDashboard = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        console.log(
          "[v0] Dashboard intersection:",
          entry.isIntersecting,
          "Already visible:",
          isDashboardVisible
        );

        if (entry.isIntersecting && !isDashboardVisible) {
          console.log("[v0] Starting dashboard animation");
          setIsDashboardVisible(true);

          // Animate revenue from 0 to 6300
          let revenueVal = 0;
          const revenueTimer = setInterval(() => {
            revenueVal += 126; // Will reach 6300 in ~50 frames (1 second)
            if (revenueVal >= 6300) {
              setDashboardStats((prev) => ({ ...prev, revenue: 6300 }));
              clearInterval(revenueTimer);
              console.log("[v0] Revenue animation complete: 6300");
            } else {
              setDashboardStats((prev) => ({
                ...prev,
                revenue: Math.floor(revenueVal),
              }));
            }
          }, 20);

          // Animate calls from 0 to 900
          let callsVal = 0;
          const callsTimer = setInterval(() => {
            callsVal += 18; // Will reach 900 in ~50 frames (1 second)
            if (callsVal >= 900) {
              setDashboardStats((prev) => ({ ...prev, calls: 900 }));
              clearInterval(callsTimer);
              console.log("[v0] Calls animation complete: 900");
            } else {
              setDashboardStats((prev) => ({
                ...prev,
                calls: Math.floor(callsVal),
              }));
            }
          }, 20);

          // Animate messages from 0 to 650
          let messagesVal = 0;
          const messagesTimer = setInterval(() => {
            messagesVal += 13; // Will reach 650 in ~50 frames (1 second)
            if (messagesVal >= 650) {
              setDashboardStats((prev) => ({ ...prev, messages: 650 }));
              clearInterval(messagesTimer);
              console.log("[v0] Messages animation complete: 650");
            } else {
              setDashboardStats((prev) => ({
                ...prev,
                messages: Math.floor(messagesVal),
              }));
            }
          }, 20);

          // Animate emails from 0 to 2500
          let emailsVal = 0;
          const emailsTimer = setInterval(() => {
            emailsVal += 50; // Will reach 2500 in ~50 frames (1 second)
            if (emailsVal >= 2500) {
              setDashboardStats((prev) => ({ ...prev, emails: 2500 }));
              clearInterval(emailsTimer);
              console.log("[v0] Emails animation complete: 2500");
            } else {
              setDashboardStats((prev) => ({
                ...prev,
                emails: Math.floor(emailsVal),
              }));
            }
          }, 20);
        }
      });
    };

    const observer = new IntersectionObserver(
      animateDashboard,
      observerOptions
    );
    if (dashboardRef.current) {
      console.log("[v0] Observer attached to dashboard");
      observer.observe(dashboardRef.current);
    }

    return () => observer.disconnect();
  }, [isDashboardVisible]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px",
    };

    const animateStats = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsVisible) {
          setStatsVisible(true);

          // Animate response time (target: 5)
          let responseVal = 0;
          const responseTimer = setInterval(() => {
            responseVal += 0.1;
            if (responseVal >= 5) {
              setCounts((prev) => ({ ...prev, response: 5 }));
              clearInterval(responseTimer);
            } else {
              setCounts((prev) => ({
                ...prev,
                response: Math.round(responseVal * 10) / 10,
              }));
            }
          }, 30);

          // Animate conversion (target: 47)
          let conversionVal = 0;
          const conversionTimer = setInterval(() => {
            conversionVal += 0.8;
            if (conversionVal >= 47) {
              setCounts((prev) => ({ ...prev, conversion: 47 }));
              clearInterval(conversionTimer);
            } else {
              setCounts((prev) => ({
                ...prev,
                conversion: Math.floor(conversionVal),
              }));
            }
          }, 30);

          // Animate revenue (target: 4200)
          let revenueVal = 0;
          const revenueTimer = setInterval(() => {
            revenueVal += 70;
            if (revenueVal >= 4200) {
              setCounts((prev) => ({ ...prev, revenue: 4200 }));
              clearInterval(revenueTimer);
            } else {
              setCounts((prev) => ({
                ...prev,
                revenue: Math.floor(revenueVal),
              }));
            }
          }, 30);
        }
      });
    };

    const observer = new IntersectionObserver(animateStats, observerOptions);
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsVisible]);

  return (
    <>
      <Header />
      <section className="relative min-h-screen">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(/images/kids-20playing-20sport-20graphic-20nov-209-202025-20-283-29.png)",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-8 lg:px-16 py-32 md:py-20 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight text-white mb-6 max-w-5xl">
            AI That Sells for Your
            <br />
            Sports Academy
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-3xl leading-relaxed px-4">
            Movo calls every parent, books enrollments, and grows your revenue -
            automatically.
          </p>

          <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button
              onClick={() => {
                trackClick("button", "Speak to Movo", "hero", {
                  action: "open_call_modal",
                  cta_type: "primary",
                });
                setShowCallMe(true);
              }}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#D97948] hover:bg-[#C96838] text-white text-sm sm:text-base font-medium rounded-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 w-full sm:w-auto cursor-pointer min-h-[48px]"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              Speak to Movo
            </button>
            <a
              href="https://calendly.com/ari-movoai/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackClick("link", "Book a demo", "hero", {
                  url: "https://calendly.com/ari-movoai/30min",
                  cta_type: "secondary",
                })
              }
              className="group flex items-center justify-center gap-3 px-4 py-2 md:px-6 md:py-3 bg-white/10 hover:bg-white/20 text-white text-sm md:text-base font-medium rounded-sm transition-all duration-300 border border-white/20 backdrop-blur-sm hover:shadow-2xl hover:scale-105 w-full sm:w-auto cursor-pointer min-h-[40px] md:min-h-[48px]"
            >
              <span className="font-medium whitespace-nowrap text-sm md:text-base">
                Book a demo
              </span>
            </a>

            <audio
              ref={heroAudioRef}
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Video_1-D2xUSPWZjqPYNOsmcPCtTFZXhoqY0u.mp3"
              className="hidden"
            />
          </div>

          <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 px-6 sm:px-8">
            <p className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest font-medium">
              Trusted by leading sports academies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
              {[
                "Supreme Hoops",
                "MPAC Sports",
                "Haifa Swim",
                "Pro Soccer Academy",
                "Champion Tennis",
              ].map((name, i) => (
                <span
                  key={i}
                  className="text-white/70 font-semibold text-sm sm:text-base md:text-lg lg:text-xl hover:text-white transition-all duration-300 hover:scale-110"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <button
        onClick={() => {
          if (isCallActive) {
            setIsCallActive(false);
            setShowCallMe(false);
            setCallMeForm({ name: "", email: "", phone: "", newsletter: true });
            trackClick("button", "End Call", "floating_cta", {
              button_type: "floating",
              action: "end_call",
            });
          } else {
            trackClick("button", "Talk to Movo", "floating_cta", {
              button_type: "floating",
              action: "open_call_modal",
            });
            setShowCallMe(true);
          }
        }}
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer ${
          isCallActive
            ? "bg-white text-gray-900 border-4 border-blue-500"
            : isCallConnecting
            ? "bg-white text-gray-900 border-4 border-blue-500 animate-pulse"
            : "bg-white text-gray-900 hover:shadow-3xl"
        }`}
      >
        <div
          className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isCallActive
              ? "bg-gradient-to-br from-red-400 to-red-600"
              : "bg-gradient-to-br from-green-400 to-green-600"
          }`}
        >
          <Phone
            className={`w-4 h-4 sm:w-5 sm:h-5 text-white ${
              isCallActive ? "animate-pulse" : ""
            }`}
          />
          {!isCallActive && !isCallConnecting && (
            <div className="absolute inset-0 rounded-lg bg-green-500 animate-ping opacity-40"></div>
          )}
          {isCallConnecting && (
            <div className="absolute inset-0 rounded-lg border-2 border-blue-500 animate-spin"></div>
          )}
        </div>
        <span className="text-sm sm:text-base font-semibold">
          {isCallActive
            ? "End call"
            : isCallConnecting
            ? "Connecting..."
            : "Talk to Movo"}
        </span>
      </button>
      <section id="product" className="min-h-screen flex items-center">
        <div className="w-full grid lg:grid-cols-2">
          {/* Left side - White background with content */}
          <div className="bg-white px-8 md:px-12 lg:px-16 py-12 flex items-center">
            <div className="max-w-xl">
              <div className="text-xs font-semibold tracking-widest text-gray-500 mb-4">
                BUILT FOR SPORTS ACADEMIES
              </div>

              <div
                ref={revenueTargetRef}
                className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full shadow-sm"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-semibold text-green-700">
                  +30% higher conversion per lead
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-gray-900 mb-4">
                AI that learns your academy
                <span className="block text-gray-400 italic">inside out.</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                Trains on your programs, pricing, and families - then sells like
                your best rep.
              </p>

              
              
              <audio
                ref={learnVideoRef}
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nadav%20Vieder%20Video%20Nov%2011%202025-j07YSAJHlsf8TfJYGARpfwPwkjIzUn.mp3"
                className="hidden"
              />

              {/* Numbered features */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex gap-4 group cursor-pointer">
                  <div className="text-2xl font-bold text-gray-900 flex-shrink-0">
                    01
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Understands your playbook
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Knows your age groups, pricing, and peak hours so every
                      parent gets the right answer instantly.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group cursor-pointer">
                  <div className="text-2xl font-bold text-gray-900 flex-shrink-0">
                    02
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Connects your systems
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Syncs with your tools like iClassPro, Stripe, and your
                      calendar to manage bookings and payments automatically.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group cursor-pointer">
                  <div className="text-2xl font-bold text-gray-900 flex-shrink-0">
                    03
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Gets smarter every week
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Learns from every call and message to close faster next
                      time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Gradient background with Premium Movo Dashboard */}
          <div
            className="relative px-4 sm:px-6 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10 flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage:
                "url(/images/kids-20playing-20sport-20graphic-20nov-2010-202025-20-282-29.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-blue-50/40 to-white/50" />

            <div ref={dashboardRef} className="relative z-10 w-full max-w-4xl">
              <div className="bg-white rounded-lg sm:rounded-xl shadow-xl overflow-hidden border border-gray-200">
                {/* Header */}
                <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900">
                          Movo Intelligence
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:py-1 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-[10px] sm:text-xs font-semibold text-green-700">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content - Heavily reduced padding */}
                <div className="p-2.5 sm:p-3 md:p-4 space-y-2.5 sm:space-y-3 md:space-y-4">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    <div className="text-left">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-0.5">
                        ${dashboardStats.revenue.toLocaleString()}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wide font-medium mb-0.5">
                        REVENUE THIS WEEK
                      </div>
                      <div className="flex items-center gap-0.5 text-[10px] sm:text-xs text-green-600 font-semibold">
                        <span>↑</span>
                        <span>20% from last week</span>
                      </div>
                    </div>
                    <div className="text-left border-l border-gray-200 pl-2 sm:pl-3 md:pl-4">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-0.5">
                        {dashboardStats.calls}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wide font-medium">
                        CALLS
                      </div>
                    </div>
                    <div className="text-left border-l border-gray-200 pl-2 sm:pl-3 md:pl-4">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-0.5">
                        {dashboardStats.messages}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wide font-medium">
                        MESSAGES
                      </div>
                    </div>
                    <div className="text-left border-l border-gray-200 pl-2 sm:pl-3 md:pl-4">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-0.5">
                        {dashboardStats.emails.toLocaleString()}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wide font-medium">
                        EMAILS
                      </div>
                    </div>
                  </div>

                  {/* Two-column layout: Insights & Conversations */}
                  <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                    {/* Left: What Movo Learned */}
                    <div className="md:border-r border-gray-200 md:pr-3 sm:md:pr-4 mt-2 md:mt-0">
                      <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
                        <span className="text-sm sm:text-base">💡</span>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                          What Movo Learned This Week
                        </h4>
                      </div>
                      <ul className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-xs text-gray-700">
                        <li className="flex items-start gap-1 sm:gap-1.5">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>
                            Parents ask most about 'Saturday programs'
                          </span>
                        </li>
                        <li className="flex items-start gap-1 sm:gap-1.5">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Peak call times: 4–8pm</span>
                        </li>
                        <li className="flex items-start gap-1 sm:gap-1.5">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>
                            Best conversion script: "Would you like to book a
                            free trial?"
                          </span>
                        </li>
                        <li className="flex items-start gap-1 sm:gap-1.5">
                          <span className="text-blue-600 flex-shrink-0">•</span>
                          <span className="font-medium">
                            Most booked program: "Youth Development League (Ages
                            8–10)"
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* Right: Recent Conversations - Hidden on mobile */}
                    <div className="hidden md:block md:pl-3 sm:md:pl-4">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2">
                        Recent Conversations
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-2.5 space-y-1.5 sm:space-2">
                        <div className="text-[10px] sm:text-xs text-gray-700">
                          <p>Hi Jessica! Yes, we have two options:</p>
                        </div>
                        <div className="bg-blue-500 text-white rounded-lg px-2 sm:px-2.5 py-1.5 sm:py-2 text-[10px] sm:text-xs">
                          Saturday 10am or Wednesday 4pm.
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-700">
                          <p>Saturday works!</p>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white border border-green-200 rounded-lg px-2 py-1.5 mt-1.5 sm:mt-2">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[9px] sm:text-[10px] font-bold">
                              ✓
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] sm:text-xs font-semibold text-gray-900">
                              Trial booked
                            </p>
                            <p className="text-[9px] sm:text-xs text-gray-600">
                              $150 revenue
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connected Systems */}
                  <div className="border-t border-gray-200 pt-2 sm:pt-2.5 md:pt-3">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2">
                      Connected Systems
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-white rounded-lg border border-gray-200">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-700">
                          IClassPro
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-white rounded-lg border border-gray-200">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-700">
                          Stripe
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-white rounded-lg border border-gray-200">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-700">
                          Google Calendar
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="solution"
        className="py-32 bg-gradient-to-b from-blue-50 to-white"
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 leading-tight">
              Sales, Solved.
              <br />
              <span className="text-gray-400 italic">Automatically</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              Movo turns every missed call, old lead, and empty slot into new
              revenue - without you lifting a finger.
            </p>
          </div>

          {/* More Leads Group */}
          <div className="mb-24">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <span className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Drives New Revenue
              </span>
              <span className="text-gray-400 font-normal text-xl ml-5 md:ml-0"></span>
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Never Miss a Call */}
              <div className="bg-white rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 group">
                <div className="mb-6">
                  <div className="w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 md:p-6 relative overflow-hidden">
                    {/* Live stat badge */}
                    
                    <div className="flex items-center justify-center mb-3 md:mb-4 mt-8 md:mt-6">
                      <div className="w-16 md:w-20 h-16 md:h-20 bg-gray-900 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-8 md:w-10 h-8 md:h-10 text-white" />
                      </div>
                    </div>
                    <div className="bg-gray-900 text-white text-center py-2.5 md:py-3 rounded-lg text-sm md:text-base font-medium">
                      Handled by Movo
                    </div>
                    <div className="mt-3 md:mt-4 text-center text-xs md:text-sm text-gray-600">
                      247 calls answered this month
                    </div>
                  </div>
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                  Never Miss a Call
                </h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-2 md:mb-3">
                  Every parent gets answered instantly - even after hours. Movo
                  never lets an opportunity go to voicemail.
                </p>
                <p className="text-xs md:text-sm italic text-gray-500">
                  "Peace of mind - no more lost signups" - Supreme Hoops
                </p>
              </div>

              {/* Re-Engage Old Leads */}
              <div className="bg-white rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 group">
                <div className="mb-6">
                  <div className="w-full bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 md:p-6 space-y-4 relative">
                    {/* Live stat badge */}
                    
                    <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm mt-8 md:mt-6">
                      <div className="text-[10px] md:text-xs text-gray-500 mb-1.5 md:mb-2">
                        Text from Movo:
                      </div>
                      <div className="text-xs md:text-sm font-medium text-gray-900 mb-2 md:mb-3">
                        "Hey, we have one last spot for this week — want it?"
                      </div>
                      <div className="flex items-center justify-center my-2 md:my-3">
                        <div className="w-7 md:w-8 bg-green-500 rounded-full flex items-center justify-center shadow">
                          <span className="text-white text-xs md:text-sm">
                            ✓
                          </span>
                        </div>
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500 mb-1">
                        Parent replied:
                      </div>
                      <div className="text-xs md:text-sm font-medium text-gray-900">
                        "Yes! Book it please"
                      </div>
                      <div className="text-[10px] md:text-xs text-green-700 font-semibold mt-1.5 md:mt-2">
                        ✓ Reactivated Parent
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                  Re-Engage Old Leads
                </h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-2 md:mb-3">
                  Movo follows up automatically with families who asked months
                  ago - and gets them to finally sign up.
                </p>
                <p className="text-xs md:text-sm italic text-gray-500">
                  "Wow, it even remembers the ones I forgot" - Haifa Swim{" "}
                </p>
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
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Fill Every Program */}
              <div className="bg-white rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 group">
                <div className="mb-6">
                  <div className="w-full bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 md:p-6 relative">
                    {/* Live stat badge */}
                    
                    <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm mt-8 md:mt-6">
                      <div className="flex items-center justify-between mb-2 md:mb-3">
                        <div className="text-sm md:text-base font-semibold text-gray-900">
                          Tues 5 PM Swim
                        </div>
                        <div className="text-[10px] md:text-xs font-bold text-green-700 bg-green-50 px-1.5 md:px-2 py-0.5 md:py-1 rounded whitespace-nowrap">
                          FULL ✅
                        </div>
                      </div>
                      <div className="text-[10px] md:text-xs font-bold text-green-700 bg-green-50 px-1.5 md:px-2 py-0.5 md:py-1 rounded whitespace-nowrap">
                        FULL ✅
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-600 mb-1.5 md:mb-2">
                        11/12 spots filled
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 md:h-3 mb-1.5 md:mb-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 md:h-3 rounded-full shadow"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                      <div className="text-[10px] md:text-xs text-green-700 font-semibold bg-green-50 rounded px-2 py-1 text-center">
                        Booked ✓
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                  Fill Every Program
                </h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-2 md:mb-3">
                  Movo knows which classes have openings and actively promotes
                  them to interested parents - until they're full.
                </p>
                <p className="text-xs md:text-sm italic text-gray-500">
                  "It actually sells my classes for me" - MPAC Sports
                </p>
              </div>

              {/* Learn What Converts */}
              <div className="bg-white rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 group">
                <div className="mb-6">
                  <div className="w-full bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 md:p-6 relative">
                    {/* Live stat badge */}
                    
                    <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm mt-8 md:mt-6">
                      <div className="text-[10px] md:text-xs font-semibold text-gray-500 mb-1.5 md:mb-2">
                        Top Converting Offer
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                        "Free Trial"
                      </div>
                      <div className="text-xs md:text-sm text-green-700 font-medium">
                        Converts 72% better
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500 mt-2 md:mt-3 italic">
                        Discovers best offers automatically
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                  Learn What Converts
                </h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-2 md:mb-3">
                  Movo analyzes every conversation and learns what words close
                  more trials - constantly improving performance.
                </p>
                <p className="text-xs md:text-sm italic text-gray-500">
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
            </h3>
            {/* Centered the single card using mx-auto */}
            <div className="max-w-2xl mx-auto">
              {/* Everything, Automatically */}
              <div className="bg-white rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 group">
                <div className="mb-6">
                  <div className="w-full bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 md:p-6 relative">
                    {/* Live stat badge */}
                    
                    <div className="grid grid-cols-3 gap-2 md:gap-3 mt-8 md:mt-6">
                      <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm text-center group-hover:scale-105 transition-transform">
                        <div className="text-xl md:text-2xl mb-0.5 md:mb-1">
                          💳
                        </div>
                        <div className="text-[10px] md:text-xs font-semibold text-gray-700">
                          Payments
                        </div>
                      </div>
                      <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm text-center group-hover:scale-105 transition-transform delay-75">
                        <div className="text-xl md:text-2xl mb-0.5 md:mb-1">
                          📅
                        </div>
                        <div className="text-[10px] md:text-xs font-semibold text-gray-700">
                          Scheduling
                        </div>
                      </div>
                      <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm text-center group-hover:scale-105 transition-transform delay-150">
                        <div className="text-xl md:text-2xl mb-0.5 md:mb-1">
                          📧
                        </div>
                        <div className="text-[10px] md:text-xs font-semibold text-gray-700">
                          Follow-ups
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-4 text-center">
                      <div className="bg-white/80 backdrop-blur-sm text-teal-800 text-[10px] md:text-xs font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full inline-block">
                        All synced automatically
                      </div>
                    </div>
                  </div>
                </div>
                {/* Centered the description text */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 text-center">
                  Everything, Automatically
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-2 md:mb-3 text-center">
                  Movo syncs payments, follow-ups, and schedules - so your team
                  can focus on coaching, not chasing parents.
                </p>
                <p className="text-xs md:text-sm italic text-gray-500 text-center">
                  "Freedom - I can finally breathe."
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <a
              href="https://calendly.com/ari-movoai/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackClick("link", "Book a demo", "solution", {
                  url: "https://calendly.com/ari-movoai/30min",
                  cta_type: "primary",
                  location: "solution_section",
                })
              }
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
                The Numbers{" "}
                <span className="text-gray-400 italic">Don't Lie.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-10">
                Every academy using Movo sees new bookings within days -<br />
                with no extra staff or marketing spend.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* </CHANGE> */}
                <a
                  href="https://calendly.com/ari-movoai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackClick("link", "Book a Demo", "stats", {
                      url: "https://calendly.com/ari-movoai/30min",
                      cta_type: "secondary",
                    })
                  }
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 text-lg font-medium rounded-sm border-2 border-gray-900 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer min-h-[56px]"
                >
                  Book a Demo
                </a>
              </div>
            </div>

            {/* Right - Horizontal stats with static numbers */}
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-12 md:gap-16 justify-center">
              {/* Stat 1 - Response time */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-2">
                  <span>&lt;5s</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide px-4">
                  Average response time
                </div>
              </div>

              {/* Stat 2 - Conversions */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-2">
                  <span>+47%</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide px-4">
                  More conversions
                </div>
              </div>

              {/* Stat 3 - Revenue */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-2">
                  <span>+$7,800</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide px-4">
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
            <span className="text-gray-400 italic">
              Never miss a lead again.
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
            Movo sells your programs while you coach - converting every
            conversation into a booked trial, a new enrolment, or a spot filled.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={() => {
                trackClick("button", "Call Me", "final_cta", {
                  action: "open_call_modal",
                  cta_type: "primary",
                });
                setShowCallMe(true);
              }}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white text-lg font-medium rounded-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer min-h-[56px]"
            >
              <Phone className="w-5 h-5" />
              Call Me
            </button>
            <a
              href="https://calendly.com/ari-movoai/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackClick("link", "Book a Demo", "final_cta", {
                  url: "https://calendly.com/ari-movoai/30min",
                  cta_type: "secondary",
                })
              }
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 text-lg font-medium rounded-sm border-2 border-gray-900 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer min-h-[56px]"
            >
              Book a Demo
            </a>
          </div>

          <p className="text-sm text-gray-500">
            Most academies see results within the first 2 weeks.
          </p>
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
          <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-gray-600">
                © 2025 Movo AI, Inc. All rights reserved.
              </p>
            </div>

            {/* Center - Social & Contact (remains centered) */}
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/movo.ai/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackClick("link", "Instagram", "footer", {
                    url: "https://www.instagram.com/movo.ai/",
                    link_type: "social",
                  })
                }
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="mailto:contact@movoai.co"
                onClick={() =>
                  trackClick("link", "Email", "footer", {
                    url: "mailto:contact@movoai.co",
                    link_type: "contact",
                  })
                }
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                contact@movoai.co
              </a>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="/terms"
                onClick={() =>
                  trackClick("link", "Terms", "footer", {
                    url: "/terms",
                    link_type: "legal",
                  })
                }
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Terms
              </a>
              <a
                href="/privacy"
                onClick={() =>
                  trackClick("link", "Privacy", "footer", {
                    url: "/privacy",
                    link_type: "legal",
                  })
                }
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Privacy
              </a>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl mx-auto">
              By submitting your phone number above, you consent to the Mobile Terms and to receive automated calls (including AI-generated calls) and texts from Movo AI at the number provided. Message and data rates may apply. Frequency may vary. Reply STOP anytime to opt out of texts. Consent is not a condition of purchase. 
              {" "}
              <a
                href="/privacy"
                onClick={() =>
                  trackClick("link", "Privacy Policy", "footer", {
                    url: "/privacy",
                    link_type: "legal",
                    context: "disclaimer",
                  })
                }
                className="text-gray-900 underline hover:text-gray-700 transition-colors"
              >
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
              onClick={() => {
                trackClick("button", "Close Call Modal", "call_modal", {
                  action: "close_modal",
                  modal_type: "call_request",
                });
                setShowCallMe(false);
              }}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors text-2xl leading-none"
            >
              ✕
            </button>

            <div className="flex flex-col items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Get a Call from Movo
              </h2>
              <p className="text-gray-600 text-center leading-relaxed">
                Fill in your info - Movo will call you instantly. See how it
                sells.
              </p>
            </div>

            <form onSubmit={handleCallMeSubmit} className="space-y-4">
              {callError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {callError}
                </div>
              )}

              {callSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  ✅ Call initiated! Movo will call you shortly.
                </div>
              )}

              {isSubmittingCall && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
                  ⏳ Initiating call...
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Smith"
                  value={callMeForm.name}
                  onChange={(e) =>
                    setCallMeForm({ ...callMeForm, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={isSubmittingCall}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="jane@framer.com"
                  value={callMeForm.email}
                  onChange={(e) =>
                    setCallMeForm({ ...callMeForm, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={isSubmittingCall}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="000-000-0000"
                  value={callMeForm.phone}
                  onChange={(e) =>
                    setCallMeForm({ ...callMeForm, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={isSubmittingCall}
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  id="newsletter"
                  type="checkbox"
                  checked={callMeForm.newsletter}
                  onChange={(e) =>
                    setCallMeForm({
                      ...callMeForm,
                      newsletter: e.target.checked,
                    })
                  }
                  className="mt-1 w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-2 focus:ring-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmittingCall}
                />
                <label
                  htmlFor="newsletter"
                  className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                >
                  I agree to get a call from Movo
                </label>
              </div>

              <div className="pt-2 pb-2">
                <p className="text-xs text-gray-500 leading-relaxed font-thin">
                  By submitting your phone number above, you consent to the{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      trackClick("link", "Mobile Terms", "call_modal", {
                        link_type: "legal",
                        context: "form_disclaimer",
                      });
                    }}
                    className="text-gray-700 underline hover:text-gray-900"
                  >
                    Mobile Terms
                  </a>{" "}
                  and to receive automated calls (including AI-generated calls)
                  and texts from Movo AI at the number provided. Message and
                  data rates may apply. Frequency may vary. Reply STOP anytime
                  to opt out of texts. Consent is not a condition of purchase.
                  See our{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      trackClick("link", "Privacy Policy", "call_modal", {
                        link_type: "legal",
                        context: "form_disclaimer",
                      });
                    }}
                    className="text-gray-700 underline hover:text-gray-900"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmittingCall}
                className="w-full px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmittingCall ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Initiating call...
                  </>
                ) : (
                  "Call me"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      {showHearMovo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative bg-white rounded-sm p-8 max-w-md w-full">
            <button
              onClick={() => {
                trackClick("button", "Close Audio Modal", "audio_modal", {
                  action: "close_modal",
                  modal_type: "audio_demo",
                });
                setShowHearMovo(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Hear Movo Sell</h2>
            <p className="text-gray-600 mb-6">
              Listen to how Movo handles a real parent inquiry
            </p>
            <audio
              ref={audioRef}
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mono%20Audio%20File%20%281%29-Ky1VPeJmOkmuanheihF0JpGzdJSFY3.wav"
              className="hidden"
            />
            <button
              onClick={() => {
                trackClick(
                  "button",
                  `${isPlaying ? "Pause" : "Play"} Audio`,
                  "audio_modal",
                  {
                    action: isPlaying ? "pause" : "play",
                    media_type: "audio",
                  }
                );
                handlePlayAudio();
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#D97948] hover:bg-[#C96838] text-white rounded-sm"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              {isPlaying ? "Pause" : "Play"} Audio
            </button>
            {audioProgress > 0 && (
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#D97948] h-2 rounded-full transition-all"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
