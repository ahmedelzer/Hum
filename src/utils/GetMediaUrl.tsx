import { publicImageURL } from "../../request";

// Cache stored in-memory (you could also persist this with AsyncStorage or localStorage)
const cachedVersions: Record<string, string> = {};

export function GetMediaUrl(route: string, type: string): string {
  if (type === "publicImage") {
    let url = `${publicImageURL}/${route}`;
    return url;
  }
}
