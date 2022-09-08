import { ACTION } from "../actions/action_type";
import { calculatePrice } from "../helpers/utility";


export function bookingReducer(state, action) {
  switch (action.type) {
    case ACTION.FETCH_DATA: {
      return {
        ...state, ...action.payload
      }
    }
    case ACTION.CHANGE_DATERANGE: {
      const dateRange = action.payload
      const { startDate, endDate } = action.payload[0]
      const { totalNight, holidayNight, normalNight, totalPrice } = calculatePrice(startDate, endDate, state.roomData.holidayPrice, state.roomData.normalDayPrice)
      return {
        ...state, dateRange, startDate, endDate
        , totalNight, holidayNight, normalNight, totalPrice
      }
    }

    case ACTION.CHANGE_SINGLEDATE: {
      if (['startDate', 'endDate'].some(key => key in action.payload)) {
        const dateRange = [{ ...state.dateRange[0], ...action.payload }]
        const { startDate, endDate } = dateRange[0]
        const { totalNight, holidayNight, normalNight, totalPrice } = calculatePrice(startDate, endDate, state.roomData.holidayPrice, state.roomData.normalDayPrice)

        return {
          ...state, dateRange, startDate, endDate
          , totalNight, holidayNight, normalNight, totalPrice
        }
      }
      return state
    }

    case ACTION.RESET_DATERANGE: {
      const dateRange = [{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }]
      const startDate = new Date()
      const endDate = new Date()

      return {
        ...state, dateRange, startDate, endDate
        , totalNight: 0, holidayNight: 0, normalNight: 0, totalPrice: 0
      }
    }

    default:
      return state;
  }
}