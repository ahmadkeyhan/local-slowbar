export function isIOS(): boolean {
    if (typeof window === "undefined") return false
  
    const userAgent = window.navigator.userAgent.toLowerCase()
    return /iphone|ipad|ipod/.test(userAgent)
  }
  
  export function isSafari(): boolean {
    if (typeof window === "undefined") return false
  
    const userAgent = window.navigator.userAgent.toLowerCase()
    return userAgent.includes("safari") && !userAgent.includes("chrome")
  }
  
  export function getIOSVersion(): number | null {
    if (typeof window === "undefined") return null
    if (!isIOS()) return null
  
    const match = window.navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/)
    return match ? Number.parseInt(match[1], 10) : null
  }
  
  export function supportsIOSWebPush(): boolean {
    const iosVersion = getIOSVersion()
    // iOS 16.4+ supports web push notifications
    return iosVersion !== null && iosVersion >= 16.4
  }
  
  