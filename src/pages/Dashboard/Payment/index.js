import { toast } from 'react-toastify';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import {
  Title,
  Instructions,
  Option,
  OptionsContainer,
  Alert,
  Confirmation,
} from '../../../components/Dashboard/Payment';
import Button from '../../../components/Button';
import FormValidations from '../../../components/Dashboard/Payment/FormValidations';

import { useForm } from '../../../hooks/useForm';
import useGetTicket from '../../../hooks/api/useGetTicket';
import useGetUserTicket from '../../../hooks/api/useGetUserTicket';
import useSaveUserTicket from '../../../hooks/api/useSaveUserTicket';

export default function Payment() {
  const [tickets, setTickets] = useState([]);
  const { getTicket } = useGetTicket();
  const { getUserTicket } = useGetUserTicket();
  const { saveUserTicket } = useSaveUserTicket();
  const { userData } = useContext(UserContext);
  const [userEnrolled, setUserEnrolled] = useState(true);

  const { handleSubmit, data, setData } = useForm({
    validations: FormValidations,

    // eslint-disable-next-line space-before-function-paren
    onSubmit: async (data) => {
      const newData = {
        ticketId: data.ticketId,
        hasHotel: data.hasHotel,
      };

      try {
        await saveUserTicket(newData);
        toast('Seleções salvas com sucesso!');
      } catch (err) {
        toast('Não foi possível salvar sua seleção!');
      }
    },

    initialValues: {
      ticketId: '',
      hasHotel: false,
    },
  });

  function handleChosen(name, value) {
    return () => {
      setData({ ...data, [name]: value });
    };
  }

  function handleConfirmation() {
    let ticket = tickets.find((ticket) => ticket.id === data.ticketId);

    if (data.hasHotel) {
      // procurar o valor do hotel
    }

    const value = ticket.price; // + hotelPrice;

    return (
      <Confirmation>
        <Instructions>
          Fechado! O total ficou em <span>R$ ${value}</span>. Agora é só confirmar
        </Instructions>
        <Button onClick={handleSubmit}>RESERVAR INGRESSO</Button>
      </Confirmation>
    );
  }

  useEffect(() => {
    const tickets = getTicket();
    tickets.then((response) => setTickets(response));
    tickets.catch((error) => {
      if (error.response.status === 404) {
        setUserEnrolled(false);
      }
    });

    getUserTicket().then((response) =>
      setData({
        ticketId: response.ticketId || '',
        hasHotel: response.hasHotel || false,
      })
    );
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
                chosen={data.ticketId === ticket.id ? true : false}
                onClick={handleChosen('ticketId', ticket.id)}
              >
                <h1>{ticket.name}</h1>
                <p>R$ {ticket.price}</p>
              </Option>
            ))}
          </OptionsContainer>
          {data.ticketId && handleConfirmation()}
        </>
      ) : (
        <Alert>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Alert>
      )}
    </>
  );
}
