export const getPaddedText = (text, numberOfLines = 4) => {
  let lines = text?.split("\n") ?? [];
  let length = lines.length;
  while (length < numberOfLines) {
    lines += "\n";
    length++;
  }
  return lines;
};
