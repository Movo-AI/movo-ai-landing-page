import { NextRequest, NextResponse } from "next/server"

/**
 * Normalizes a phone number to E.164 format
 * Removes all non-digit characters and ensures it starts with a country code
 */
function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, "")

  // If it already starts with +, return as is (assuming it's already in E.164 format)
  if (cleaned.startsWith("+")) {
    return cleaned
  }

  // If it starts with 1 and has 11 digits, it's a US number with country code
  if (cleaned.startsWith("1") && cleaned.length === 11) {
    return "+" + cleaned
  }

  // Otherwise, assume it's a US number without country code and add +1
  return "+1" + cleaned
}

/**
 * Normalizes Vapi API error messages to user-friendly messages
 */
function normalizeErrorMessage(errorText: string): string {
  try {
    // Try to parse as JSON
    const errorData = JSON.parse(errorText)
    
    // Extract message array if it exists
    if (errorData.message && Array.isArray(errorData.message)) {
      const messages = errorData.message
      
      // Check for common error patterns and return user-friendly messages
      for (const msg of messages) {
        if (typeof msg === "string") {
          // Phone number validation errors
          if (msg.includes("customer.number") || msg.includes("phone number") || msg.includes("E.164")) {
            return "Please enter a valid phone number with country code (e.g., +1 for US numbers)."
          }
          
          // Authentication errors
          if (msg.includes("unauthorized") || msg.includes("authentication") || msg.includes("token")) {
            return "There was an authentication error. Please try again later."
          }
          
          // Assistant/phone number ID errors
          if (msg.includes("assistant") || msg.includes("phoneNumber")) {
            return "There was an issue with the call configuration. Please try again later."
          }
          
          // Generic validation errors
          if (msg.includes("required") || msg.includes("must be")) {
            return "Please check that all fields are filled out correctly."
          }
        }
      }
      
      // If we have messages but none matched, return the first one (cleaned up)
      if (messages.length > 0 && typeof messages[0] === "string") {
        // Remove technical details and return a cleaner message
        return messages[0].split(".")[0] + "."
      }
    }
    
    // If there's a generic error message
    if (errorData.error && typeof errorData.error === "string") {
      return errorData.error
    }
  } catch {
    // If parsing fails, check if it's a plain text error
    if (errorText.includes("phone") || errorText.includes("E.164")) {
      return "Please enter a valid phone number with country code."
    }
  }
  
  // Fallback to generic error message
  return "Unable to initiate the call. Please check your information and try again."
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    console.log("[API] Received request:", { name, email, phone })

    if (!name || !email || !phone) {
      console.error("[API] Missing required fields")
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      )
    }

    // Normalize phone number
    const normalizedPhone = normalizePhoneNumber(phone)
    console.log("[API] Normalized phone:", normalizedPhone)

    // Split name into first_name and last_name
    const nameParts = name.trim().split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""
    console.log("[API] Split name:", { firstName, lastName })

    // Get Vapi API key from environment variable
    // Prefer VAPI_API_KEY (server-side only) over NEXT_PUBLIC_VAPI_API_KEY (exposed to client)
    const vapiApiKey = process.env.VAPI_API_KEY || process.env.NEXT_PUBLIC_VAPI_API_KEY
    if (!vapiApiKey) {
      console.error("[API] VAPI_API_KEY or NEXT_PUBLIC_VAPI_API_KEY environment variable is not set")
      return NextResponse.json(
        { error: "Server configuration error: VAPI_API_KEY not set" },
        { status: 500 }
      )
    }

    // Prepare the request to Vapi API
    // Template variables should be under assistantOverrides.variableValues
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

    console.log("[API] Calling Vapi API with request:", JSON.stringify(vapiRequest, null, 2))

    // Make the API call to Vapi
    const response = await fetch("https://api.vapi.ai/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vapiApiKey}`,
      },
      body: JSON.stringify(vapiRequest),
    })

    console.log("[API] Vapi API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[API] Vapi API error:", response.status, errorText)
      const userFriendlyError = normalizeErrorMessage(errorText)
      return NextResponse.json(
        { error: userFriendlyError },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log("[API] Vapi API success response:", data)

    return NextResponse.json(
      { success: true, callId: data.id },
      { status: 200 }
    )
  } catch (error) {
    console.error("[API] Error creating call:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    )
  }
}

