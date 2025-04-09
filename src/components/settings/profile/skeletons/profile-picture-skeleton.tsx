import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePictureSkeleton() {
  return (
    <Card className="flex items-center justify-between p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="size-10 rounded-full" />
      </div>
      <Skeleton className="h-10 w-20 rounded-lg" />
    </Card>
  );
}
