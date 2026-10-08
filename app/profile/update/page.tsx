"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import AuthGuard from "@/components/AuthGuard";
import toast from "react-hot-toast";

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res?.error) {
        const msg = res.error.message || "তথ্য হালনাগাদ করা সম্ভব হয়নি।";
        setError(msg);
        toast.error(msg);
        return;
      }

      toast.success("প্রোফাইলের তথ্য সফলভাবে হালনাগাদ হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch (err: any) {
      const msg = err?.message || "সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-10">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/profile" className="btn btn-ghost btn-xs">
              ← প্রোফাইলে ফিরুন
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold text-base-content">
            প্রোফাইল তথ্য হালনাগাদ
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            আপনার অ্যাকাউন্টের প্রদর্শিত নাম পরিবর্তন করুন
          </p>
        </header>

        <div className="rounded-3xl border border-base-300 bg-base-100 p-8 shadow-sm">
          {error && (
            <div role="alert" className="alert alert-error text-sm mb-4">
              <span aria-hidden="true">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleUpdate} noValidate className="flex flex-col gap-5">
            <div className="form-control w-full">
              <label className="label-text mb-1.5 font-medium text-base-content/85">
                আপনার নাম
              </label>
              <input
                type="text"
                autoComplete="name"
                name="name"
                placeholder="যেমন: আব্দুর রহমান"
                className={`input input-bordered w-full text-base ${
                  error ? "input-error" : ""
                }`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
              />
              <span className="mt-1.5 text-xs text-base-content/60">
                এই নামটি আপনার প্রোফাইল ও ওয়েবসাইটে প্রদর্শিত হবে।
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full sm:w-auto font-medium"
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    হালনাগাদ হচ্ছে…
                  </>
                ) : (
                  "তথ্য হালনাগাদ করুন"
                )}
              </button>

              <Link
                href="/profile"
                className="btn btn-outline w-full sm:w-auto"
              >
                বাতিল করুন
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthGuard>
  );
}
