import Skeleton from "./Skeleton";

export default function RestaurantRightSectionSkeleton() {
  return (
    <div className="w-full md:w-[35%] flex flex-col gap-4">
      {/* "We safely accommodate:" heading skeleton */}
      <Skeleton className="h-7 w-56" />

      {/* Allergen cards grid skeleton */}
      <div className="grid grid-cols-4 gap-3">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="w-[88px] h-[88px] rounded-lg" />
        ))}
      </div>

      {/* "Our Safety Protocols:" heading skeleton */}
      <Skeleton className="h-7 w-48 mt-4" />

      {/* Protocol cards grid skeleton */}
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>

      {/* Show All button skeleton */}
      <Skeleton className="h-10 w-32 rounded-lg" />

      {/* "Our Menu:" heading skeleton */}
      <Skeleton className="h-7 w-32 mt-4" />

      {/* Menu category skeleton */}
      <Skeleton className="h-6 w-40" />

      {/* Menu items grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="w-full h-[220px] rounded-lg" />
            <Skeleton className="h-5 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
