import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import RoomAmenityIcon from "./RoomAmenityIcon";
import SpinnerModel from '../components/SpinnerModal';
import Gallery from "./Gallery";
import DateRangePicker from "./DateRangePicker";
import BookingModal from "./BookingModal";
import { Link } from "react-router-dom";

import airConditioner from '../images/icon/Air-Conditioner-icon.svg';
import breakfast from '../images/icon/Breakfast-icon.svg';
import childFriendly from '../images/icon/Child-Friendly-icon.svg';
import greatView from '../images/icon/Great-View-icon.svg';
import miniBar from '../images/icon/Mini-Bar-icon.svg';
import petFriendly from '../images/icon/Pet-Friendly-icon.svg';
import refrigerator from '../images/icon/Refrigerator-icon.svg';
import roomService from '../images/icon/Room-Service-icon.svg';
import smokeFree from '../images/icon/Smoke-Free-icon.svg';
import sofa from '../images/icon/Sofa-icon.svg';
import telephone from '../images/icon/Telephone-icon.svg';
import wifi from '../images/icon/Wi-fi-icon.svg';
import leftArrow from '../images/icon/leftArrow-icon.svg'

import { useBooking, BookingContext } from '../hooks/useBookingContext'

function RoomInfo() {
  const { id } = useParams()
  const { data: resData, loading, error } = useFetch(`room/${id}`, "GET", {})
  const [roomData, setRoomData] = useState(null)
  const [disableDate, setDisableDate] = useState(null)
  const [amenities, setAmenities] = useState(null)
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])
  const [price, setPrice] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function makeDescriptionShortStr(roomData) {
    const { Bed: bed, Footage: footage, GuestMin: guestMin, GuestMax: guestMax, 'Private-Bath': privateBath } = roomData['descriptionShort']

    const guestNum = guestMax > 1 ? `${guestMin}~${guestMax}人` : '一人'
    const BreakfastAvailable = roomData['amenities']['Breakfast'] === true ? '附早餐' : ''
    const bedNum = `${bed.length.toString()}張床`
    const privateBathAvailable = privateBath === 1 ? `衛浴一間` : ''
    const footageStr = `${footage}平方公尺`

    const descriptionShortStr = [guestNum, BreakfastAvailable, bedNum, privateBathAvailable, footageStr].join('・')
    return descriptionShortStr
  }

  function treatDisableDate(bookingArr) {
    function addDays(date, days) {
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
    const today = new Date()

    let minDate = addDays(today, 1)
    let maxDate = addDays(today, 90)

    let disableDateArr = bookingArr.length > 0 ? bookingArr.map(ele => ele['date']).reduce((acc, cv) => [...acc, ...cv]).map(ele => new Date(ele))
      : []
    return ({ minDate, maxDate, disableDateArr })

  }

  function calculatePrice(startDate, endDate, holidayPrice, normalDayPrice) {
    function getDatesBetweenDates(startDate, endDate) {
      let dates = []
      //to avoid modifying the original date
      const theDate = new Date(startDate)
      while (theDate < new Date(endDate)) {
        dates = [...dates, new Date(theDate)]
        theDate.setDate(theDate.getDate() + 1)
      }
      dates = [...dates, new Date(endDate)]
      return dates
    }
    //最後一天不算錢
    if (+startDate >= +endDate) {
      return {
        totalPrice: 0,
        nightNum: 0,
        holidayNum: 0,
        normalNum: 0
      }
    } else {
      const dateArr = getDatesBetweenDates(startDate, endDate).slice(0, -1);
      const weekdayArr = dateArr.map(ele => ele.getDay())
      const holidayNum = weekdayArr.filter(ele => [0, 5, 6].includes(ele)).length
      const normalNum = dateArr.length - holidayNum
      const totalPrice = holidayPrice * holidayNum + normalDayPrice * normalNum
      console.log({ totalPrice, nightNum: dateArr.length, dateArr })
      return {
        totalPrice: totalPrice.toLocaleString(),
        nightNum: dateArr.length,
        holidayNum,
        normalNum
      }
    }

  }

  useEffect(() => {
    if (resData && !loading) {
      setRoomData(resData['room'][0])
      setDisableDate(treatDisableDate(resData['booking']))
      const roomAmenities = resData['room'][0]['amenities']
      setAmenities(
        [
          { isAvailable: roomAmenities["Breakfast"], src: breakfast, name: '早餐' },
          { isAvailable: roomAmenities["Mini-Bar"], src: miniBar, name: 'Mini Bar' },
          { isAvailable: roomAmenities["Room-Service"], src: roomService, name: '客房服務' },
          { isAvailable: roomAmenities["Wi-Fi"], src: wifi, name: 'Wi-fi' },
          { isAvailable: roomAmenities["Child-Friendly"], src: childFriendly, name: '適合兒童' },
          { isAvailable: roomAmenities["Television"], src: telephone, name: '電話' },
          { isAvailable: roomAmenities["Great-View"], src: greatView, name: '優良景觀' },
          { isAvailable: roomAmenities["Refrigerator"], src: refrigerator, name: '冰箱' },
          { isAvailable: roomAmenities["Sofa"], src: sofa, name: '沙發' },
          { isAvailable: roomAmenities["Pet-Friendly"], src: petFriendly, name: '寵物友善' },
          { isAvailable: roomAmenities["Smoke-Free"], src: smokeFree, name: '全面禁煙' },
          { isAvailable: roomAmenities["Air-Conditioner"], src: airConditioner, name: '空調' },
        ]
      )
    }
  }, [resData, loading])

  useEffect(() => { console.log(roomData, disableDate) }, [roomData, disableDate])

  useEffect(() => {
    if (roomData && dateRange) {
      const price = calculatePrice(
        dateRange[0]['startDate'],
        dateRange[0]['endDate'],
        roomData['holidayPrice'],
        roomData['normalDayPrice']
      )
      setPrice(price)
    }
  }, [dateRange, roomData]
  )

  const descriptionShortStr = roomData ? makeDescriptionShortStr(roomData) : ""


  return (
    <>
      <BookingContext.Provider
        value={{
          dateRange,
          setDateRange,
          amenities,
          disableDate,
          id,
          descriptionShortStr,
          roomData,
          price,
          setRoomData,
          setDisableDate,

        }}
      >
        {isModalOpen && (
          <BookingModal
            setIsModalOpen={setIsModalOpen}
          />
        )}

        {loading && <SpinnerModel />}
        {(!loading && roomData && price) &&
          <>
            <main className="flex items-stretch  justify-center">
              <div className="basis-2/5 flex-1	 relative">
                <Link to='/' className="absolute top-10 left-10 z-20 flex">
                  <img src={leftArrow} alt="" className="mr-2" />
                  <span>查看其他房型</span>
                </Link>
                <Gallery srcArr={roomData['imageUrl']}>
                  <div className="flex flex-col items-center z-30 absolute mx-auto right-0 left-0 bottom-[25%]">
                    <div className="mb-2">
                      <p className="text-4xl">
                        {
                          price['nightNum'] > 0 ? price['totalPrice'] :
                            roomData['normalDayPrice'].toLocaleString()
                        }
                        <span className="text-xl"> {` / ${price['nightNum'] > 0 ? price['nightNum'] : 1}晚`}</span>
                      </p>
                    </div>
                    <button
                      className="bg-primary inline-block py-2 px-14 mb-14 "
                      onClick={() => { setIsModalOpen(true); console.log('hi') }}
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
                    <h1 className="text-4xl">{roomData['name']}</h1>
                    <p>{descriptionShortStr}</p>
                  </div>

                  <div className="mb-9 text-sm font-light">

                    {`平日（一～四）價格：${roomData['normalDayPrice']} / 假日（五〜日）價格：${roomData['holidayPrice']}`}
                    <br />
                    {`入住時間：${roomData['checkInAndOut']['checkInEarly']}（最早）/ ${roomData['checkInAndOut']['checkInLate']}（最晚）`}
                    <br />
                    {`退房時間：${roomData['checkInAndOut']['checkOut']}`}
                  </div>

                  <ul className="mb-9 list-disc text-sm font-light">
                    {roomData['description'].split('. ').map(
                      (ele, index) => <li key={index}>{ele}</li>
                    )
                    }
                  </ul>
                </article>
                <div className="flex flex-wrap items-start gap-6 mb-8">
                  {
                    amenities && amenities.map(
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
                <p className="mb-1">空房狀態查詢</p>
                <DateRangePicker
                  minDate={disableDate['minDate']}
                  maxDate={disableDate['maxDate']}
                  disableDateArr={disableDate['disableDateArr']}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  months={2} />
                <button
                  className="block"
                  onClick={() => {
                    setDateRange([
                      {
                        startDate: new Date(),
                        endDate: new Date(),
                        key: 'selection'
                      }
                    ])
                  }}>重新選取</button>
              </div>

            </main>
          </>
        }
      </BookingContext.Provider>
    </>

  )
}

export default RoomInfo