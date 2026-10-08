"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Category } from "@/lib/data";
import { getBanglaCurrentDate } from "@/lib/format";
import toast from "react-hot-toast";

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const banglaDate = getBanglaCurrentDate();

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
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      {/* Top row: Brand & Auth */}
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3">
        {/* Brand logo & bangla date */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-xl bg-primary text-xl text-primary-content shadow-sm transition-transform group-hover:scale-105"
          >
            🛒
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-bold tracking-tight text-base-content">
              বাজার দর
            </span>
            <span className="block text-xs text-base-content/60">
              {banglaDate}
            </span>
          </span>
        </Link>

        {/* Right side Auth buttons */}
        <div className="ms-auto flex items-center gap-2">
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="skeleton h-9 w-20 rounded-lg"></div>
              <div className="skeleton h-9 w-20 rounded-lg"></div>
            </div>
          ) : session?.user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="btn btn-ghost btn-sm sm:btn-md gap-2"
                title="প্রোফাইল দেখুন"
              >
                <span className="avatar avatar-placeholder">
                  <span className="w-7 rounded-full bg-primary text-xs text-primary-content font-bold">
                    {session.user.name ? session.user.name.charAt(0) : "ইউ"}
                  </span>
                </span>
                <span className="hidden sm:inline font-medium">
                  {session.user.name || "প্রোফাইল"}
                </span>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="btn btn-outline btn-error btn-sm sm:btn-md"
              >
                সাইন আউট
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="btn btn-ghost btn-sm sm:btn-md font-medium"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-primary btn-sm sm:btn-md font-medium shadow-sm"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Second row: Category navigation links */}
      <div className="border-t border-base-200 bg-base-100">
        <nav aria-label="পণ্য ক্যাটাগরি" className="mx-auto w-full max-w-6xl px-4">
          <ul className="flex items-center gap-1 overflow-x-auto py-2 text-sm scrollbar-none">
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <li key={cat.id} className="shrink-0">
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`btn btn-sm whitespace-nowrap transition-colors ${
                      isActive
                        ? "btn-primary shadow-sm"
                        : "btn-ghost hover:bg-base-200"
                    }`}
                  >
                    <span aria-hidden="true">{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
