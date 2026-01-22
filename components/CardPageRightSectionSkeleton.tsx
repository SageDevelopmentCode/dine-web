import Skeleton from "./Skeleton";

export default function CardPageRightSectionSkeleton() {
  return (
    <div className="w-full md:w-[35%] flex flex-col overflow-y-auto">
      {/* Banner header skeleton */}
      <div className="mb-6 rounded-2xl bg-gray-100 min-h-[120px] px-6 py-2 flex items-center gap-4">
        <Skeleton className="w-[110px] h-[110px] rounded-lg flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Card content area skeleton */}
      <div className="space-y-6">
        {/* Section 1 */}
        <div>
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        </div>

        {/* Section 3 */}
        <div>
          <Skeleton className="h-6 w-36 mb-4" />
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
