import Skeleton from "./Skeleton";

export default function ProfileLeftSectionCardSkeleton() {
  return (
    <div className="w-full md:w-[25%] flex flex-col">
      {/* Avatar skeleton */}
      <div className="flex justify-center md:justify-start mb-4">
        <Skeleton className="w-28 h-28 rounded-full" />
      </div>

      {/* User name skeleton */}
      <div className="flex justify-center md:justify-start mb-1">
        <Skeleton className="h-7 w-48" />
      </div>

      {/* Last updated text skeleton */}
      <div className="flex justify-center md:justify-start mb-4">
        <Skeleton className="h-4 w-32" />
      </div>

      {/* View Full Profile button skeleton */}
      <Skeleton className="h-12 w-full rounded-lg mb-4" />

      {/* About me section skeleton */}
      <div className="p-4 rounded-lg bg-gray-100 mb-3">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Emergency contact skeleton */}
      <div className="p-3 rounded-lg bg-gray-100 mb-3">
        <div className="flex gap-3 items-center">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>

      {/* EpiPen section skeleton */}
      <div className="p-3 rounded-lg bg-gray-100 mb-3">
        <div className="flex gap-3 items-center">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="h-4 w-36" />
        </div>
      </div>

      {/* Download Dine section skeleton */}
      <div className="mt-auto">
        <div className="px-5 py-4 rounded-2xl bg-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="h-6 w-36 mb-2" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="hidden md:block">
              <Skeleton className="w-20 h-20 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
