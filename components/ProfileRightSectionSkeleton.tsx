import Skeleton from "./Skeleton";

export default function ProfileRightSectionSkeleton() {
  return (
    <div className="w-full md:w-[35%] flex flex-col overflow-y-auto">
      {/* Page title skeleton */}
      <Skeleton className="h-7 w-64 mb-4" />

      {/* Severe section */}
      <div className="mb-6">
        <Skeleton className="h-4 w-20 mb-3" />
        <div className="flex flex-wrap gap-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-[88px] h-[88px] rounded-lg" />
          ))}
        </div>
      </div>

      {/* Moderate section */}
      <div className="mb-6">
        <Skeleton className="h-4 w-24 mb-3" />
        <div className="flex flex-wrap gap-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="w-[88px] h-[88px] rounded-lg" />
          ))}
        </div>
      </div>

      {/* Mild section */}
      <div className="mb-8">
        <Skeleton className="h-4 w-16 mb-3" />
        <div className="flex flex-wrap gap-3">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="w-[88px] h-[88px] rounded-lg" />
          ))}
        </div>
      </div>

      {/* Info cards section */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-[120px] w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
