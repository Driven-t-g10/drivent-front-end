import { useEffect, useState } from 'react';

import useGetHotel from '../../../../hooks/api/useGetHotel';

import { HotelOption, OptionsContainer } from '../index';
import { Instructions } from '../../Payment';

export default function HotelForm({ setBooked }) {
  const [hotels, setHotels] = useState([]);
  const [chosen, setChosen] = useState({
    hotelId: 0,
    roomId: 0,
  });

  const { getHotel } = useGetHotel();

  useEffect(() => {
    const promise = getHotel();
    promise.then((response) => {
      setHotels(response);
    });
  }, []);

  return (
    <>
      <Instructions>Primeiro, escolha seu hotel</Instructions>
      <OptionsContainer>
        {hotels.map((hotel) => (
          <HotelOption
            key={hotel.id}
            chosen={hotel.id === chosen.hotelId}
            onClick={() => setChosen({ ...chosen, hotelId: hotel.id })}
          >
            <img src={hotel.image} alt={hotel.name} />
            <p>{hotel.name}</p>
            <div>
              <p>
                <span>Tipos de acomodação:</span>
              </p>
              <p>Single e Double</p>
            </div>
            <div>
              <p>
                <span>Vagas disponíveis:</span>
              </p>
              <p>{hotel.spaces - hotel.occupied}</p>
            </div>
          </HotelOption>
        ))}
      </OptionsContainer>
    </>
  );
}
