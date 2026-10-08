"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/data";
import ProductCard from "./ProductCard";
import { toBanglaDigits } from "@/lib/format";

interface SortableProductListProps {
  products: Product[];
  lockCategory?: string;
  emptyMessage?: string;
}

const SORT_OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortableProductList({
  products,
  lockCategory,
  emptyMessage = "এই নামে কোনো পণ্য পাওয়া যায়নি।",
}: SortableProductListProps) {
  const [sortOrder, setSortOrder] = useState<string>("default");

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    if (lockCategory) {
      list = list.filter((p) => p.category === lockCategory);
    }

    if (sortOrder === "price-asc") {
      list.sort((a, b) => a.today - b.today);
    } else if (sortOrder === "price-desc") {
      list.sort((a, b) => b.today - a.today);
    }

    return list;
  }, [products, lockCategory, sortOrder]);

  return (
    <div className="flex flex-col gap-4">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-base-content/70" aria-live="polite">
          মোট {toBanglaDigits(filteredAndSortedProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-products" className="text-sm font-medium text-base-content/80">
            সাজান:
          </label>
          <select
            id="sort-products"
            className="select select-bordered select-sm font-medium text-sm focus:outline-primary"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid or Empty state */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-12 text-center">
          <p aria-hidden="true" className="text-5xl">
            🧺
          </p>
          <p className="mt-3 text-lg font-medium text-base-content/80">
            {emptyMessage}
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedProducts.map((product) => (
            <li key={product.slug} className="contents">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
