import { Suspense } from "react";
import Header from "@/components/layout/header";
import ActivityDetailContent from "@/components/activity/activity-detail-content";
import ActivityReviewList from "@/components/activity/activity-review/activity-review-list";

interface ActivityPageProps {
  params: Promise<{ id: string }>;
}

export default function ActivityPage({ params }: ActivityPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-270 flex-col items-center gap-6 pb-20">
      <Suspense
        fallback={<div className="h-16 w-screen animate-pulse bg-gray-50" />}
      >
        <Header />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-125 w-full animate-pulse rounded-2xl bg-gray-100" />
        }
      >
        <ActivityDetailContent params={params} />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-96 w-full animate-pulse rounded-xl bg-gray-50" />
        }
      >
        <ActivityReviewList params={params} />
      </Suspense>
    </main>
  );
}
