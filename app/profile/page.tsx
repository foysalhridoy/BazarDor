"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import AuthGuard from "@/components/AuthGuard";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে।");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <AuthGuard>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10">
        <header>
          <h1 className="text-3xl font-extrabold text-base-content">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            আপনার অ্যাকাউন্টের সার্বিক তথ্য ও ব্যবস্থাপনা
          </p>
        </header>

        {/* User Profile Card */}
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-8 shadow-sm sm:flex-row sm:items-center">
          <div className="avatar placeholder shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary text-primary-content flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-md ring-4 ring-primary/15 aspect-square">
              <span>
                {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "ইউ"}
              </span>
            </div>
          </div>

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-base-content">
              {session?.user?.name || "ব্যবহারকারী"}
            </h2>
            <p className="truncate text-sm text-base-content/70 mt-0.5">
              {session?.user?.email}
            </p>
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="badge badge-success badge-outline text-xs">
                অ্যাকাউন্ট সক্রিয়
              </span>
              <span className="badge badge-neutral text-xs">
                বাজার দর সদস্য
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            {/* C3 Challenge Requirement: Update button linking to update route */}
            <Link
              href="/profile/update"
              className="btn btn-primary btn-md gap-2"
            >
              <span>✏️</span>
              <span>তথ্য হালনাগাদ করুন</span>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="btn btn-outline btn-error btn-md gap-2"
            >
              <span>↩︎</span>
              <span>সাইন আউট</span>
            </button>
          </div>
        </div>

        {/* Quick Nav Card */}
        <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-base-content mb-3">
            দ্রুত নেভিগেশন
          </h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/" className="btn btn-ghost btn-sm">
              🏠 হোম পেজ
            </Link>
            <Link href="/category/chal" className="btn btn-ghost btn-sm">
              🍚 চালের বাজার
            </Link>
            <Link href="/category/sobji" className="btn btn-ghost btn-sm">
              🥬 সবজির বাজার
            </Link>
            <Link href="/category/mach" className="btn btn-ghost btn-sm">
              🐟 মাছের বাজার
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
