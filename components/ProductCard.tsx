import Link from "next/link";
import { Product } from "@/lib/data";
import {
  formatBanglaPrice,
  getBanglaUnit,
  getDirectionClass,
  getDirectionSymbol,
  getDirectionText,
  toBanglaDigits,
} from "@/lib/format";

interface ProductCardProps {
  product: Product;
  showChange?: boolean;
}

export default function ProductCard({
  product,
  showChange = true,
}: ProductCardProps) {
  const { change } = product;
  const dirSymbol = getDirectionSymbol(change.dir);
  const dirClass = getDirectionClass(change.dir);
  const dirText = getDirectionText(change.dir);
  const pctStr = toBanglaDigits(Math.abs(change.pct).toFixed(1));

  return (
    <Link
      href={`/product/${product.slug}`}
      prefetch={true}
      className="card border border-base-300 bg-base-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary group"
    >
      <div className="card-body gap-3 p-4">
        {/* Top: Icon + Name + Unit */}
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="grid size-12 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl group-hover:scale-105 transition-transform"
          >
            {product.image}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-base-content group-hover:text-primary transition-colors">
              {product.nameBn}
            </h3>
            <p className="text-xs text-base-content/60">
              প্রতি {getBanglaUnit(product.unit)}
            </p>
          </div>
        </div>

        {/* Bottom: Price + Change badge */}
        <div className="flex items-end justify-between gap-2 pt-1 border-t border-base-200">
          <div>
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-xl font-bold text-base-content">
              {formatBanglaPrice(product.today)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
          </div>

          {showChange && (
            <span
              className={`inline-flex items-center gap-1 rounded-full bg-base-200 px-2 py-1 text-xs font-semibold ${dirClass}`}
              title={`গতকালের তুলনায় ${dirText}`}
            >
              <span aria-hidden="true">{dirSymbol}</span>
              {pctStr}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
