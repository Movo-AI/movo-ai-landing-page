import { type NextRequest, NextResponse } from "next/server"
import { containsUnsafeLanguageInFields } from "@/lib/moderation"

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

function normalizeErrorMessage(errorText: string): string {
  try {
    const errorData = JSON.parse(errorText)

    if (errorData.message && Array.isArray(errorData.message)) {
      const messages = errorData.message

      for (const msg of messages) {
        if (typeof msg === "string") {
          if (msg.includes("customer.number") || msg.includes("phone number") || msg.includes("E.164")) {
            return "Please enter a valid phone number with country code (e.g., +1 for US numbers)."
          }

          if (msg.includes("unauthorized") || msg.includes("authentication") || msg.includes("token")) {
            return "There was an authentication error. Please try again later."
          }

          if (msg.includes("assistant") || msg.includes("phoneNumber")) {
            return "There was an issue with the call configuration. Please try again later."
          }

          if (msg.includes("required") || msg.includes("must be")) {
            return "Please check that all fields are filled out correctly."
          }
        }
      }

      if (messages.length > 0 && typeof messages[0] === "string") {
        return messages[0].split(".")[0] + "."
      }
    }

    if (errorData.error && typeof errorData.error === "string") {
      return errorData.error
    }
  } catch {
    if (errorText.includes("phone") || errorText.includes("E.164")) {
      return "Please enter a valid phone number with country code."
    }
  }

  return "Unable to initiate the call. Please check your information and try again."
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 })
    }

    if (containsUnsafeLanguageInFields([name, email, phone])) {
      return NextResponse.json(
        { error: "We couldn't process your request. Please remove unsafe language and try again." },
        { status: 400 },
      )
    }

    const normalizedPhone = normalizePhoneNumber(phone)

    const nameParts = name.trim().split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    const vapiApiKey = process.env.VAPI_API_KEY
    if (!vapiApiKey) {
      return NextResponse.json({ error: "Server configuration error: VAPI_API_KEY not set" }, { status: 500 })
    }

    const vapiRequest = {
      phoneNumberId: "95c2547e-8f7a-495e-87ea-bf1d928e50e2",
      assistantId: "50cedc84-8edc-493d-8995-ef6bf7c33399",
      customer: {
        number: normalizedPhone,
      },
      assistantOverrides: {
        variableValues: {
          first_name: firstName,
          last_name: lastName,
          email_address: email,
        },
      },
    }

    const response = await fetch("https://api.vapi.ai/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vapiApiKey}`,
      },
      body: JSON.stringify(vapiRequest),
    })

    if (!response.ok) {
      const errorText = await response.text()
      const userFriendlyError = normalizeErrorMessage(errorText)
      return NextResponse.json({ error: userFriendlyError }, { status: response.status })
    }

    const data = await response.json()

    return NextResponse.json({ success: true, callId: data.id }, { status: 200 })
  } catch (error) {
    console.error("[API] Error creating call:", error)
    return NextResponse.json({ error: "An unexpected error occurred. Please try again later." }, { status: 500 })
  }
}
