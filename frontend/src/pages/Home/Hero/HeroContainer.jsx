import { EffectCreative } from "swiper";
import "swiper/css";
import "swiper/css/effect-creative";
import { Swiper, SwiperSlide } from "swiper/react";
import Hero from "./Hero";
import Hero2 from "./Hero2";

const HeroContainer = () => {
  return (
    <section>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["120%", 0, -500],
          },
        }}
        modules={[EffectCreative]}
        className="mySwiper5"
        loop={true}
        autoplay={{
          delay: 250,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <Hero2 />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};
export default HeroContainer;
