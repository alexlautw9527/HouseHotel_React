import { useState } from 'react';
import { useBookingContext } from '../../hooks/useBookingContext';
import SpinnerModel from '../common//SpinnerModal';

import { genDisableDate } from '../../helpers/utility';

import axios from "axios"
import { TOKEN, BASE_URL } from "../../config/config"

import { imageSrc } from '../../helpers/image_index';
import { ACTION } from '../../actions/action_type';


function BookingStatus({ isBookingSuccess, onCloseModalClick }) {
  const { id, bookingDispatch, modalDispatch } = useBookingContext()

  const { statusBgIcon, checkIcon, crossWhiteIcon } = imageSrc.general
  const [isFetchLoading, setIsFetchLoading] = useState(false)

  function onDisableDateChange(resData) {
    const payload = {
      disableDate: genDisableDate(resData['booking']),
    }
    bookingDispatch({ type: ACTION.FETCH_DATA, payload: payload })
  }

  async function onCloseStatusPageClick() {
    setIsFetchLoading(true)
    try {
      const res = await axios({
        method: 'GET',
        baseURL: BASE_URL,
        url: `room/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
      })
      onDisableDateChange(res.data)
      onCloseModalClick()
    } catch {
      onCloseModalClick()
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
          onClick={() => { onCloseStatusPageClick() }}
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