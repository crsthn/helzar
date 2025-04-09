import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DisplayNameSkeleton() {
  return (
    <Card className="flex items-center justify-between p-6">
      <Skeleton className="h-4 w-24 rounded" />
      <Skeleton className="h-10 w-20 rounded-lg" />
    </Card>
  );
}
