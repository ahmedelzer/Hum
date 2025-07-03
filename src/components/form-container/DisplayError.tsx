import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

function DisplayError({ dataError, parameterField, setTitle, title }) {
  const localization = useSelector((state) => state.localization.localization);

  const fieldLowercase = parameterField?.toLowerCase();
  const errors = dataError?.error?.errors || {};

  // Convert error keys to lowercase
  const lowercaseError = Object.keys(errors).reduce((acc, key) => {
    acc[key.toLowerCase()] = errors[key];
    return acc;
  }, {});

  if (dataError?.success === false) {
    const errorMessages = lowercaseError[fieldLowercase];

    if (errorMessages?.length > 0) {
      setTitle(`${errorMessages}`);
      return (
        <View>
          <Text className="!text-red-500 mt-1 text-sm">{errorMessages}</Text>
        </View>
      );
    }
  } else if (dataError[parameterField]) {
    //!must get a solution of ui validation errors by all lang
    // Handle UI validation errors
    const errorMessage = title + " " + localization.inputs.error;
    return (
      <View>
        <Text className="!text-red-500 mt-1 text-sm">{errorMessage}</Text>
      </View>
    );
  }

  return null;
}
// const showNewToast = () => {
//   const toast = useToast();
//   const newId = Math.random();
//   toast.show({
//     id: newId,
//     placement: "top",
//     duration: 3000,
//     render: ({ id }) => {
//       const uniqueToastId = "toast-" + id;
//       return (
//         <Toast
//           action="error"
//           variant="outline"
//           nativeID={uniqueToastId}
//           className="p-4 gap-6 border-error-500 w-full shadow-hard-5 max-w-[443px] flex-row justify-between"
//         >
//           <HStack space="md">
//             <Icon as={HelpCircleIcon} className="stroke-error-500 mt-0.5" />
//             <VStack space="xs">
//               <ToastTitle className="font-semibold text-error-500">
//                 Error!
//               </ToastTitle>
//               <ToastDescription size="sm">
//                 Something went wrong.
//               </ToastDescription>
//             </VStack>
//           </HStack>
//           <HStack className="min-[450px]:gap-3 gap-1">
//             <Button variant="link" size="sm" className="px-3.5 self-center">
//               <ButtonText>Retry</ButtonText>
//             </Button>
//             <Pressable onPress={() => toast.close(id)}>
//               <Icon as={CloseIcon} />
//             </Pressable>
//           </HStack>
//         </Toast>
//       );
//     },
//   });
// };
export default DisplayError;
