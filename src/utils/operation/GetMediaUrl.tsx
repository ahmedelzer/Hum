import { publicImageURL } from "../../../request";
export function GetMediaUrl(route: string, type: string): string {


  if (type === "publicImage") {
    let url = `${publicImageURL}/${route}`;
    return url;
  }
}
