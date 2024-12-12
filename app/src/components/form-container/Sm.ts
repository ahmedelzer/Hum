export function Sm(param) {
  if (param.lookupID !== null) {
    return 100;
  } else if (param.parameterType !== "text") {
    return 100;
  } else return 50;
}
