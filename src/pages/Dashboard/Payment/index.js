import { useState, useEffect, useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import { Title, Instructions, Option, OptionsContainer, Alert } from '../../../components/Dashboard/Payment';
import useGetTicket from '../../../hooks/api/useGetTicket';

export default function Payment() {
  const [tickets, setTickets] = useState([]);
  const [userEnrolled, setUserEnrolled] = useState(true);
  const [chosenTicket, setChosenTicket] = useState();
  const { getTicket } = useGetTicket();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    getTicket(userData.token)
      .then((response) => setTickets(response))
      .catch((error) => {
        if (error.response.status === 404) {
          setUserEnrolled(false);
        }
      });
  }, []);
  return (
    <>
      <Title>Ingresso e pagamento</Title>
      {userEnrolled ? (
        <>
          <Instructions>Primeiro, escolha sua modalidade de ingresso</Instructions>
          <OptionsContainer>
            {tickets.map((ticket) => (
              <Option
                key={ticket.id}
                chosen={chosenTicket === ticket.id ? true : false}
                onClick={() => setChosenTicket(ticket.id)}
              >
                <h1>{ticket.name}</h1>
                <p>R$ {ticket.price}</p>
              </Option>
            ))}
          </OptionsContainer>
        </>
      ) : (
        <Alert>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Alert>
      )}
    </>
  );
}
