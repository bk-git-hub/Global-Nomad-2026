import { ActivityDetail } from "@/types/activities";
import Link from "next/link";
import Image from "next/image";

interface ActivityHeadingProps {
  activityInfo: ActivityDetail;
}

export default function ActivityHeading({
  activityInfo,
}: ActivityHeadingProps) {
  return (
    <div className="flex gap-3 p-4 pb-0">
      <div className="flex flex-col gap-2.5">
        <span className="text-nomad-black text-sm">
          {activityInfo.category}
        </span>
        <h1 className="text-2xl font-bold">{activityInfo.title}</h1>
        <div className="flex">
          <div className="flex items-center gap-1 text-sm">
            <span className="text-yellow">★</span>
            <span>
              {activityInfo.rating} ({activityInfo.reviewCount})
            </span>
            <Link href={"#map"} className="flex">
              <Image src={"/location.svg"} alt="장소" width={18} height={18} />
              <span className="text-nomad-black">{activityInfo.address}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
