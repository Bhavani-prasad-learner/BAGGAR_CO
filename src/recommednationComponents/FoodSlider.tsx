import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { GoStar } from "react-icons/go";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function FoodCoverflowSlider({ images }) {
  if (!images?.length) return null;

  return (
    <div className="w-full py-0">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        spaceBetween={70}
        initialSlide={2}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 2.5,
          slideShadows: false,
        }}
      
        modules={[EffectCoverflow, Pagination]}
        className="food-coverflow-swiper"
      >
        {images.map((item, i) => (
          <SwiperSlide
            key={i}
            className="w-[16rem] h-[24rem]"
          >
            <div className="food-card relative w-full h-full rounded-2xl overflow-hidden">
              {/* IMAGE */}
              <img
                src={item.picPath}
                alt={item.itemName}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* <div className="absolute inset-0 bg-black/40" /> */}

              {/* PRICE */}


              {/* CONTENT */}
              <div className="absolute bottom-1 left-[2%] bg-[#171717] h-36 px-4 py-2 w-[96%] rounded-xl flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="text-md uppercase text-white font-bold  truncate">
                    {item.itemName}
                  </h3>

                  <div className="text-xs text-gray-400 overflow-hidden">
                    {/* 4.5 <GoStar /> */}
                    {item.chefInfo}
                  </div>

                </div>
                       <div className="flex justify-between items-center">
                <span className="text-white text-sm font-semibold">
                  RS {item.price}
                </span>
                {/* <span className="text-sm px-4 py-1 border border-gray-300 rounded-xl">
                  Add
                </span> */}
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
