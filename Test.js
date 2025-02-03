export function dblLinear(n) {
  const U = [...integrateU(n)];
  console.log(U[n], U);
  return 0;
}
function integrateU(n) {
  let result = [];
  for (let i = 1; i < n; i++) {
    let y = 2 * i + 1;
    let z = 3 * i + 1;
    result.push(y);
    result.push(z);
  }
  return new Set([1, ...result].sort((a, b) => a - b));
}
console.log(dblLinear(10));
