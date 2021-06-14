import React from 'react';
import {Flex} from '@chakra-ui/react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.css"
import SwiperCore, {Navigation} from 'swiper/core';
import Cards from './Cards';


SwiperCore.use([Navigation]);

const CartSlider = () => {
    const breakpoints={
        "640": {
          "slidesPerView": 2,
          "spaceBetween": 20
        },
        "768": {
          "slidesPerView": 3,
          "spaceBetween": 40
        },
        "1024": {
          "slidesPerView": 5,
          "spaceBetween": 50
        }
      }
    return (
        <Flex
        h='100vh'
        bg='gray.200'
        alignItems='center'
        >
            <Swiper 
            breakpoints={breakpoints}
            loop={true} 
            centeredSlides={true}  >
                <SwiperSlide><Cards/></SwiperSlide>
                <SwiperSlide><Cards/></SwiperSlide>
                <SwiperSlide><Cards/></SwiperSlide>
                <SwiperSlide><Cards/></SwiperSlide>
                <SwiperSlide><Cards/></SwiperSlide>
                <SwiperSlide><Cards/></SwiperSlide>
            </Swiper>
        </Flex>
    )
}

export default CartSlider;
