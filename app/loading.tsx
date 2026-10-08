export default function HomeLoading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8">
      {/* Hero skeleton */}
      <div className="skeleton h-64 w-full rounded-3xl"></div>

      {/* Section 1 skeleton */}
      <div className="space-y-4">
        <div className="skeleton h-8 w-44 rounded-md"></div>
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
    </div>
  );
}
