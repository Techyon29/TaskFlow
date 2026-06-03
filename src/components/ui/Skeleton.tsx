import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
export default function TaskSkeletons() {
  const cards = Array(6).fill(0); 
  return (
    <SkeletonTheme baseColor="#171717" highlightColor="#262626">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((_, i) => (
          <div key={i} className="flex flex-col justify-between p-6 rounded-2xl glass-panel h-[200px]">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 flex-1">
                  <Skeleton circle width={20} height={20} />
                  <Skeleton width="60%" height={20} />
                </div>
                <Skeleton width={50} height={16} borderRadius={6} />
              </div>
              <div className="mt-4">
                <Skeleton count={2} height={14} className="mb-1" />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between">
              <Skeleton width={100} height={14} />
              <div className="flex gap-2">
                <Skeleton width={28} height={28} borderRadius={8} />
                <Skeleton width={28} height={28} borderRadius={8} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
}