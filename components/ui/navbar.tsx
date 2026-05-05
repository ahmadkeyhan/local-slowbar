"use client";

import { useState } from "react";
import Link from "next/link";
import { LuMenu, LuX, LuUser, LuLogOut } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
// import * as mdIcons from 'react-icons/md';

// const navItems = [
//   { name: "خــــانـــه", href: "/", icon: 'MdHomeFilled' },
//   { name: "منـــــــــو", href: "/menu", icon: 'MdMenuBook' },
// ];

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Glassmorphism background with futuristic border */}
      <div className="absolute inset-0 bg-white"></div>

      {/* Decorative gradient line */}
      <nav className="relative mx-auto flex max-w-7xl h-15 sm:h-18 items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex gap-2 items-center">
            <div className="w-18">
                <Image
                src={"/localIndigo.png"}
                alt="لوگوی کافه لوکال"
                width={609}
                height={340}
                />
            </div>
            {/* <h1 className="text-lg text-lavender">ویکـــند</h1> */}
          </Link>
        </div>
        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-4">
          {/* {navItems.map((item, index) => {
            const IconComponent = item.icon ? (mdIcons as any)[item.icon] : null
            if (index > 0) return (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-3 py-2 text-sm font-medium hover:text-purple transition-colors duration-300 group"
              >
              <div className="flex items-center gap-3 ml-6">
                {IconComponent && <IconComponent className="h-6 w-6" />}
                <h3 className="font-bold text-base">{item.name}</h3>
              </div>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
            </Link>
          )})} */}
          <Link href={'/admin'} className="text-white">
                <Button variant="ghost" size="sm" className="gap-3 pr-3">
                    {/* <p className="font-bold">{session?.user ? session.user.name : "پنل ادمین"}</p> */}
                    {/* <mdIcons.MdAccountCircle className="w-6 h-6 text-blue" /> */}
                    <div className="w-18">
                        <Image
                        src={"/octo.png"}
                        alt="اختاپوس"
                        width={1}
                        height={1}
                        />
                    </div>
                </Button>
              </Link>
              {session?.user && (
                  <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  >
                    <LuLogOut className="w-4 h-4" />
                  </Button>
              )}
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button
          <Button
            // variant="secondary"
            size="icon"
            className="lg:hidden relative h-9 w-9 rounded-full overflow-hidden  transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <LuMenu
              className="h-5 w-5"
              aria-hidden="true"
            />
          </Button> */}
          <Link href={'/admin'} className="text-white">
            <Button variant="ghost" className="p-0 mt-4 -ml-2">
                {/* <p className="font-bold">{session?.user ? session.user.name : "پنل ادمین"}</p> */}
                {/* <mdIcons.MdAccountCircle className="w-6 h-6 text-blue" /> */}
                <div className="w-14 aspect-square">
                    <Image
                    src={"/octo.png"}
                    alt="اختاپوس"
                    width={108}
                    height={108}
                    />
                </div>
            </Button>
          </Link>
          {session?.user && (
              <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              >
                <LuLogOut className="w-4 h-4" />
              </Button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      
    </header>
  );
}
