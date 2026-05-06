"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import MenuItemManager from "@/components/admin/menuItem/menuItemManager";
import PasswordManager from "@/components/admin/user/passwordManager";
import UserManager from "@/components/admin/user/userManager";
import QRCodeGenerator from "@/components/admin/qrCode/qrCodeGenerator";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Redirect if not authenticated
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Don't render anything until we check authentication
  if (!isClient || status === "loading") {
    return <AdminSkeleton />;
  }

  const isAdmin = session?.user?.role === "admin";
  const isEmployee = session?.user?.role === "employee";

  return (
    <main className="min-h-screen">
      <div className="container px-4 py-6 mx-auto max-w-6xl">
        <Tabs
          defaultValue="items"
          className="w-full flex flex-col lg:flex-row-reverse gap-6"
        >
          <TabsList className="flex flex-wrap lg:flex-col lg:justify-start h-auto w-full lg:w-48 p-1 lg:p-2 lg:shrink-0">
            <TabsTrigger
              value="items"
              className="grow px-2 lg:grow-0 lg:justify-end lg:w-full lg:mb-1"
            >
              آیتم‌ها
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger
                value="users"
                className="grow px-2 lg:grow-0 lg:justify-end lg:w-full lg:mb-1"
              >
                اکانت‌ها
              </TabsTrigger>
            )}
            {isAdmin && (
              <TabsTrigger
                value="qr"
                className="grow px-2 lg:grow-0 lg:justify-end lg:w-full lg:mb-1"
              >
                کیوآر
              </TabsTrigger>
            )}
          </TabsList>
          <div className="flex-1">
            <TabsContent
              value="items"
              className="space-y-6 data-[state=active]:block"
            >
              <h1 className="text-xl text-center lg:text-end ">
                مدیریت آیتم‌ها
              </h1>
              <Suspense fallback={<ItemsSkeleton />}>
                <MenuItemManager isAdmin={isAdmin} />
              </Suspense>
            </TabsContent>

            {isAdmin && (
              <TabsContent
                value="users"
                className="space-y-6 data-[state=active]:block"
              >
                <h1 className="text-xl font-bold text-center lg:text-end ">
                  مدیریت اکانت‌ها
                </h1>
                <Suspense fallback={<UsersSkeleton />}>
                  <PasswordManager />
                  <UserManager />
                </Suspense>
              </TabsContent>
            )}

            {isAdmin && (
              <TabsContent
                value="qr"
                className="space-y-6 data-[state=active]:block"
              >
                <h1 className="text-xl font-bold text-center lg:text-end ">
                  ایجاد کد کیوآر
                </h1>
                <Suspense fallback={<QRCodeSkeleton />}>
                  <QRCodeGenerator />
                </Suspense>
              </TabsContent>
            )}

          </div>
        </Tabs>
      </div>
    </main>
  );
}

function AdminSkeleton() {
  return (
    <div className="min-h-screen bg-peach/20 p-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-10 w-full max-w-md mx-auto mb-6" />
        <Skeleton className="h-150 w-full" />
      </div>
    </div>
  );
}

function ItemsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full max-w-md" />
      <div className="grid gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
      </div>
    </div>
  );
}

function UsersSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full max-w-md" />
      <div className="grid gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
      </div>
    </div>
  );
}

function NotificationsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full max-w-md" />
      <Skeleton className="h-64 w-full rounded-lg" />
    </div>
  );
}

function QRCodeSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Skeleton className="h-100 rounded-lg" />
      <Skeleton className="h-100 rounded-lg" />
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Skeleton className="h-100 rounded-lg" />
      <Skeleton className="h-100 rounded-lg" />
    </div>
  );
}