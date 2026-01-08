import { ReviewUserInfo } from "./user";

export interface Review {
  id: number;
  user: ReviewUserInfo;
  activityId: number;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
