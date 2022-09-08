import { MODAL_ACTION } from "../actions/action_type";

export function modalReducer(state, action) {
  switch (action.type) {
    case MODAL_ACTION.OPEN_MODAL: {
      return {
        ...state, isBookingModalOpen: true
      }
    }

    case MODAL_ACTION.CLOSE_MODAL: {
      return {
        ...state, isBookingModalOpen: false, isBookStatusPageOpen: false
      }
    }

    case MODAL_ACTION.SET_FAILED_STATUS: {
      return {
        ...state, isBookingSuccess: false, isBookStatusPageOpen: true
      }
    }

    case MODAL_ACTION.SET_SUCCESS_STATUS: {
      return {
        ...state, isBookingSuccess: true, isBookStatusPageOpen: true
      }
    }

    default:
      return state;
  }
}