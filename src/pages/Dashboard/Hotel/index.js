import { useEffect } from 'react';
import { useState } from 'react';
import HotelForm from '../../../components/Dashboard/Hotel/HotelForm.js';
import UserRoom from '../../../components/Dashboard/Hotel/UserRoom.js/index.js';
import { Title } from '../../../components/Dashboard/Payment';
import useGetUserRoom from '../../../hooks/api/useGetUserRoom';
import useGetUserTicket from '../../../hooks/api/useGetUserTicket';

export default function Hotel() {
  const [userTicket, setUserTicket] = useState(null);
  const [userRoom, setUserRoom] = useState(null);
  const [booked, setBooked] = useState(false);

  const { getUserTicket } = useGetUserTicket();
  const { getUserRoom } = useGetUserRoom();

  useEffect(() => {
    const promise = getUserTicket();
    promise.then((response) => {
      setUserTicket(response.userTicket);
      if (response.userTicket.isPaid && response.userTicket.hasHotel) {
        getUserRoom().then((response) => {
          setUserRoom(response);
          setBooked(true);
        });
      }
    });
  }, [booked]);

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      {userRoom && booked ? (
        <UserRoom userRoom={userRoom} setUserRoom={setUserRoom} />
      ) : (
        <HotelForm setBooked={setBooked} userRoom={userRoom} />
      )}
    </>
  );
}
