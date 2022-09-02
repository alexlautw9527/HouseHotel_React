import { Link } from "react-router-dom";

function GridBrick({ img, basis, roomName, roomID }) {
  console.log(img)
  return (
    <>
      <Link
        to={`/room/${roomID}`}
        style={{ backgroundImage: `url(${img})` }}
        className={`block aspect-square bg-cover ${basis}`}
      >
        <div className="opacity-0 w-full h-full hover:bg-primary hover:opacity-60 flex items-center justify-center text-white">
          {roomName}
        </div>
      </Link>
    </>
  )
}

export default GridBrick