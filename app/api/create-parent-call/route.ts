import { type NextRequest, NextResponse } from "next/server"
import { containsUnsafeLanguageInFields } from "@/lib/moderation"

type PastVisit = {
  course_name: string
  instructor_name: string
  date: string
}

const SAMPLE_VISITS: PastVisit[] = [
  { course_name: "hitting class", instructor_name: "Justin", date: "2025-12-01" },
  { course_name: "pitching class", instructor_name: "Joba", date: "2025-11-01" },
  { course_name: "defense clinic", instructor_name: "Sam", date: "2025-10-18" },
  { course_name: "strength session", instructor_name: "Lee", date: "2025-10-05" },
]

function normalizePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, "")

  if (cleaned.startsWith("+")) {
    return cleaned
  }

  if (cleaned.startsWith("1") && cleaned.length === 11) {
    return "+" + cleaned
  }

  return "+1" + cleaned
}

function pickRandomPastVisits(): PastVisit[] {
  const shuffled = [...SAMPLE_VISITS].sort(() => Math.random() - 0.5)
  const count = Math.max(1, Math.floor(Math.random() * SAMPLE_VISITS.length))
  return shuffled.slice(0, count)
}

function normalizeErrorMessage(errorText: string): string {
  try {
    const parsed = JSON.parse(errorText)

    if (parsed.message && Array.isArray(parsed.message) && parsed.message.length > 0) {
      const firstMessage = parsed.message.find((msg: unknown) => typeof msg === "string")
      if (typeof firstMessage === "string") {
        if (firstMessage.includes("customer.number") || firstMessage.includes("E.164")) {
          return "Please use a valid phone number with country code (e.g., +1 for US)."
        }
        return firstMessage.split(".")[0] + "."
      }
    }

    if (parsed.error && typeof parsed.error === "string") {
      return parsed.error
    }
  } catch {
    if (errorText.includes("phone") || errorText.includes("E.164")) {
      return "Please use a valid phone number with country code (e.g., +1 for US)."
    }
  }

  return "We couldn't start the call. Please double-check the details and try again."
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, hasVisitHistory } = body as {
      name?: string
      phone?: string
      hasVisitHistory?: boolean
    }

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 })
    }

    if (containsUnsafeLanguageInFields([name, phone])) {
      return NextResponse.json(
        { error: "We couldn't process your request. Please remove unsafe language and try again." },
        { status: 400 },
      )
    }

    const vapiApiKey = process.env.VAPI_API_KEY
    if (!vapiApiKey) {
      return NextResponse.json({ error: "Server configuration error: VAPI_API_KEY not set." }, { status: 500 })
    }

    const normalizedPhone = normalizePhoneNumber(phone)
    const firstName = name.trim().split(" ")[0] || name.trim()

    const variableValues: Record<string, unknown> = {
      academyId: "cminbby3e0000uyl9zy3mq4pv",
      timezone: "America/Chicago",
      first_name: firstName,
    }

    if (hasVisitHistory) {
      variableValues.past_visits = pickRandomPastVisits()
    }

    const payload = {
      assistantId: "f7a4d2d8-9425-423f-85d5-5633c2424c4f",
      customer: {
        number: normalizedPhone,
      },
      phoneNumberId: "0718e172-e9ac-4db0-9b59-7995a203c8e2",
      assistantOverrides: {
        variableValues,
      },
    }

    const response = await fetch("https://api.vapi.ai/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vapiApiKey}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: normalizeErrorMessage(errorText) }, { status: response.status })
    }

    const data = await response.json()

    return NextResponse.json({ success: true, callId: data.id ?? null }, { status: 200 })
  } catch (error) {
    console.error("[API] Error creating Vapi call:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again in a moment." },
      { status: 500 },
    )
  }
}

