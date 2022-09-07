import { useEffect, useState } from 'react';

import useGetHotel from '../../../../hooks/api/useGetHotel';

import { HotelOption, OptionsContainer } from '../index';
import { Instructions } from '../index';
import Rooms from '../HotelRooms.js/Rooms';

export default function HotelForm({ setBooked, userRoom }) {
  const [hotels, setHotels] = useState([]);
  const [chosen, setChosen] = useState('');

  const { getHotel } = useGetHotel();

  useEffect(() => {
    const promise = getHotel();
    promise.then((response) => {
      setHotels(response);
    });
  }, []);

  function showRoomTypes(roomTypes) {
    let types = roomTypes[0];
    for (let i = 1; i < roomTypes.length; i++) {
      if (i === roomTypes.length - 1) {
        types += ` e ${roomTypes[i]}`;
      } else {
        types += `, ${roomTypes[i]}`;
      }
    }

    return types;
  }

  return (
    <>
      <Instructions>Primeiro, escolha seu hotel</Instructions>
      <OptionsContainer>
        {hotels.map((hotel) => (
          <HotelOption key={hotel.id} chosen={hotel.id === chosen} onClick={() => setChosen(hotel.id)}>
            <img src={hotel.image} alt={hotel.name} />
            <p>{hotel.name}</p>
            <div>
              <p>
                <span>Tipos de acomodação:</span>
              </p>
              <p>{showRoomTypes(hotel.roomTypes)}</p>
            </div>
            <div>
              <p>
                <span>Vagas disponíveis:</span>
              </p>
              <p>{hotel.spaces}</p>
            </div>
          </HotelOption>
        ))}
      </OptionsContainer>
      {chosen ? <Rooms hotelId={chosen} setBooked={setBooked} /> : <></>}
    </>
  );
}
