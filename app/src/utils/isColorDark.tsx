export const isColorDark = (color: string | null) => {
  if (!color) {
    // Handle the case where color is null or an empty string
    return false; // or any default value you prefer
  }

  // Convert the color to RGB
  const rgb = hexToRgb(color);
  if (!rgb) {
    // Handle the case where the color is invalid
    return false; // or any default value you prefer
  }
  // Calculate the brightness of the color
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  // Return true if the brightness is less than or equal to 125, indicating a dark color
  return brightness <= 125;
};

// Function to convert a hex color to RGB
const hexToRgb = (color: string) => {
  const hex = color.replace("#", "");
  if (hex.length !== 6) {
    // Handle invalid hex color
    return null;
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};
