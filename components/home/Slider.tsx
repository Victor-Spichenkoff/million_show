"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image, {StaticImageData} from "next/image";

interface ISlider {
    images: string[] | StaticImageData[]
}

export default function Slider({images}: ISlider) {
    return (
        <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            loop
            autoplay={{ delay: 2500 }}
            className="h-fit overflow-hidden"
        >
            { images.map(imageSrc => (
            <SwiperSlide>
                <Image
                    src={imageSrc}
                    alt={"Question Example"}
                    className="w-full h-full object-cover"
                />
            </SwiperSlide>

            )) }
        </Swiper>
    );
}
