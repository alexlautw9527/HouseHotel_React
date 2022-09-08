export function getDatesBetween(startDate, endDate) {
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


export function genDisableDate(bookingArr) {

  function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const today = new Date()

  const minDate = addDays(today, 1)
  const maxDate = addDays(today, 90)

  const disableDateArr = bookingArr.length > 0 ? bookingArr
    .map(ele => ele['date'])
    .reduce((acc, cv) => [...acc, ...cv])
    .map(ele => new Date(ele))
    : []
  return ({ minDate, maxDate, disableDateArr })

}


export function calculatePrice(startDate, endDate, holidayPrice, normalDayPrice) {

  if (+startDate >= +endDate) {
    return {
      totalPrice: 0,
      totalNight: 0,
      holidayNight: 0,
      normalNight: 0
    }
  } else {
    const dateArr = getDatesBetween(startDate, endDate).slice(0, -1);
    const weekdayArr = dateArr.map(ele => ele.getDay())
    const holidayNight = weekdayArr.filter(ele => [0, 5, 6].includes(ele)).length
    const normalNight = dateArr.length - holidayNight
    const totalPrice = holidayPrice * holidayNight + normalDayPrice * normalNight

    return {
      totalPrice: totalPrice.toLocaleString(),
      totalNight: dateArr.length,
      holidayNight,
      normalNight
    }
  }

}