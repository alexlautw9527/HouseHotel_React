


import { useState, useRef } from 'react'
import { useForm } from "react-hook-form";
import { useBookingContext } from '../../hooks/useBookingContext'
import { useOutsideClick } from '../../hooks/useOutsideClick';

import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import SpinnerModel from '../common/SpinnerModal';

import axios from "axios"
import { format } from 'date-fns'

import { TOKEN, BASE_URL } from "../../config/config"
import { getDatesBetween } from '../../helpers/utility';

function BookingForm({ onBookingStatusChange, onCalenderDateChange }) {

  const [isPickerOpen, setIsPickerOpen] = useState(
    { startDate: false, endDate: false }
  )

  const { register, handleSubmit, watch, formState: { errors, isDirty }, getValues, setValue } = useForm();
  const { bookingState, id } = useBookingContext()
  const { dateRange, disableDate, holidayNight, totalNight, normalNight, totalPrice } = bookingState
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)


  async function handleSubmitBooking(data) {
    setIsSubmitLoading(true)
    const { name, tel, startDate, endDate } = data

    const date = getDatesBetween(startDate, endDate).map(ele => format(ele, 'yyyy-MM-dd')).slice(0, -1)
    const postData = JSON.stringify({ name, tel, date, startDate, endDate })

    try {
      const response = await axios({
        method: 'POST',
        baseURL: BASE_URL,
        url: `room/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
        data: postData
      })
      onBookingStatusChange(true)
    } catch {
      onBookingStatusChange(false)
    }
    finally {
      setIsSubmitLoading(false)
    }
  }


  function handleCalenderClick(e) {
    e.preventDefault();
    const type = e.target.dataset.type
    setIsPickerOpen(prevCheck => {
      return { ...prevCheck, [type]: true }
    });
  }

  function handleCalenderOutsideClick(ref) {
    const type = ref.current.dataset.type
    setIsPickerOpen(prevCheck => {
      return { ...prevCheck, [type]: false }
    });
  }

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, handleCalenderOutsideClick)

  const startDateStr = dateRange && format(dateRange[0]['startDate'], 'yyyy-MM-dd')
  const endDateStr = dateRange && format(dateRange[0]['endDate'], 'yyyy-MM-dd')

  return (
    <>
      {isSubmitLoading && <SpinnerModel />}
      <form onSubmit={handleSubmit(handleSubmitBooking)} className="relative bookingForm">
        <label htmlFor="name">
          <h2 >姓名</h2>
          <input
            className='w-full'
            id="name"
            placeholder="請輸入姓名"
            {...register("name", { required: '不得為空' })}
          />
          {
            errors.name &&
            (<div className='formInvalidText'>{errors.name?.message}</div>)
          }
        </label>

        <label htmlFor="tel">
          <h2>手機號碼</h2>
          <input type="tel" placeholder="請輸入手機"
            {...register(
              "tel", {
              required: '不得為空',
              pattern: {
                value: /(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}|09\d{2}(\d{6}|-\d{3}-\d{3})/gm,
                message: "不符合格式"
              }
            })} />
          {
            errors.tel &&
            (<div className='formInvalidText'>{errors.tel?.message}</div>)
          }
        </label>

        <label htmlFor="startDate">
          <h2>入住日期</h2>
          <input
            type="date"
            data-type='startDate'
            onClick={handleCalenderClick}
            className='w-full'
            defaultValue={startDateStr}
            {...register("startDate")}
          />
          {
            isPickerOpen['startDate'] &&
            <div ref={wrapperRef} data-type="startDate" className='fixed'>
              <Calendar
                minDate={disableDate['minDate']}
                maxDate={disableDate['maxDate']}
                onChange={item => {
                  onCalenderDateChange(item, 'startDate')
                  setValue('startDate', format(item, 'yyyy-MM-dd'));
                }}
                date={dateRange[0]['startDate']}
                color={'#949C7C'}
              />
            </div>
          }
        </label>

        <label htmlFor="endDate">
          <h2 >退房日期</h2>
          <input
            type="date"
            data-type='endDate'
            onClick={handleCalenderClick}
            defaultValue={endDateStr}
            {...register(
              "endDate",
              {
                validate: value => {
                  const startDate = getValues('startDate')
                  const endDate = value
                  const BookingDateArr = getDatesBetween(startDate, endDate).slice(0, -1).map(ele => format(ele, 'yyyy-MM-dd'))
                  const disableDateArr = disableDate['disableDateArr'].map(ele => format(ele, 'yyyy-MM-dd'))
                  const isContainDisableDate = BookingDateArr.some(ele => disableDateArr.includes(ele))
                  if (startDate >= endDate) {
                    return '退房日期需大於入住日期'
                  } else if (isContainDisableDate) {
                    return '選取期間已有訂單'
                  }
                }
              }
            )}
          />
          {
            isPickerOpen['endDate'] &&
            <div ref={wrapperRef} data-type="endDate" className='fixed'>
              <Calendar
                minDate={disableDate['minDate']}
                maxDate={disableDate['maxDate']}
                onChange={item => {
                  onCalenderDateChange(item, 'endDate')
                  setValue('endDate', format(item, 'yyyy-MM-dd'))
                }}
                date={dateRange[0]['endDate']}
                color={'#949C7C'}
              />
            </div>
          }
          {
            errors.endDate &&
            (<div className='formInvalidText'>{errors.endDate?.message}</div>)
          }
        </label>

        <p className='text-secondary border-b border-secondary pb-4 mb-2'>
          {`${totalNight}天，${normalNight}晚平日，${holidayNight}晚假日`}
        </p>

        <div className='mb-5'>
          <p className='text-right text-sm'>總計</p>
          <p className='text-right text-2xl'>{`$ ${totalPrice}`}</p>
        </div>


        <button type="submit"
          className={`block text-white bg-primary border border-white w-full py-2 mb-4`}
        >確認送出</button>

        <p className='text-sm text-center'>此預約系統僅預約功能，並不會對您進行收費</p>

      </form>
    </>
  )
}

export default BookingForm