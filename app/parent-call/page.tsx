"use client";

import React, { useState } from "react";
import { Phone, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ParentCallLandingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hasVisitHistory, setHasVisitHistory] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [callId, setCallId] = useState<string | null>(null);

  const isSubmitting = status === "loading";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    setCallId(null);

    try {
      const response = await fetch("/api/create-parent-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, hasVisitHistory }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to start the call.");
      }

      setCallId(data.callId ?? null);
      setStatus("success");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(217,121,72,0.14),_transparent_35%)]" />
      <div className="relative max-w-5xl mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <div className="mx-auto mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D97948]/15 text-[#D97948]">
            <Phone className="h-6 w-6" />
          </div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#D97948]">
            Parent Outbound Demo
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Trigger a live parent outbound call
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-300">
            Test the Movo parent experience. Enter a parent's name and phone
            number and choose whether this parent has prior visits. We will call
            using the configured assistant and seed the conversation with the
            details you provide.
          </p>
        </header>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl rounded-2xl border border-white/5 bg-white/5 p-8 shadow-xl backdrop-blur">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D97948]/15 text-[#D97948]">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-slate-300">
                  Lightweight form
                </p>
                <h2 className="text-xl font-semibold">Start a phone call</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-300" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#D97948] focus:bg-white/[0.08]"
                  placeholder="Casey Parent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-300" htmlFor="phone">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#D97948] focus:bg-white/[0.08]"
                  placeholder="+1 555 123 4567"
                  required
                />
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-[#D97948]/60">
                <input
                  type="checkbox"
                  checked={hasVisitHistory}
                  onChange={(e) => setHasVisitHistory(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border border-white/20 bg-slate-900 text-[#D97948] focus:ring-[#D97948]"
                />
                <span>
                  Simulate a parent{" "}
                  <span className="font-semibold">with past visits</span>{" "}
                  (we&apos;ll send randomized visit history into the assistant).
                </span>
              </label>

              <button
                type="submit"
                disabled={!name || !phone || isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D97948] px-5 py-3.5 text-base font-semibold text-white transition hover:bg-[#c0663a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Connecting…
                  </>
                ) : (
                  <>
                    <Phone className="h-5 w-5" />
                    Test a parent call
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="flex items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                  <div>
                    <p className="font-semibold">Call triggered via Movo.</p>
                    {/* <p className="text-emerald-200">
                      {callId
                        ? `Call ID: ${callId}`
                        : "The call is being placed now."}
                    </p> */}
                  </div>
                </div>
              )}

              {status === "error" && error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-red-300" />
                  <div>
                    <p className="font-semibold">
                      We couldn&apos;t start the call.
                    </p>
                    <p className="text-red-200">{error}</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
