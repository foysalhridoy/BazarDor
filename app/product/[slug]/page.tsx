import Link from "next/link";
import { getProductBySlug } from "@/lib/api";
import AuthGuard from "@/components/AuthGuard";
import {
  formatBanglaPrice,
  getBanglaUnit,
  getDirectionClass,
  getDirectionSymbol,
  getDirectionText,
  toBanglaDigits,
} from "@/lib/format";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center min-h-[60vh] gap-6 px-4 py-16 text-center">
        <div className="rounded-3xl border border-dashed border-base-300 bg-base-100 p-12 max-w-md w-full shadow-sm">
          <p aria-hidden="true" className="text-6xl mb-4">
            🔍
          </p>
          <h1 className="text-2xl font-bold text-base-content">
            পণ্যটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="mt-2 text-sm text-base-content/70">
            সম্ভবত পণ্যটি মুছে ফেলা হয়েছে অথবা ভুল লিংক ব্যবহার করা হয়েছে।
          </p>
          <Link href="/" className="btn btn-primary mt-6">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  // Price statistics calculations
  const marketMins = product.markets?.map((m) => m.min) || [product.today];
  const marketMaxs = product.markets?.map((m) => m.max) || [product.today];
  const minPrice = Math.min(...marketMins);
  const maxPrice = Math.max(...marketMaxs);

  const avgPrice =
    product.markets && product.markets.length > 0
      ? Math.round(
          product.markets.reduce(
            (acc, m) => acc + (m.min + m.max) / 2,
            0
          ) / product.markets.length
        )
      : product.today;

  const dirSymbol = getDirectionSymbol(product.change.dir);
  const dirClass = getDirectionClass(product.change.dir);
  const dirText = getDirectionText(product.change.dir);
  const pctStr = toBanglaDigits(Math.abs(product.change.pct).toFixed(1));
  const unitText = getBanglaUnit(product.unit);

  return (
    <AuthGuard>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
        {/* Breadcrumb */}
        <nav
          aria-label="ব্রেডক্রাম্ব"
          className="breadcrumbs text-sm text-base-content/70"
        >
          <ul>
            <li>
              <Link href="/" className="hover:text-primary">
                হোম
              </Link>
            </li>
            <li>
              <Link
                href={`/category/${product.category}`}
                className="hover:text-primary"
              >
                {product.categoryNameBn}
              </Link>
            </li>
            <li className="font-semibold text-base-content">
              {product.nameBn}
            </li>
          </ul>
        </nav>

        {/* Top — Summary Header Card */}
        <header className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center justify-between">
            <div className="flex items-start sm:items-center gap-5">
              <span
                aria-hidden="true"
                className="grid size-20 sm:size-24 shrink-0 place-items-center rounded-2xl bg-base-200 text-5xl shadow-inner"
              >
                {product.image}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="badge badge-primary badge-outline text-xs font-semibold">
                    {product.categoryIcon} {product.categoryNameBn}
                  </span>
                  <span className="text-xs text-base-content/60">
                    প্রতি {unitText}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content">
                  {product.nameBn}
                </h1>
                <p className="mt-2 text-sm text-base-content/70">
                  গতকালের তুলনায় আজ দাম{" "}
                  <span className="font-semibold text-base-content">
                    {dirText}
                  </span>{" "}
                  <span className={`font-bold ${dirClass}`}>
                    {dirSymbol} {pctStr}%
                  </span>
                </p>
              </div>
            </div>

            {/* Today's Price Box */}
            <div className="rounded-2xl bg-base-200/80 border border-base-300 px-6 py-4 text-center shrink-0">
              <p className="text-xs font-medium text-base-content/60">
                আজকের দাম
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold text-base-content my-0.5">
                {formatBanglaPrice(product.today)}
              </p>
              <p className="text-xs text-base-content/70">টাকা / {unitText}</p>
              <span
                className={`inline-flex items-center gap-1 font-semibold text-sm mt-1.5 ${dirClass}`}
              >
                <span aria-hidden="true">{dirSymbol}</span>
                <span>{pctStr}%</span>
              </span>
            </div>
          </div>
        </header>

        {/* Price Summary & Bazar-wise breakdown Card */}
        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm flex flex-col gap-8">
          {/* Price - Summary Stats */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-base-content">
              দামের সারসংক্ষেপ
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="stat rounded-2xl border border-base-300 bg-base-100/60 p-4 shadow-none">
                <div className="stat-title text-sm text-base-content/70">
                  সর্বনিম্ন দাম
                </div>
                <div className="stat-value text-2xl font-bold text-success my-1">
                  {formatBanglaPrice(minPrice)}
                  <span className="text-sm font-medium text-base-content/80">
                    {" "}
                    টাকা
                  </span>
                </div>
                <div className="stat-desc text-xs text-base-content/60">
                  সবচেয়ে কম দামের বাজার
                </div>
              </div>

              <div className="stat rounded-2xl border border-base-300 bg-base-100/60 p-4 shadow-none">
                <div className="stat-title text-sm text-base-content/70">
                  সর্বাধিক দাম
                </div>
                <div className="stat-value text-2xl font-bold text-error my-1">
                  {formatBanglaPrice(maxPrice)}
                  <span className="text-sm font-medium text-base-content/80">
                    {" "}
                    টাকা
                  </span>
                </div>
                <div className="stat-desc text-xs text-base-content/60">
                  সবচেয়ে বেশি দামের বাজার
                </div>
              </div>

              <div className="stat rounded-2xl border border-base-300 bg-base-100/60 p-4 shadow-none">
                <div className="stat-title text-sm text-base-content/70">
                  গড় দাম
                </div>
                <div className="stat-value text-2xl font-bold text-primary my-1">
                  {formatBanglaPrice(avgPrice)}
                  <span className="text-sm font-medium text-base-content/80">
                    {" "}
                    টাকা
                  </span>
                </div>
                <div className="stat-desc text-xs text-base-content/60">
                  প্রতি {unitText}-এর হিসাবে
                </div>
              </div>
            </div>
          </section>

          {/* বাজারভিত্তিক আজকের দাম Table */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-base-content">
                বাজারভিত্তিক আজকের দাম
              </h2>
              <span className="text-xs text-base-content/60">
                মোট {toBanglaDigits(product.markets?.length || 0)}টি বাজার
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
              <table className="table table-zebra w-full text-sm">
                <thead className="bg-base-200/60 text-base-content">
                  <tr>
                    <th className="py-3 px-4 font-bold">বাজার</th>
                    <th className="py-3 px-4 font-bold">বিভাগ</th>
                    <th className="py-3 px-4 text-right font-bold">সর্বনিম্ন</th>
                    <th className="py-3 px-4 text-right font-bold">সর্বাধিক</th>
                    <th className="py-3 px-4 text-right font-bold">গড়</th>
                  </tr>
                </thead>
                <tbody>
                  {product.markets?.map((item, index) => {
                    const rowAvg = (item.min + item.max) / 2;
                    const hasDecimal = (item.min + item.max) % 2 !== 0;

                    return (
                      <tr key={index} className="hover:bg-base-200/40">
                        <td className="font-semibold text-base-content py-3.5 px-4">
                          {item.market}
                        </td>
                        <td className="text-base-content/70 py-3.5 px-4">
                          {item.division}
                        </td>
                        <td className="text-right text-base-content/90 py-3.5 px-4">
                          {formatBanglaPrice(item.min)} টাকা
                        </td>
                        <td className="text-right text-base-content/90 py-3.5 px-4">
                          {formatBanglaPrice(item.max)} টাকা
                        </td>
                        <td className="text-right font-bold text-primary py-3.5 px-4">
                          {formatBanglaPrice(rowAvg, hasDecimal ? 1 : 0)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Back navigation */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href={`/category/${product.category}`}
            className="btn btn-ghost btn-sm gap-2"
          >
            <span>{product.categoryIcon}</span>
            <span>সব {product.categoryNameBn} পণ্য দেখুন</span>
          </Link>
          <Link href="/" className="btn btn-outline btn-sm">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </AuthGuard>
  );
}
