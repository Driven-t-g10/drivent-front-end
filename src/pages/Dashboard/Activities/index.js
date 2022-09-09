import { useEffect } from 'react';
import { useState } from 'react';
import { Alert } from '../../../components/Dashboard/Hotel/index.js';
import { Title } from '../../../components/Dashboard/Payment';
import useGetUserTicket from '../../../hooks/api/useGetUserTicket';
import ActivitiesList from '../../../components/Dashboard/Activities/ActivitiesList';

export default function Activities() {
  const [userTicket, setUserTicket] = useState(null);

  const { getUserTicket } = useGetUserTicket();

  useEffect(() => {
    const promise = getUserTicket();
    promise.then((response) => {
      setUserTicket(response.userTicket);
    });
  }, []);

  function showPage() {
    if (!userTicket || !userTicket?.isPaid)
      return <Alert>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</Alert>;
    if (!userTicket?.hasHotel)
      return (
        <Alert>
          Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
        </Alert>
      );
  }

  return (
    <>
      <Title>Escolha de atividades</Title>
      {showPage()}
    </>
  );
}
