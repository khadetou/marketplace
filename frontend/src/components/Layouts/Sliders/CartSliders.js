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
        "479":{
            "slidePerView":1,
            "spaceBetween":30
        },
        "767":{
            "slidePerView":2,
            "spaceBetween":10
        },
        "991":{
            "slidePerView":4,
            "spaceBetween":10
        }
    }
    return (
        <Flex
        h='100vh'
        bg='gray.200'
        alignItems='center'
        justifyContent='center'
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
