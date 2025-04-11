"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
export default function ProductImageCarousel({
  productImages = [],
  thumbnail,
}) {
  // const swiperImages = [
  //   "https://swiperjs.com/demos/images/nature-1.jpg",
  //   "https://swiperjs.com/demos/images/nature-2.jpg",
  //   "https://swiperjs.com/demos/images/nature-3.jpg",
  //   "https://swiperjs.com/demos/images/nature-4.jpg",
  //   "https://swiperjs.com/demos/images/nature-5.jpg",
  //   "https://swiperjs.com/demos/images/nature-6.jpg",
  //   "https://swiperjs.com/demos/images/nature-7.jpg",
  //   "https://swiperjs.com/demos/images/nature-8.jpg",
  // ];
  const swiperImages = productImages.length > 1 ? productImages : [];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div>
      {swiperImages.length <= 0 ? (
        <img
          src={thumbnail}
          alt={""}
          width={566}
          height={566}
          className="w-full"
        />
      ) : (
        <>
          {" "}
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {swiperImages.map((image, i) => {
              return (
                <SwiperSlide key={i}>
                  <img src={image} />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper mt-4"
          >
            {swiperImages.map((image, i) => {
              return (
                <SwiperSlide key={i}>
                  <img src={image} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      )}
    </div>
  );
}
