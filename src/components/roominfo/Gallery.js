import { useState, useEffect } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination } from "swiper";
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Gallery({ srcArr, children }) {
  const global_swiper_photoswipe_loop_setting = false;
  const [swiper, setSwiperInstance] = useState(null)

  useEffect(() => {
    if (swiper) {
      const photo_swipe_options = {
        gallery: '#my-gallery',
        pswpModule: () => import('photoswipe'),
        children: 'a',
        loop: global_swiper_photoswipe_loop_setting,
        showHideAnimationType: 'none',
        zoom: false,
        initialZoomLevel: 'fit',
        close: true,
        counter: !global_swiper_photoswipe_loop_setting,
        arrowKeys: true,
        bgOpacity: 0.8,
        spacing: 0.5,
        wheelToZoom: true,
      };

      const lightbox = new PhotoSwipeLightbox(photo_swipe_options);

      lightbox.init();

      lightbox.on('change', () => {
        const { pswp } = lightbox;
        swiper.slideTo(pswp.currIndex, 0, false);
        // console.log('Slide index', pswp.currIndex);
        // console.log('Slide object', pswp.currSlide);
        // console.log('Slide object data', pswp.currSlide.data);
      });

      lightbox.on('afterInit', () => {
        const { pswp } = lightbox;
        if (swiper.params.autoplay.enabled) {
          swiper.autoplay.stop();
        };
        console.log('afterInit');
      });


      lightbox.on('closingAnimationStart', () => {
        console.log('closingAnimationStart');
        const { pswp } = lightbox;
        // swiper.slideTo(pswp.currIndex, 0, false);
        /* if autoplay enabled == true -> autoplay.start() when close lightbox */
        if (swiper.params.autoplay.enabled) {
          swiper.autoplay.start();
        }
      });
    }
  }, [swiper])


  return (
    <>
      <Swiper
        className="roomBgSwiper"
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        id="my-gallery"
        spaceBetween={0}
        allowTouchMove={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true
        }}
        loop={global_swiper_photoswipe_loop_setting}
        pagination={{
          el: '.roomBgSwiperPagination',
          clickable: true,
          renderBullet: (index, className) => {
            return '<span class="' + className + '">' + "</span>";
          },
        }}
        modules={[Autoplay, Pagination]}
      >
        {
          srcArr.map(ele => {
            return (
              <SwiperSlide className="w-full">
                <a href={ele}>
                  <div
                    style={{
                      backgroundImage: `linear-gradient(180deg, transparent 30%, #FFFFFF 100%), url(${ele})`
                    }}
                    className="bg-cover h-full">
                  </div>
                </a>
              </SwiperSlide>
            )
          })
        }
        {children}
      </Swiper>
    </>
  )
}


export default Gallery 
