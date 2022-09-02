import { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import './swiper_custom.css'

import GridBrick from './components/GridBrick';
import SpinnerModel from './components/SpinnerModal';

import mainLogo from './images/houseIcon.svg'
import bg1 from './images/bg1.png'
import bg2 from './images/bg2.png'
import bg3 from './images/bg3.png'
import bg4 from './images/bg4.png'


export default function Landing() {

  const { data, loading, error } = useFetch("rooms", "GET", {})
  useEffect(() => { console.log(data) }, [data])
  return (
    <>
      <div className='h-screen flex flex-col justify-center'>
        <Swiper
          className="indexBgSwiper"
          spaceBetween={0}
          allowTouchMove={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true
          }}
          pagination={{
            el: '.indexBgSwiperPagination',
            clickable: true,
            renderBullet: (index, className) => {
              return '<span class="' + className + '">' + "</span>";
            },
          }}
          modules={[Autoplay, Pagination]}
        >
          <SwiperSlide><img src={bg1} alt="" /></SwiperSlide>
          <SwiperSlide><img src={bg2} alt="" /></SwiperSlide>
          <SwiperSlide><img src={bg3} alt="" /></SwiperSlide>
          <SwiperSlide><img src={bg4} alt="" /></SwiperSlide>
        </Swiper>

        <div className='flex container mx-auto z-10	'>
          <div className='flex flex-col basis-1/4'>
            <img src={mainLogo} alt="mainLogo" className='w-1/2 h-1/2' />
            <div className='text-white flex flex-col h-1/2 justify-end'>
              <h1 className='mb-2'>好室旅店。HOUSE HOTEL</h1>
              <p className='font-light'>
                花蓮縣花蓮市國聯一路1號
                <br />
                03-8321155
                <br />
                HOUSE@HOTEL.COM
              </p>
              <div className='mt-10'>
                <div className='indexBgSwiperPagination'>
                </div>
              </div>

            </div>
          </div>
          <section className='flex basis-3/4 flex-wrap'>
            {
              loading ? <SpinnerModel /> :
                data && data['items'].map(ele => <GridBrick img={ele['imageUrl']} basis='basis-1/3' roomName={ele['name']} roomID={ele['id']} key={ele['id']} />)
            }
          </section>
        </div>
      </div>
    </>
  );
};