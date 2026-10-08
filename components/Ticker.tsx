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
      className="ticker overflow-hidden border-b border-base-300 bg-base-100/80 backdrop-blur"
      role="marquee"
      aria-label="আজকের দাম পরিবর্তনের তালিকা"
    >
      <div className="ticker-track py-2">
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
                  className="flex items-center gap-1.5 hover:underline"
                >
                  <span aria-hidden="true">{product.image}</span>
                  <span className="font-medium">{product.nameBn}</span>
                  <span className="text-base-content/70">
                    {formatBanglaPrice(product.today)} টাকা/{getBanglaUnit(product.unit)}
                  </span>
                  <span className={`font-semibold ${dirClass}`}>
                    <span aria-hidden="true">{dirSymbol}</span> {pctStr}%
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Set 2 (for seamless infinite loop) */}
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
                  className="flex items-center gap-1.5 hover:underline"
                  tabIndex={-1}
                >
                  <span>{product.image}</span>
                  <span className="font-medium">{product.nameBn}</span>
                  <span className="text-base-content/70">
                    {formatBanglaPrice(product.today)} টাকা/{getBanglaUnit(product.unit)}
                  </span>
                  <span className={`font-semibold ${dirClass}`}>
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
