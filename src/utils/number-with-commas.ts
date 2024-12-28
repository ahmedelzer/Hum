export function numberWithCommas(x: string | number) {
  return x?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
