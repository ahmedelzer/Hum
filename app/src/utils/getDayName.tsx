import { storage } from "./storage";

const language = storage.getString("local") || "en";

export function getDayName(dateString: string | number | Date) {
  const date = new Date(dateString);
  const options = { weekday: "long" };
  const locale = language === "en" ? `${language}-US` : `${language}-EG`;
  // console.log(locale, "locale");
  const dayName = date.toLocaleDateString(locale, options as any).split(",")[0];
  return dayName;
}
