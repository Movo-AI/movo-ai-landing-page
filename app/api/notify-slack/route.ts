import { NextRequest, NextResponse } from "next/server"

interface SlackNotificationPayload {
  call_id: string
  name: string
  email: string
  phone: string
  email_domain: string
  phone_country_code: string
  first_name: string
}

export async function POST(request: NextRequest) {
  try {
    const body: SlackNotificationPayload = await request.json()
    const { call_id, name, email, phone, email_domain, phone_country_code, first_name } = body

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL

    if (!slackWebhookUrl) {
      console.warn("[Slack] SLACK_WEBHOOK_URL not set, skipping Slack notification")
      return NextResponse.json(
        { success: true, skipped: true, reason: "webhook_not_configured" },
        { status: 200 },
      )
    }

    const slackMessage = {
      text: "📞 New Call Request from Movo Landing Page",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "📞 New Call Request",
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Name:*\n${name}`,
            },
            {
              type: "mrkdwn",
              text: `*First Name:*\n${first_name}`,
            },
            {
              type: "mrkdwn",
              text: `*Email:*\n${email}`,
            },
            {
              type: "mrkdwn",
              text: `*Email Domain:*\n${email_domain}`,
            },
            {
              type: "mrkdwn",
              text: `*Phone:*\n${phone}`,
            },
            {
              type: "mrkdwn",
              text: `*Country Code:*\n${phone_country_code}`,
            },
            {
              type: "mrkdwn",
              text: `*Call ID:*\n\`${call_id}\``,
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `🕐 <!date^${Math.floor(Date.now() / 1000)}^{date_short_pretty} at {time}|${new Date().toLocaleString()}>`,
            },
          ],
        },
      ],
    }

    const response = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slackMessage),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[Slack] Failed to send notification:", response.status, errorText)
      return NextResponse.json(
        { error: "Failed to send Slack notification" },
        { status: response.status },
      )
    }

    console.log("[Slack] Notification sent successfully")
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[Slack] Error sending notification:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred while sending Slack notification" },
      { status: 500 },
    )
  }
}
