import { useState, useEffect } from 'react';
import { Title, Instructions, Option, OptionsContainer } from '../../../components/Dashboard/Payment';
import useGetTicket from '../../../hooks/api/useGetTicket';

export default function Payment() {
  const [tickets, setTickets] = useState([]);
  const [chosenTicket, setChosenTicket] = useState();
  const { getTicket } = useGetTicket();

  useEffect(() => {
    getTicket().then((response) => setTickets(response));
  }, []);
  return (
    <>
      <Title>Ingresso e pagamento</Title>
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
  );
}
