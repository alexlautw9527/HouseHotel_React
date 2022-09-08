import { useReducer } from 'react';
import { useParams } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';
import { useHandleInfoData } from "../../hooks/useHandleInfoData";
import { BookingContext } from '../../hooks/useBookingContext'

import { bookingReducer } from "../../reducers/bookingReducer";
import { modalReducer } from "../../reducers/modalReducer";
import { ACTION } from "../../actions/action_type";

import { Link } from "react-router-dom";
import Gallery from "./Gallery";
import DateRangePicker from "../common/DateRangePicker";
import BookingModal from "../bookingmodal/BookingModal";
import RoomAmenityIcon from "../common/RoomAmenityIcon";
import SpinnerModel from '../common/SpinnerModal';

import { imageSrc } from "../../helpers/image_index"

const initBooking = {

  dateRange: [{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }],
  startDate: new Date(),
  endDate: new Date(),

  totalNight: 0,
  holidayNight: 0,
  normalNight: 0,
  totalPrice: 0,

  roomData: null,
  disableDate: null,
  descriptionShortStr: null,
  amenities: null
}

const initModal = {
  isBookingSuccess: null,
  isBookStatusPageOpen: false,
  isBookingModalOpen: false
}


function RoomInfo() {

  const { id } = useParams()
  const { data: resData, isResDataLoading, error } = useFetch(`room/${id}`, "GET", {})
  const [bookingState, bookingDispatch] = useReducer(bookingReducer, initBooking)
  const [modalState, modalDispatch] = useReducer(modalReducer, initModal)
  useHandleInfoData(resData, isResDataLoading, bookingDispatch)

  const { leftArrowIcon } = imageSrc.general

  function handleDateRangeChange(item) {
    const dateRange = [item.selection]
    bookingDispatch({ type: ACTION.CHANGE_DATERANGE, payload: dateRange })
  }

  return (
    <>
      <BookingContext.Provider
        value={{
          id,
          bookingState,
          bookingDispatch,
          modalState,
          modalDispatch
        }}
      >
        {modalState.isBookingModalOpen && (
          <BookingModal />
        )}

        {isResDataLoading && <SpinnerModel />}
        {(!isResDataLoading && bookingState.roomData) &&
          <>
            <main className="flex items-stretch  justify-center">
              <div className="basis-2/5 flex-1	 relative">
                <Link to='/' className="absolute top-10 left-10 z-20 flex">
                  <img src={leftArrowIcon} alt="" className="mr-2" />
                  <span>查看其他房型</span>
                </Link>
                <Gallery srcArr={bookingState.roomData['imageUrl']}>
                  <div className="flex flex-col items-center z-30 absolute mx-auto right-0 left-0 bottom-[25%]">
                    <div className="mb-2">
                      <p className="text-4xl">
                        {
                          bookingState['totalNight'] > 0 ? bookingState['totalPrice'] :
                            bookingState.roomData['normalDayPrice'].toLocaleString()
                        }
                        <span className="text-xl">
                          {
                            ` / ${bookingState['totalNight'] > 0 ? bookingState['totalNight'] : 1}晚`
                          }</span>
                      </p>
                    </div>
                    <button
                      className="bg-primary inline-block py-2 px-14 mb-14 "
                      onClick={() => { modalDispatch({ type: 'OPEN_MODAL' }) }}
                    >
                      <p className="text-white text-center text-xl">Booking Now</p>
                    </button>
                    <div className="roomBgSwiperPagination flex justify-center"></div>
                  </div>
                </Gallery>

              </div>
              <div className="basis-3/5 px-12 pt-16 pb-6 ">

                <article className="flex flex-col justify-between ">
                  <div className="flex items-end justify-between mb-9">
                    <h1 className="text-4xl">{bookingState.roomData['name']}</h1>
                    <p>
                      {
                        [
                          bookingState.descriptionShortStr['guestRangeStr'],
                          bookingState.descriptionShortStr['breakfastAvailableStr'],
                          bookingState.descriptionShortStr['bedNumStr'],
                          bookingState.descriptionShortStr['privateBathAvailableStr'],
                          bookingState.descriptionShortStr['footageStr']
                        ].join('・')
                      }
                    </p>
                  </div>

                  <div className="mb-9 text-sm font-light">

                    {`平日（一～四）價格：${bookingState.roomData['normalDayPrice']} / 假日（五〜日）價格：${bookingState.roomData['holidayPrice']}`}
                    <br />
                    {`入住時間：${bookingState.roomData['checkInAndOut']['checkInEarly']}（最早）/ ${bookingState.roomData['checkInAndOut']['checkInLate']}（最晚）`}
                    <br />
                    {`退房時間：${bookingState.roomData['checkInAndOut']['checkOut']}`}
                  </div>

                  <ul className="mb-9 list-disc text-sm font-light">
                    {
                      bookingState.roomData['description']
                        .split('. ')
                        .map((ele, index) => <li key={index}>{ele}</li>)
                    }
                  </ul>
                </article>
                <div className="flex flex-wrap items-start gap-6 mb-8">
                  {
                    bookingState.amenities.map(
                      ele => {
                        return (
                          <RoomAmenityIcon
                            src={ele['src']}
                            isAvailable={ele['isAvailable']}
                            name={ele['name']}
                            key={ele['name']}
                            isCheckIcon={true}
                          />
                        )
                      }
                    )
                  }
                </div>
                <p className="mb-1">空房狀態查詢</p>
                <DateRangePicker
                  minDate={bookingState.disableDate['minDate']}
                  maxDate={bookingState.disableDate['maxDate']}
                  disableDateArr={bookingState.disableDate['disableDateArr']}
                  dateRange={bookingState.dateRange}
                  onDateRangeChange={handleDateRangeChange}
                  months={2} />
                <button
                  className="block"
                  onClick={() => bookingDispatch({ type: ACTION.RESET_DATERANGE })}>重新選取</button>
              </div>

            </main>
          </>
        }
      </BookingContext.Provider>
    </>

  )
}

export default RoomInfo