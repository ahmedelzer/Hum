import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import AddCard from "../../components/cards/AddCard";
import "swiper/swiper-bundle.css";
import "./slider.css";
import { View } from "react-native";

const data = [
  { src: require("../../../assets/display/food1.jpg") },
  { src: require("../../../assets/display/food.jpg") },
  { src: require("../../../assets/display/food.jpg") },
  { src: require("../../../assets/display/food.jpg") },
  { src: require("../../../assets/display/food.jpg") },
];

const HomeCarouselWeb = () => {
  return (
    <div className="w-full bg-gray-100 py-4">
      <div className="mx-auto max-w-[1440px]">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1} // always one item
          spaceBetween={0} // full width look
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          // navigation={false}
          pagination={{ clickable: true }}
          className="rounded-2xl overflow-hidden shadow-md"
        >
          {data.map((item, i) => (
            <SwiperSlide key={i}>
              <View
                key={i}
                className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
              >
                <AddCard source={item.src} />
              </View>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCarouselWeb;
