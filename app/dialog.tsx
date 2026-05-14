"use client"

import { useState, useEffect, FormEvent } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createCustomer } from "@/lib/data/customerData"

export default function ClubDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState({name: "", phone: ""})

  const handleCreateSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
        await createCustomer(newCustomer);
        localStorage.setItem("seenDialog", "true")
        setIsOpen(false)
        } catch (error: any) {
            console.error(error)
        }
    };

    useEffect(() => {
        const seenDialog = localStorage.getItem("seenDialog") || ""
        if (seenDialog !== "true") {
            setIsOpen(true)
        }
    },[])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 bg-transparent">

        <div className="p-0 pr-6 space-y-2 relative">
            <div className="relative w-full aspect-780/741 overflow-hidden">
              <Image 
                src="/dialog.png" 
                fill 
                alt="دیالوگ"
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <form onSubmit={handleCreateSubmit} className="space-y-2 p-[4vw] rounded-xl absolute top-[6vw] left-[8vw] w-[80vw]">
                <div>
                    <DialogTitle>
                        همراه عزیز لوکال
                    </DialogTitle>
                    <DialogDescription className="text-[4vw] mt-[8vw]">
                         مکان کافه قراره عوض بشه! شماره‌تو این زیر برامون بنویس تا از محل جدید کافه و اتفاقای دیگه باخبر بشی!
                    </DialogDescription>
                </div>
                <div dir="rtl" className="grid gap-2">
                    <div>
                        <Input
                            placeholder="نام(اختیاری)"
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={newCustomer.name}
                            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="شماره تلفن"
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            value={newCustomer.phone}
                            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button type="submit" variant="secondary">
                        <h3> ثبت شماره</h3>
                    </Button>
                </div>
            </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

