import Skeleton from "./Skeleton";

export default function RestaurantLeftSectionSkeleton() {
  return (
    <div className="w-full md:w-[25%] flex flex-col gap-3">
      {/* Restaurant name skeleton */}
      <Skeleton className="h-8 w-3/4" />

      {/* Star rating skeleton */}
      <Skeleton className="h-6 w-32" />

      {/* Badges section */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-7 w-32 rounded-full" />
        <Skeleton className="h-7 w-28 rounded-full" />
        <Skeleton className="h-7 w-20 rounded-full" />
      </div>

      {/* About section skeleton */}
      <div className="p-4 rounded-lg bg-gray-100">
        <Skeleton className="h-5 w-20 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Location section skeleton */}
      <div className="p-4 rounded-lg bg-gray-100">
        <Skeleton className="h-5 w-24 mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>

      {/* Phone section skeleton */}
      <div className="p-4 rounded-lg bg-gray-100">
        <Skeleton className="h-5 w-16 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Website section skeleton */}
      <div className="p-4 rounded-lg bg-gray-100">
        <Skeleton className="h-5 w-20 mb-2" />
        <Skeleton className="h-4 w-40" />
      </div>

      {/* Download section skeleton */}
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  );
}
