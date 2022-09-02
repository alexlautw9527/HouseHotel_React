import ok from '../images/icon/ok-icon.svg';
import cancel from '../images/icon/cancel-icon.svg';

function RoomAmenityIcon({ src, isAvailable, name, isCheckIcon }) {
  return (

    <div className={`flex ${isAvailable ? '' : 'opacity-20'}`}>
      <div className='flex flex-col'>
        <img src={src} alt="" className='w-10 h-10' />
        <p className='text-center text-xs font-light mt-1'>{name}</p>
      </div>
      {
        isCheckIcon && <img src={isAvailable ? ok : cancel} alt="" className='self-start ml-1' />
      }
    </div>
  )
}

export default RoomAmenityIcon