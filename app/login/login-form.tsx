"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/toastContext"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/admin"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        name,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: "ورود ناموفق",
          description: "نام کاربری یا رمز عبور اشتباه است.",
          variant: "destructive",
        })
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error: any) {
      toast({
        title: "خطا",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-indigo">
        <CardHeader className="space-y-1 flex flex-col items-center text-peach pb-2">
          <div className="flex items-center gap-4 mb-2 aspect-square bg-peach p-4 pb-0 rounded-full">
            <div className="relative w-20 aspect-square animate-[bounce_3s_ease-in-out_infinite]">
              <Image
                src={"/octo.png"}
                alt="لوگوی محلی"
                fill
                />
            </div>
          </div>
          <CardTitle className="text-xl">ورود به پنل</CardTitle>
          <CardDescription className="text-center px-4">برای دسترسی به داشبورد مدیریت، نام کاربری و رمز عبور خود را وارد کنید.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-white">نام کاربری</Label>
              <Input
                id="name"
                type="text"
                placeholder="نام کاربری شما"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-white">رمز عبور</Label>
              <Input
                id="password"
                type="password"
                placeholder="رمز عبور شما"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "در حال ورود..." : "ورود"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}