import { isIOS } from "./deviceDetection"

export function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", async () => {
        try {
          const registration = await navigator.serviceWorker.register("/serviceWorker.js")
  
          // Check for updates every 60 minutes (except on iOS where it can cause issues)
        if (!isIOS()) {
          setInterval(
            () => {
              registration.update()
            },
            60 * 60 * 1000,
          )
        }
  
          // Handle updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing
  
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // New content is available, show notification to user
                  if (confirm("ورژن جدید در دسترس است! به‌روزرسانی شود؟")) {
                    window.location.reload()
                  }
                }
              })
            }
          })
  
          console.log("Service Worker registered successfully")
        } catch (error) {
          console.error("Service Worker registration failed:", error)
        }
      })
  
      // Detect controller change (when a new service worker takes over)
      let refreshing = false
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true
          window.location.reload()
        }
      })
    }
  }
  
  