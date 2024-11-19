import { storage } from "./storage";

const languge = storage.getString("local") || "en";

export function formatDateTime(dateString: string, includeMeridiem = true) {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm =
    languge === "en" ? (hours >= 12 ? "pm" : "am") : hours >= 12 ? "م" : "ص";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  let strTime = `${hours}:${minutes.toString().padStart(2, "0")}`;
  if (includeMeridiem) {
    strTime += ` ${ampm}`;
  }
  return strTime;
}

export const formatDateDay = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
