"use client"

import { useEffect } from "react"
import { registerServiceWorker } from "@/lib/serviceWorkerRegistration"

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    registerServiceWorker()
  }, [])

  return null
}

