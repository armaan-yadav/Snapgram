import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(dateString: string): string {
  const currentDate = new Date();
  const givenDate = new Date(dateString);

  const timeDifference = currentDate.getTime() - givenDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30; // Assuming a month is 30 days for simplicity

  if (seconds < minute) {
    return seconds + " seconds ago";
  } else if (seconds < hour) {
    const minutes = Math.floor(seconds / minute);
    return minutes === 1 ? "a minute ago" : minutes + " minutes ago";
  } else if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    return hours === 1 ? "an hour ago" : hours + " hours ago";
  } else if (seconds < month) {
    const days = Math.floor(seconds / day);
    return days === 1 ? "1 day ago" : days + " days ago";
  } else {
    // You can add more conditions for weeks, months, years as needed
    return "a while ago";
  }
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
