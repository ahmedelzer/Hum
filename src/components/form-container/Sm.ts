export function SmMobile(param) {
  // if (param.lookupID !== null) {
  //   return 100;
  // } else if (param.parameterType !== "text") {
  //   return 100;
  // } else return 50;
  return 100;
}
export function SmWeb(param) {
  if (param.lookupID !== null) {
    return 12;
  } else if (param.parameterType !== "text") {
    return 12;
  } else return 6;
}
