import { storage } from "./storage";

export function formatDate(dateString: string | undefined): string {
  if (!dateString) {
    return "";
  }

  const language = storage.getString("locale") || "en";

  const date = new Date(dateString);
  const now = new Date();

  // Check if the date is today
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString(language === "ar" ? "ar-EG" : "en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  }

  // Check if the date is yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return language === "ar" ? "أمس" : "Yesterday";
  }

  // Otherwise, format the date as "MM/DD/YYYY"
  return date.toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
