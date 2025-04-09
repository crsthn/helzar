import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EmailSkeleton() {
  return (
    <Card className="flex items-center gap-2 p-6">
      <Skeleton className="h-4 w-48 rounded" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </Card>
  );
}
