"use client";

import Link from "next/link";
import { Product } from "@/lib/data";
import {
  formatBanglaPrice,
  getBanglaUnit,
  getDirectionClass,
  getDirectionSymbol,
  toBanglaDigits,
} from "@/lib/format";

interface TickerProps {
  products: Product[];
}

export default function Ticker({ products }: TickerProps) {
  if (!products || products.length === 0) return null;

  return (
    <div
      className="ticker relative w-full overflow-hidden border-b border-base-300 bg-base-100/95 backdrop-blur select-none z-30"
      role="marquee"
      aria-label="আজকের দাম পরিবর্তনের তালিকা"
    >
      <style>{`
        @keyframes customTickerScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .custom-ticker-track {
          display: flex;
          width: max-content;
          animation: customTickerScroll 28s linear infinite !important;
          will-change: transform;
        }
        .ticker:hover .custom-ticker-track,
        .ticker:focus-within .custom-ticker-track {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="custom-ticker-track py-2">
        {/* Set 1 */}
        <ul className="flex shrink-0 items-center">
          {products.map((product) => {
            const dirSymbol = getDirectionSymbol(product.change.dir);
            const dirClass = getDirectionClass(product.change.dir);
            const pctStr = toBanglaDigits(Math.abs(product.change.pct).toFixed(1));

            return (
              <li
                key={`track1-${product.id}`}
                className="flex items-center gap-1.5 border-e border-base-200 px-4 text-sm whitespace-nowrap"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <span aria-hidden="true" className="text-base">
                    {product.image}
                  </span>
                  <span className="font-semibold text-base-content">
                    {product.nameBn}
                  </span>
                  <span className="text-base-content/70">
                    {formatBanglaPrice(product.today)} টাকা/{getBanglaUnit(product.unit)}
                  </span>
                  <span className={`font-bold ${dirClass}`}>
                    <span aria-hidden="true">{dirSymbol}</span> {pctStr}%
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Set 2 (for continuous seamless loop) */}
        <ul className="flex shrink-0 items-center" aria-hidden="true">
          {products.map((product) => {
            const dirSymbol = getDirectionSymbol(product.change.dir);
            const dirClass = getDirectionClass(product.change.dir);
            const pctStr = toBanglaDigits(Math.abs(product.change.pct).toFixed(1));

            return (
              <li
                key={`track2-${product.id}`}
                className="flex items-center gap-1.5 border-e border-base-200 px-4 text-sm whitespace-nowrap"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  tabIndex={-1}
                >
                  <span className="text-base">{product.image}</span>
                  <span className="font-semibold text-base-content">
                    {product.nameBn}
                  </span>
                  <span className="text-base-content/70">
                    {formatBanglaPrice(product.today)} টাকা/{getBanglaUnit(product.unit)}
                  </span>
                  <span className={`font-bold ${dirClass}`}>
                    <span>{dirSymbol}</span> {pctStr}%
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
