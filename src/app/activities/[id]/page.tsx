import Header from "@/components/layout/header";
import { Suspense } from "react";
import ActivityDetailContent from "@/components/activity/activity-detail-content";

interface ActivityPageProps {
  params: Promise<{ id: string }>;
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { id } = await params;

  return (
    <>
      <Header />
      <main className="flex-flex-col mx-auto w-full max-w-270 items-center">
        <Suspense>
          <ActivityDetailContent id={id} />
        </Suspense>

        <Suspense></Suspense>
      </main>
    </>
  );
}
