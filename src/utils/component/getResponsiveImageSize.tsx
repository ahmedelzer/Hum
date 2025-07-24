import { Dimensions } from "react-native";
import { scale } from "react-native-size-matters";

/**
 * Returns a responsive image size based on screen width and scale factor.
 *
 * @param percent - Portion of screen width (0.0 to 1.0), default is 0.3
 * @param options - Optional min and max size limits
 * @returns number - The scaled width/height for the image
 */
export function getResponsiveImageSize(
  percent: number = 0.3,
  options?: { min?: number; max?: number }
): number {
  const screenWidth = Dimensions.get("window").width;
  let size = screenWidth * percent;

  // Clamp the size between min and max if provided
  if (options?.min !== undefined) {
    size = Math.max(size, options.min);
  }
  if (options?.max !== undefined) {
    size = Math.min(size, options.max);
  }

  return scale(size);
}
