import { useEffect, useState } from 'react'
import RoomAmenityIcon from './RoomAmenityIcon'
import { useBooking, BookingContext } from '../hooks/useBookingContext'
import BookingForm from './BookingForm'

import searchIcon from '../images/icon/search-icon.svg'
import paymentIcon from '../images/icon/payment-icon.svg'
import bookingIcon from '../images/icon/booking-icon.svg'
import rightArrowIcon from '../images/icon/rightArrow-icon.svg'
import crossIcon from '../images/icon/cross-icon.svg'



function BookingPage({ handleBookingStatusChange, onModelClick }) {

  const { amenities, descriptionShortStr, roomData } = useBooking()

  useEffect(() => { console.log(amenities) }, [amenities])

  return (
    <>
      <div className="flex w-full">

        <div className="basis-2/5 bg-primary text-primary px-10 pt-10 pb-5">
          <BookingForm
            onBookingStatusChange={handleBookingStatusChange}
          />
        </div>
        <div className="basis-4/5 bg-white px-10 pt-12 relative">
          <button className='absolute top-3 right-3'
            onClick={() => { onModelClick(false); console.log('hi') }}
          >
            <img src={crossIcon} alt="" />
          </button>
          <section>
            <div className='flex items-center'>
              <h1 className="text-xl font-bold">
                {roomData['name']}
              </h1>
              <div className='ml-1 h-[1px] grow bg-slate-200'>
              </div>
            </div>

            <div className='py-3'>
              <div className='mb-7'>
                <p>{descriptionShortStr}</p>
                <p> {`平日（一～四）價格：${roomData['normalDayPrice']} / 假日（五〜日）價格：${roomData['holidayPrice']}`}</p>
              </div>


              <div className='flex flex-wrap gap-4'>
                {
                  amenities && amenities.filter(ele => ele['isAvailable'] === true).map(
                    ele => {
                      return (
                        <div className="">
                          <RoomAmenityIcon
                            src={ele['src']}
                            isAvailable={ele['isAvailable']}
                            name={ele['name']}
                            key={ele['name']}
                          />
                        </div>
                      )
                    }
                  )
                }
              </div>
            </div>

          </section>

          <section>
            <div className='flex items-center'>
              <h1 className="font-bold">
                訂房資訊
              </h1>
              <div className='ml-1 h-[1px] grow bg-slate-200'>
              </div>
            </div>
            <ul className="list-disc text-sm font-light leading-loose	py-3">
              <li>
                {
                  `入住時間：最早${roomData['checkInAndOut']['checkInEarly']}，最晚${roomData['checkInAndOut']['checkInLate']}；退房時間：${roomData['checkInAndOut']['checkOut']}，請自行確認行程安排。`
                }
              </li>
              <li>平日定義週一至週四；假日定義週五至週日及國定假日。 </li>
              <li>好室旅店全面禁止吸菸。 </li>
              <li>若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00 - 18:00 )。</li>
            </ul>
          </section>

          <section>
            <div className='flex items-center'>
              <h1 className="font-bold">
                預約流程
              </h1>
              <div className='ml-1 h-[1px] grow bg-slate-200'>
              </div>
            </div>
            <div className='flex items-stretch py-3'>
              <section className='basis-1/3 grow'>
                <div className='flex flex-col h-full'>
                  <div className='h-12 py-2 bg-secondary  flex justify-center'>
                    <img src={paymentIcon} alt="" />
                  </div>
                  <p className='border border-secondary  px-3 py-2 text-center text-secondary rounded-b-lg h-full'>
                    送出線上預約單
                  </p>
                </div>
              </section>

              <div className='h-12 flex items-center justify-center px-2'>
                <img src={rightArrowIcon} alt="" />
              </div>

              <section className='basis-1/3 grow'>
                <div className='flex flex-col h-full'>
                  <div className='h-12 py-2 bg-secondary  flex justify-center'>
                    <img src={searchIcon} alt="" />
                  </div>
                  <p className='border border-secondary  px-3 py-2 text-center text-secondary rounded-b-lg h-full'>
                    系統立即回覆是否預訂成功 並以簡訊發送訂房通知 (若未收到簡訊請來電確認)
                  </p>
                </div>
              </section>

              <div className='h-12 flex items-center justify-center px-2'>
                <img src={rightArrowIcon} alt="" />
              </div>


              <section className='basis-1/3 grow'>
                <div className='flex flex-col h-full'>
                  <div className='h-12 py-2 bg-secondary  flex justify-center'>
                    <img src={bookingIcon} alt="" />
                  </div>
                  <p className='border border-secondary  px-3 py-2 text-center text-secondary rounded-b-lg h-full'>
                    入住當日憑訂房通知 以現金或刷卡付款即可 (僅接受VISA.JCB.銀聯卡)
                  </p>
                </div>
              </section>


            </div>
          </section>
        </div>
      </div >
    </>
  )
}
export default BookingPage