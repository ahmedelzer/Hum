import { publicImageURL } from "../../../request";
export function GetMediaUrl(route: string, type: string): string {
  console.log(`${publicImageURL}/${route}`, "GetMediaUrl");

  if (type === "publicImage") {
    let url = `${publicImageURL}/${route}`;
    return url;
  }
}
