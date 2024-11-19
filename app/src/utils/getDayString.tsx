export function getDayString(): string {
  return new Date()
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
    .split("/")
    .reverse()
    .join("-");
}
