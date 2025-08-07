export function customFieldsHelper(fieldName: string): string {
  // Split the field name by underscores
  const words = fieldName.split("_");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  // Join the words with a space
  const formattedFieldName = capitalizedWords.join(" ");
  return formattedFieldName;
}
