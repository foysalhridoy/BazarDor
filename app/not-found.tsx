import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center min-h-[65vh] gap-6 px-4 py-16 text-center">
      <div className="rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-12 max-w-lg w-full shadow-sm">
        <span aria-hidden="true" className="text-7xl block mb-4">
          🛒
        </span>
        <span className="badge badge-error badge-outline font-mono text-sm font-semibold mb-3">
          ৪০৪ ত্রুটি (404 Not Found)
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content mt-2">
          পাতাটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mt-3 text-sm sm:text-base text-base-content/70 leading-relaxed">
          আপনি যে পাতা বা পণ্যটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ঠিকানাটি ভুল
          লেখা হয়েছে।
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn btn-primary w-full sm:w-auto shadow-sm">
            হোম পেজে ফিরে যান
          </Link>
          <Link
            href="/category/chal"
            className="btn btn-outline w-full sm:w-auto"
          >
            চালের বাজার দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
}
