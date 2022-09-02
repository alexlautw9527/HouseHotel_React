import { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../DateRangePicker.css'


function DateRangePicker({ minDate, maxDate, disableDateArr, dateRange, setDateRange, months }) {



  return (
    <DateRange
      editableDateInputs={false}
      minDate={minDate}
      maxDate={maxDate}
      disabledDates={disableDateArr}
      onChange={item => setDateRange([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={dateRange}
      months={months}
      direction={"horizontal"}
      rangeColors={['#949C7C', '#949C7C']}
    />
  )
}

export default DateRangePicker
