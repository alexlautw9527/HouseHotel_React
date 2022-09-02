import statusBgIcon from '../images/icon/statusBg-icon.svg'
import checkIcon from '../images/icon/check-icon.svg'
import crossWhiteIcon from '../images/icon/crossWhite-icon.svg'
import { useBooking } from '../hooks/useBookingContext'
import axios from "axios"
import { TOKEN, BASE_URL } from "../config/config"
import SpinnerModel from '../components/SpinnerModal';
import { useState, useEffect } from 'react';

function BookingStatus({ isBookingSuccess, onModalOpenClick, onBookingStatusClick }) {
  const { id, setRoomData, setDisableDate, setDateRange } = useBooking()
  const [isFetchLoading, setIsFetchLoading] = useState(false)
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
  async function handleFetchData() {
    setIsFetchLoading(true)

    try {
      const resData = await axios({
        method: 'GET',
        baseURL: BASE_URL,
        url: `room/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
      })
      console.log(resData)
      setRoomData(resData['data']['room'][0])
      setDisableDate(treatDisableDate(resData['data']['booking']))
      setDateRange([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ])
      onModalOpenClick(false);
      onBookingStatusClick(null);
    } catch {
      onModalOpenClick(false);
      onBookingStatusClick(null);
    }
    finally {
      setIsFetchLoading(false)
    }
  }
  const statusText = isBookingSuccess ? '請留意簡訊發送訂房通知，入住當日務必出示此訂房通知， 若未收到簡訊請來電確認，謝謝您' : '哎呀！晚了一步！您預約的日期已經被預約走了， 再看看其它房型吧'

  const statusIcon = isBookingSuccess ? (<img src={checkIcon} alt="" />) : (<p className='text-[60px]'>X</p>)

  return (
    <>
      {isFetchLoading && <SpinnerModel />}
      <div className="relative bg-primary w-full h-full flex justify-center items-center flex-col text-white ">
        <button className='absolute top-3 right-3 z-50'
          onClick={() => { handleFetchData() }}
        >
          <img src={crossWhiteIcon} alt="" />
        </button>
        <div style={{
          backgroundImage: `url(${statusBgIcon})`
        }}
          className='w-[120px] h-[150px] bg-cover flex items-center justify-center mb-10'
        >
          {statusIcon}
        </div>
        <h1 className=" text-5xl mb-10">{isBookingSuccess ? '預約成功' : '預約失敗'}</h1>

        <p className='font-light'>{statusText}</p>
      </div>
    </>
  )
}

export default BookingStatus 