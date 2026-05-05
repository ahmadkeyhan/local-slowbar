import type React from "react"
import type { Viewport } from 'next'
import type { Metadata } from "next"
import localFont from 'next/font/local'
import "./globals.css"
import { ToastProvider } from "@/components/ui/toastContext"
import { Providers } from "./providers"
import { Navbar } from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"

const croissant = localFont({
  src: [
    {
      path: './fonts/croissant/Croissant-Light.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/croissant/Croissant-Bold.woff',
      weight: '700',
      style: 'normal',
    }
  ],
})

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
}

export const metadata: Metadata = {
  title: "Local Slow Bar",
  description: "کافه محلی",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Local Slowbar",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className={croissant.className}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Local Slowbar" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Providers>
          <ToastProvider>
            <Navbar />
            {children}
            <Footer />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  )
}