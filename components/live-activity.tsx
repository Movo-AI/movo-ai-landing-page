"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, MapPin, Clock } from "lucide-react"
import { useEffect, useState } from "react"

const activities = [
  { location: "Charlotte", service: "Oil Change", rating: 4, duration: "4m 35s" },
  { location: "Denver", service: "Tire Rotation", rating: 5, duration: "3m 12s" },
  { location: "Austin", service: "Brake Inspection", rating: 5, duration: "5m 48s" },
  { location: "Seattle", service: "Battery Check", rating: 4, duration: "2m 56s" },
  { location: "Miami", service: "Alignment", rating: 5, duration: "6m 22s" },
  { location: "Boston", service: "Fluid Top-off", rating: 4, duration: "3m 45s" },
]

export function LiveActivity() {
  const [visibleActivities, setVisibleActivities] = useState(activities.slice(0, 3))

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleActivities((prev) => {
        const newActivities = [...prev]
        newActivities.shift()
        newActivities.push(activities[Math.floor(Math.random() * activities.length)])
        return newActivities
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    null
  )
}
