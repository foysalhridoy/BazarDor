export default function CategoryLoading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="skeleton h-5 w-48 rounded-md"></div>

      {/* Header skeleton */}
      <div className="skeleton h-28 w-full rounded-2xl"></div>

      {/* Counter skeleton */}
      <div className="flex justify-between items-center">
        <div className="skeleton h-6 w-36 rounded-md"></div>
        <div className="skeleton h-8 w-44 rounded-md"></div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="card border border-base-300 bg-base-100 p-4 space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="skeleton size-12 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-28 rounded"></div>
                <div className="skeleton h-3 w-16 rounded"></div>
              </div>
            </div>
            <div className="flex items-end justify-between pt-2 border-t border-base-200">
              <div className="space-y-1">
                <div className="skeleton h-3 w-14 rounded"></div>
                <div className="skeleton h-6 w-24 rounded"></div>
              </div>
              <div className="skeleton h-6 w-14 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
