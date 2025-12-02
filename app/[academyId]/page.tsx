"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Mic, MicOff, Phone, X, Loader2 } from "lucide-react";

export default function AcademyOnboardingPage() {
  const params = useParams();
  const academyId = params?.academyId as string;

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Vapi State
  const [isCallConnecting, setIsCallConnecting] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callError, setCallError] = useState<string | null>(null);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const vapiRef = useRef<any | null>(null);

  // Initialize Vapi
  useEffect(() => {
    let mounted = true;

    const initVapi = async () => {
      try {
        const { default: Vapi } = await import("@vapi-ai/web");
        if (!mounted) return;

        const vapi = new Vapi("42e246dc-74d0-4145-9c99-07c17575f930"); // Public Key
        vapiRef.current = vapi;

        vapi.on("call-start", () => {
          console.log("Call started");
          setIsCallConnecting(false);
          setIsCallActive(true);
        });

        vapi.on("call-end", () => {
          console.log("Call ended");
          setIsCallActive(false);
          setIsCallConnecting(false);
          setIsFormSubmitted(false); // Reset to form or end state? User didn't specify, assuming back to start or stay on end screen.
        });

        vapi.on("speech-start", () => {
          setIsAssistantSpeaking(true);
        });

        vapi.on("speech-end", () => {
          setIsAssistantSpeaking(false);
        });

        vapi.on("error", (error: any) => {
          console.error("Vapi error:", error);
          setCallError(error.message || "An error occurred with the call.");
          setIsCallConnecting(false);
          setIsCallActive(false);
        });

      } catch (err) {
        console.error("Failed to load Vapi SDK", err);
      }
    };

    initVapi();

    return () => {
      mounted = false;
      vapiRef.current?.stop();
    };
  }, []);

  const handleStartCall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) return;

    setIsFormSubmitted(true);
    setIsCallConnecting(true);
    setCallError(null);

    try {
      if (!vapiRef.current) {
        throw new Error("Voice SDK not initialized");
      }

      // Assistant ID from the main page
      const assistantId = "e6744599-3458-4b1c-b6af-699068b81832"; 
      
      // Split name to get first_name
      const firstName = name.trim().split(' ')[0];

      await vapiRef.current.start(assistantId, {
        variableValues: {
          name: name,
          first_name: firstName,
          role: role,
          academy_id: academyId,
        },
      });
    } catch (err: any) {
      console.error("Failed to start call:", err);
      setCallError(err.message || "Failed to connect call");
      setIsCallConnecting(false);
    }
  };

  const handleEndCall = () => {
    vapiRef.current?.stop();
    setIsCallActive(false);
    setIsCallConnecting(false);
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    vapiRef.current?.setMuted(newMuteState);
    setIsMuted(newMuteState);
  };

  // Render Call Interface
  if (isFormSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Ambient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-purple-900/20 animate-pulse" />
        
        <div className="relative z-10 flex flex-col items-center max-w-md w-full">
            {/* Connection State */}
            {isCallConnecting && (
                 <div className="text-center space-y-6">
                    <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-t-[#D97948] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                        <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-[#D97948]/50 border-b-transparent border-l-transparent animate-spin" />
                    </div>
                    <p className="text-white/80 text-lg font-medium animate-pulse">Connecting to Movo...</p>
                 </div>
            )}

            {/* Active Call State */}
            {isCallActive && (
                <div className="flex flex-col items-center w-full space-y-12">
                    {/* Voice Visualizer */}
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        {/* Pulse Rings */}
                        <div className={`absolute inset-0 bg-[#D97948]/20 rounded-full ${isAssistantSpeaking ? 'animate-ping' : ''}`} />
                        <div className={`absolute inset-4 bg-[#D97948]/30 rounded-full ${isAssistantSpeaking ? 'animate-pulse' : ''}`} />
                        
                        {/* Central Orb */}
                        <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-[#D97948] to-[#ff9f76] shadow-[0_0_40px_rgba(217,121,72,0.6)] flex items-center justify-center transition-all duration-300 ${isAssistantSpeaking ? 'scale-110' : 'scale-100'}`}>
                            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm" />
                        </div>
                    </div>

                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold text-white">Movo</h2>
                        <p className="text-white/60">{isAssistantSpeaking ? "Speaking..." : "Listening..."}</p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={toggleMute}
                            className={`p-4 rounded-full transition-all ${isMuted ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                        </button>
                        
                        <button 
                            onClick={handleEndCall}
                            className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all shadow-lg hover:shadow-red-500/40 transform hover:scale-105"
                        >
                            <Phone className="w-8 h-8 rotate-[135deg]" />
                        </button>
                    </div>
                </div>
            )}

            {callError && (
                <div className="text-center space-y-4">
                    <div className="text-red-400 mb-4">{callError}</div>
                    <button 
                        onClick={() => setIsFormSubmitted(false)}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
      </div>
    );
  }

  if (!academyId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center">
           <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
           <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  // Onboarding Form Interface
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#111827] p-8 text-center">
          <div className="w-12 h-12 bg-[#D97948] rounded-lg mx-auto mb-4 flex items-center justify-center">
             <Phone className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to Movo</h1>
          <p className="text-gray-400 text-sm">
            Academy Onboarding &bull; ID: {academyId.slice(0, 8)}...
          </p>
        </div>

        <div className="p-8">
            <form onSubmit={handleStartCall} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D97948] focus:border-transparent outline-none transition-all"
                        placeholder="e.g. John Doe"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium text-gray-700">Role Title</label>
                    <input
                        id="role"
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D97948] focus:border-transparent outline-none transition-all"
                        placeholder="e.g. Director of Coaching"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#D97948] hover:bg-[#c0663a] text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    Start Onboarding Call
                </button>
            </form>

            <p className="mt-6 text-center text-xs text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
      </div>
    </div>
  );
}

