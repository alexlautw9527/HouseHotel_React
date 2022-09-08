import { useBookingContext } from "../../hooks/useBookingContext"
import BookingPage from "./BookingPage"
import BookingStatus from "./BookingStatus"

import { MODAL_ACTION } from "../../actions/action_type"

function BookingModal() {

  const { modalState, modalDispatch } = useBookingContext()
  const { isBookingSuccess, isBookStatusPageOpen } = modalState

  function handleCloseModalClick() {
    modalDispatch({ type: MODAL_ACTION.CLOSE_MODAL })
  }
  return (
    <div className='fixed inset-0 bg-gray-200 bg-opacity-90 transition-opacity w-full h-hull flex z-30 px-14 py-5'>
      {
        isBookStatusPageOpen ?
          <BookingStatus
            isBookingSuccess={isBookingSuccess}
            onCloseModalClick={handleCloseModalClick}
          /> :
          < BookingPage onCloseModalClick={handleCloseModalClick} />
      }
    </div >
  )
}


export default BookingModal