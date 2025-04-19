// import React, { useContext, useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
// import "swiper/swiper-bundle.css";
// import "swiper/css";
// // import "swiper/css/pagination";
// // import "swiper/css/navigation";
// // import "swiper/css/autoplay";
// import "./slider.css";
// import { LocalizationContext } from "../../../context/LocalizationContext";
// import AddCard from "../../components/cards/AddCard";
// const postsStyles = {
//   container: "container",
//   swiper:
//     "productSlider mySwiper mx-auto max-w-[360px] md:max-w-lg xl:max-w-[1410px]",
// };
// function HomeCarouselWeb() {
//   const { isRTL } = useContext(LocalizationContext);
//   const [autoplay, setAutoplay] = useState(false);
//   SwiperCore.use([Pagination, Navigation, Autoplay]);
//   const dir = isRTL ? "rtl" : "ltr";
//   const data = [
//     { src: require("../../../assets/display/food1.jpg") },
//     { src: require("../../../assets/display/food.jpg") },
//     { src: require("../../../assets/display/food.jpg") },
//     { src: require("../../../assets/display/food.jpg") },
//     { src: require("../../../assets/display/food.jpg") },
//   ];
//   return (
//     <>
//       <div className={postsStyles.container} id="swiper-product">
//         <Swiper
//           modules={[Pagination, Navigation, Autoplay]}
//           autoplay={autoplay}
//           dir={dir}
//           navigation={false}
//           onReachEnd={(swiper) => {
//             swiper.autoplay.stop();
//           }}
//           breakpoints={{
//             320: {
//               slidesPerView: 1,
//               spaceBetween: 30,
//             },
//             768: {
//               slidesPerView: 2,
//               spaceBetween: 30,
//             },
//             1024: {
//               slidesPerView: 2,
//               spaceBetween: 30,
//             },
//             1440: {
//               slidesPerView: 4,
//               spaceBetween: 30,
//             },
//           }}
//           pagination={{
//             clickable: true,
//           }}
//           className={postsStyles.swiper}
//         >
//           {data?.map((item) => (
//             <SwiperSlide key={item?.src}>
//               <AddCard source={item.src} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </>
//   );
// }

// export default HomeCarouselWeb;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import AddCard from "../../components/cards/AddCard";
import "swiper/swiper-bundle.css";
import "./slider.css";
import { Image } from "../../../components/ui";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  Text,
} from "react-native";
const data = [
  { src: require("../../../assets/display/food1.jpg") },
  { src: require("../../../assets/display/food.jpg") },
  { src: require("../../../assets/display/food.jpg") },
  { src: require("../../../assets/display/food.jpg") },
  { src: require("../../../assets/display/food.jpg") },
];
const { width } = Dimensions.get("window");

const HomeCarouselWeb = () => {
  return (
    <View>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={true}
        navigation={false}
        onReachEnd={(swiper) => {
          swiper.autoplay.stop();
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        pagination={{
          clickable: true,
        }}
        className="mx-auto w-full h-full"
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <View key={i} className="w-full h-[300px]">
              <AddCard source={item.src} />
            </View>
          </SwiperSlide>
        ))}
      </Swiper>
    </View>
  );
};

export default HomeCarouselWeb;
