import React from 'react';
import {Flex} from '@chakra-ui/react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.css"
import SwiperCore, {Autoplay,Pagination,Navigation} from 'swiper/core';
import SliderCards from './SliderCards';
  // install Swiper modules
  SwiperCore.use([Autoplay,Pagination,Navigation]);


const Slider = () => {
    return (
        <Flex
        h='100vh'
        bgGradient='linear(45deg, #b500a5 0%, #0019de 22%, #2493e8 49%, #ffffff 75%, #ffa600 100%)'
        mt={2}
        alignItems='center'
        justifyContent='center'
        >
            <Swiper 
            spaceBetween={30} 
            centeredSlides={true} 
            autoplay={{"delay": 5000,
            "disableOnInteraction": false}}
            pagination={{"clickable": true}} 
            loop={true}
            navigation={true} >
                <SwiperSlide><SliderCards/></SwiperSlide>
                <SwiperSlide><SliderCards/></SwiperSlide>
                <SwiperSlide><SliderCards/></SwiperSlide>
                <SwiperSlide><SliderCards/></SwiperSlide>
            </Swiper>
        </Flex>
    )
}

export default Slider;
