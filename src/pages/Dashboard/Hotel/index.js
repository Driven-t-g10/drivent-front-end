import { useEffect } from 'react';
import { useState } from 'react';
import HotelForm from '../../../components/Dashboard/Hotel/HotelForm.js';
import { Alert } from '../../../components/Dashboard/Hotel/index.js';
import UserRoom from '../../../components/Dashboard/Hotel/UserRoom.js/index.js';
import { Title } from '../../../components/Dashboard/Payment';
import useGetUserRoom from '../../../hooks/api/useGetUserRoom';
import useGetUserTicket from '../../../hooks/api/useGetUserTicket';

export default function Hotel() {
  const [userTicket, setUserTicket] = useState(null);
  const [userRoom, setUserRoom] = useState(null);
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const { getUserTicket } = useGetUserTicket();
  const { getUserRoom } = useGetUserRoom();

  useEffect(() => {
    const promise = getUserTicket();
    promise.then((response) => {
      setUserTicket(response.userTicket);
      if (response.userTicket?.isPaid && response.userTicket?.hasHotel) {
        getUserRoom().then((response) => {
          setUserRoom(response);
          setBooked(true);
          setLoading(false);
        });
      }
    });
  }, [loading]);

  function showPage() {
    if (!userTicket || !userTicket?.isPaid)
      return (
        <Alert>Você precisa ter confirmado pagamento antes de fazer a escolha de fazer a escolha de hospedagem</Alert>
      );
    if (!userTicket?.hasHotel)
      return <Alert>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</Alert>;
    if (!userRoom && booked) return <HotelForm setLoading={setLoading} setBooked={setBooked} />;
  }

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      {showPage()}
      {userRoom && booked ? <UserRoom userRoom={userRoom} setUserRoom={setUserRoom} /> : <></>}
    </>
  );
}
