"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center min-h-[60vh] gap-6 px-4 py-16 text-center">
      <div className="rounded-3xl border border-base-300 bg-base-100 p-10 max-w-md w-full shadow-sm">
        <p aria-hidden="true" className="text-6xl mb-4">
          ⚠️
        </p>
        <h1 className="text-2xl font-bold text-base-content">
          কিছু সমস্যা হয়েছে
        </h1>
        <p className="mt-2 text-sm text-base-content/70">
          পাতাটি লোড করার সময় একটি অপ্রত্যাশিত ত্রুটি দেখা দিয়েছে।
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-primary"
          >
            আবার চেষ্টা করুন
          </button>
          <Link href="/" className="btn btn-outline">
            হোম পেজে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
