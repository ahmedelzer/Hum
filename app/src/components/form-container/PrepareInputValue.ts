// import ConvertImageToBase64 from "../../../DynamicForm/ConvertImageToBase64";

import convertImageToBase64 from "./ConvertImageToBase64";

export async function PrepareInputValue(type, value) {
  if (type !== "image" || type === "imagePath") {
    return value;
  } else {
    try {
      const base64String = await convertImageToBase64(value);
      return base64String;
    } catch (error) {
      console.error("Failed to convert image to Base64:", error);
      return null;
    }
  }
}
