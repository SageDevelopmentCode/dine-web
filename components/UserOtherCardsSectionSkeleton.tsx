import Skeleton from "./Skeleton";

export default function UserOtherCardsSectionSkeleton() {
  return (
    <div className="w-full lg:w-[60%] mx-auto mt-20">
      {/* Section title skeleton */}
      <Skeleton className="h-5 sm:h-6 w-48 mb-3" />

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[120px] rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
