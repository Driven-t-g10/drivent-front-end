import { useState, useEffect } from 'react';
import { Title, Instructions, Option, OptionsContainer } from '../../../components/Dashboard/Payment';
import useGetTicket from '../../../hooks/api/useGetTicket';
import { useForm } from '../../../hooks/useForm';
import useSaveUserTicket from '../../../hooks/api/useSaveUserTicket';
import { toast } from 'react-toastify';
import { ErrorMsg } from '../../../components/PersonalInformationForm/ErrorMsg';

export default function Payment() {
  const [tickets, setTickets] = useState([]);
  // const [chosenTicket, setChosenTicket] = useState();
  const { getTicket } = useGetTicket();
  const { saveUserTicketLoading, saveUserTicket } = useSaveUserTicket();

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {},

    // eslint-disable-next-line space-before-function-paren
    onSubmit: async (data) => {
      const newData = {
        ticketId: data.ticketId,
      };

      try {
        await saveUserTicket(newData);
        toast('Escolha salvas com sucesso!');
      } catch (err) {
        toast('Não foi possível escolher este ticket, erro no sistema!');
      }
    },

    initialValues: {
      ticketId: '',
    },
  });

  useEffect(() => {
    getTicket().then((response) => setTickets(response));
  }, []);
  return (
    <>
      <Title>Ingresso e pagamento</Title>
      <Instructions>Primeiro, escolha sua modalidade de ingresso</Instructions>
      {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
      <OptionsContainer>
        {tickets.map((ticket) => (
          <Option
            key={ticket.id}
            chosen={data.ticketId === ticket.id ? true : false}
            name="ticketId"
            onClick={() => handleChange('ticketId')}
            disabled={saveUserTicketLoading}
            onDoubleClick={handleSubmit}
          >
            <h1>{ticket.name}</h1>
            <p>R$ {ticket.price}</p>
          </Option>
        ))}
      </OptionsContainer>
    </>
  );
}
