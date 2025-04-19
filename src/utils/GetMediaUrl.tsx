import { publicImageURL } from "../../request";

export function GetMediaUrl(route, type) {
  if (type === "publicImage") {
    return publicImageURL + "/" + route;
  }
}
