import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import SortableProductList from "@/components/SortableProductList";
import { getBanglaCurrentDate } from "@/lib/format";

export const revalidate = 60;

export default async function HomePage() {
  const products = await getProducts();
  const banglaDate = getBanglaCurrentDate();

  // Top 6 risers: dir === 'up', sorted by pct descending
  const topRisers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Top 6 fallers: dir === 'down', sorted by pct descending
  const topFallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8">
      {/* 2. Hero / Banner Section */}
      <section className="hero rounded-3xl border border-base-300 bg-base-100 shadow-sm overflow-hidden">
        <div className="hero-content w-full flex-col items-center gap-8 py-10 px-6 sm:px-10 lg:flex-row lg:justify-between">
          <div className="max-w-xl text-center lg:text-left">
            <p className="mb-3 inline-flex rounded-full bg-primary/10 px-3.5 py-1 text-sm font-semibold text-primary">
              {banglaDate}
            </p>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-base-content sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="mt-4 text-base text-base-content/75 sm:text-lg leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম, বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3">
              <a
                href="#সব-পণ্য"
                className="btn btn-primary btn-md shadow-md hover:shadow-lg transition-shadow"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          <div className="relative shrink-0 flex justify-center items-center">
            <img
              src="/bazar-hero.svg"
              alt="তাজা বাজারের ঝুড়ি"
              width={340}
              height={272}
              className="h-auto w-full max-w-xs sm:max-w-sm drop-shadow-md"
            />
          </div>
        </div>
      </section>

      {/* 3. Section A — “আজ দাম বেড়েছে ▲” (Top 6 risers) */}
      {topRisers.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="text-xl font-bold text-error">
              ▲
            </span>
            <h2 className="text-2xl font-bold text-base-content">
              আজ দাম বেড়েছে
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topRisers.map((product) => (
              <li key={`riser-${product.slug}`} className="contents">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 3. Section B — “আজ দাম কমেছে ▼” (Top 6 fallers) */}
      {topFallers.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="text-xl font-bold text-success">
              ▼
            </span>
            <h2 className="text-2xl font-bold text-base-content">
              আজ দাম কমেছে
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topFallers.map((product) => (
              <li key={`faller-${product.slug}`} className="contents">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 3. Section C — “সব পণ্য” (All Products with Sort dropdown) */}
      <section id="সব-পণ্য" className="flex flex-col gap-4 scroll-mt-24">
        <div>
          <h2 className="text-2xl font-bold text-base-content">সব পণ্য</h2>
          <p className="text-sm text-base-content/70">
            নিত্যপ্রয়োজনীয় বাজারের সকল পণ্যের তালিকা ও আজকের দাম
          </p>
        </div>

        <SortableProductList products={products} />
      </section>
    </div>
  );
}
