import { Skeleton } from "../ui/skeleton";

const EnquirySkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6">
      {/* Header Skeleton */}
      <div className="flex items-center gap-3 justify-between mb-3">
        <Skeleton className="h-6 w-[200px] sm:w-[30px]" />
        <Skeleton className="h-6 w-[200px] sm:w-[100px]" />
        <Skeleton className="h-6 w-[120px] sm:w-[200px]" />
        <Skeleton className="h-6 w-[120px] sm:w-[100px]" />
        <Skeleton className="h-6 w-[120px] sm:w-[100px]" />
        <Skeleton className="h-6 w-[120px] sm:w-[250px]" />
        <Skeleton className="h-6 w-[120px] sm:w-[150px]" />
      </div>

      {/* Table Row Skeletons */}
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-7 gap-4">
            <Skeleton className="h-4 w-full sm:w-[130px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnquirySkeleton;
