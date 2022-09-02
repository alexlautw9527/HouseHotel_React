import { useState } from "react"
import BookingPage from "./BookingPage"
import BookingStatus from "./BookingStatus"
function BookingModal({ setIsModalOpen }) {
  const [isBookingSuccess, setIsBookingStatus] = useState(null)
  function handleBookingStatusChange(boolean) {
    setIsBookingStatus(boolean)
  }
  return (
    <div className='fixed inset-0 bg-gray-200 bg-opacity-90 transition-opacity w-full h-hull flex z-30 p-14'>
      {
        isBookingSuccess !== null ? (
          <BookingStatus
            isBookingSuccess={isBookingSuccess}
            onBookingStatusClick={handleBookingStatusChange}
            onModalOpenClick={setIsModalOpen}
          />
        ) : (
          < BookingPage
            handleBookingStatusChange={handleBookingStatusChange}
            onModelClick={setIsModalOpen}
          />
        )
      }
    </div >
  )
}


export default BookingModal