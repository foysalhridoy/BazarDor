"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("এই পাতাটি দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন।", {
        id: "protected-route-toast",
      });
      router.replace(`/signin?callbackURL=${encodeURIComponent(pathname)}`);
    }
  }, [session, isPending, pathname, router]);

  if (isPending) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
        <div className="skeleton h-6 w-56 rounded-lg"></div>
        <div className="skeleton h-44 w-full rounded-2xl"></div>
        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 space-y-4">
          <div className="skeleton h-8 w-48"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="skeleton h-28 rounded-xl"></div>
            <div className="skeleton h-28 rounded-xl"></div>
            <div className="skeleton h-28 rounded-xl"></div>
          </div>
          <div className="skeleton h-48 w-full rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center min-h-[50vh] gap-4 px-4 py-12 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/70 text-sm">
          অ্যাকাউন্ট যাচাই করা হচ্ছে...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
