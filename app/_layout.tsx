// import "react-native-gesture-handler";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { SafeAreaView } from "react-native";
// import { GluestackUIProvider } from "../components/ui";
// import { LocalizationProvider } from "../context/LocalizationContext";
// import { WS_Provider } from "../context/WS";
// import { AuthProvider } from "../context/auth";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { Provider } from "react-redux";
// import store from "../src/store/cartStore";
// import { Slot } from "expo-router";
// import "../global.css";
// const queryClient = new QueryClient();
// export default function Layout() {
//   console.log("====================================");
//   console.log("from:layout");
//   console.log("====================================");
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Provider store={store}>
//         <QueryClientProvider client={queryClient}>
//           <GluestackUIProvider mode="light">
//             <LocalizationProvider>
//               <WS_Provider>
//                 <AuthProvider>
//                   <SafeAreaView style={{ flex: 1 }}>
//                     <Slot />
//                   </SafeAreaView>
//                 </AuthProvider>
//               </WS_Provider>
//             </LocalizationProvider>
//           </GluestackUIProvider>
//         </QueryClientProvider>
//       </Provider>
//     </GestureHandlerRootView>
//   );
// }
