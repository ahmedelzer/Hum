export function regExp(string: string) {
  return string?.replace(/[_%*+?^0-9${}()|[\]\\]/g, ' '); // $& means the whole matched string x.replace()
}
