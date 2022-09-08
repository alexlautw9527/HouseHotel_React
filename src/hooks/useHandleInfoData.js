import { useEffect, useState } from "react"
import { imageSrc } from "../helpers/image_index"
import { genDisableDate } from "../helpers/utility";
import { ACTION } from "../actions/action_type";

const { amenities: amenitiesSrcObj } = imageSrc

function genDescriptionShortStr(roomData) {
  const { Bed, Footage, GuestMin, GuestMax, 'Private-Bath': PrivateBath, } = roomData['descriptionShort']

  return {
    guestRangeStr: GuestMax > 1 ? `${GuestMin}~${GuestMax}人` : '1人',
    breakfastAvailableStr: roomData['amenities']['Breakfast'] === true ? '附早餐' : '',
    bedNumStr: `${Bed.length}張床`,
    privateBathAvailableStr: PrivateBath === 1 ? `衛浴一間` : '',
    footageStr: `${Footage}平方公尺`
  }
}

export function useHandleInfoData(resData, loading, dispatchFn) {
  useEffect(() => {
    if (resData && !loading) {
      const roomAmenities = resData['room'][0]['amenities']
      const payload = {
        roomData: resData['room'][0],
        disableDate: genDisableDate(resData['booking']),
        descriptionShortStr: genDescriptionShortStr(resData['room'][0]),
        amenities: [
          { isAvailable: roomAmenities["Breakfast"], src: amenitiesSrcObj['breakfast'], name: '早餐' },
          { isAvailable: roomAmenities["Mini-Bar"], src: amenitiesSrcObj['miniBar'], name: 'Mini Bar' },
          { isAvailable: roomAmenities["Room-Service"], src: amenitiesSrcObj['roomService'], name: '客房服務' },
          { isAvailable: roomAmenities["Wi-Fi"], src: amenitiesSrcObj['wifi'], name: 'Wi-fi' },
          { isAvailable: roomAmenities["Child-Friendly"], src: amenitiesSrcObj['childFriendly'], name: '適合兒童' },
          { isAvailable: roomAmenities["Television"], src: amenitiesSrcObj['telephone'], name: '電話' },
          { isAvailable: roomAmenities["Great-View"], src: amenitiesSrcObj['greatView'], name: '優良景觀' },
          { isAvailable: roomAmenities["Refrigerator"], src: amenitiesSrcObj['refrigerator'], name: '冰箱' },
          { isAvailable: roomAmenities["Sofa"], src: amenitiesSrcObj['sofa'], name: '沙發' },
          { isAvailable: roomAmenities["Pet-Friendly"], src: amenitiesSrcObj['petFriendly'], name: '寵物友善' },
          { isAvailable: roomAmenities["Smoke-Free"], src: amenitiesSrcObj['smokeFree'], name: '全面禁煙' },
          { isAvailable: roomAmenities["Air-Conditioner"], src: amenitiesSrcObj['airConditioner'], name: '空調' },
        ]
      }
      dispatchFn({ type: ACTION.FETCH_DATA, payload: payload })

    }
  }, [resData, loading])

}