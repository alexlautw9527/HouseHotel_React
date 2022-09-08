import { imageSrc } from "../../helpers/image_index"

function RoomAmenityIcon({ src, isAvailable, name, isCheckIcon }) {
  const { okIcon, cancelIcon } = imageSrc.general
  return (
    <div className={`flex ${isAvailable ? '' : 'opacity-20'}`}>
      <div className='flex flex-col'>
        <img src={src} alt="" className='w-10 h-10' />
        <p className='text-center text-xs font-light mt-1'>{name}</p>
      </div>
      {
        isCheckIcon && <img src={isAvailable ? okIcon : cancelIcon} alt="" className='self-start ml-1' />
      }
    </div>
  )
}



export default RoomAmenityIcon