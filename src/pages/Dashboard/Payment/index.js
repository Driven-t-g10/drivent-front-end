import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
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

import CheckoutPage from './CheckoutPage';

export default function Payment() {
  const [tickets, setTickets] = useState([]);
  const { getTicket } = useGetTicket();
  const { getUserTicket } = useGetUserTicket();
  const { saveUserTicket } = useSaveUserTicket();
  const [userEnrolled, setUserEnrolled] = useState(true);
  const [hotelOptions, setHotelOptions] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [chosenTicket, setChosenTicket] = useState({});
  const [booked, setBooked] = useState(false);

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
        setBooked(true);
      } catch (err) {
        toast('Não foi possível salvar sua seleção!');
      }
    },

    initialValues: {
      ticketId: '',
      hasHotel: false,
    },
  });

  function handleChosen(id = null, value = null) {
    return () => {
      if (id) {
        let ticket = tickets.find((ticket) => ticket.id === id);
        setChosenTicket(ticket);
        if (ticket.hotelPrice > 0) {
          setHotelOptions(true);
          setConfirmation(false);
        } else {
          setHotelOptions(false);
          setConfirmation(true);
        }
        setData({ ...data, ticketId: id });
      }
      if (value !== null) {
        if (value > 0) {
          setData({ ...data, hasHotel: true });
        } else {
          setData({ ...data, hasHotel: false });
        }
        setConfirmation(true);
      }
    };
  }

  function handleConfirmation() {
    let value;
    if (data.hasHotel) {
      value = chosenTicket.price + chosenTicket.hotelPrice;
    } else {
      value = chosenTicket.price;
    }

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
    const promise = getTicket();
    promise.then((ticketsArr) => {
      setTickets(ticketsArr);
      getUserTicket().then((response) => {
        setData({
          ticketId: response.ticketId || '',
          hasHotel: response.userTicket.hasHotel || false,
          isPaid: response.userTicket?.isPaid || false,
          id: response.userTicket?.id || null,
        });
        if (response.userTicket) {
          const ticket = ticketsArr.find((ticket) => ticket.id === response.userTicket.ticketId);
          setChosenTicket(ticket);
          setBooked(true);
        }
      });
    });
    promise.catch((error) => {
      if (error.response.status === 404) {
        setUserEnrolled(false);
      }
    });
  }, [booked]);

  return booked ? (
    <CheckoutPage chosenTicket={chosenTicket} hasHotel={data.hasHotel} isPaid={data.isPaid} id={data.id} />
  ) : (
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
                onClick={handleChosen(ticket.id)}
              >
                <h1>{ticket.name}</h1>
                <p>R$ {ticket.price}</p>
              </Option>
            ))}
          </OptionsContainer>
          {hotelOptions ? (
            <>
              <Instructions>Ótimo! Agora escolha sua modalidade de hospedagem</Instructions>
              <OptionsContainer>
                <Option chosen={!data.hasHotel && confirmation ? true : false} onClick={handleChosen(null, 0)}>
                  <h1>Sem Hotel</h1>
                  <p>R$ 0</p>
                </Option>
                <Option
                  chosen={data.hasHotel && confirmation ? true : false}
                  onClick={handleChosen(null, chosenTicket.hotelPrice)}
                >
                  <h1>Com Hotel</h1>
                  <p>R$ {chosenTicket.hotelPrice}</p>
                </Option>
              </OptionsContainer>
            </>
          ) : null}
          {confirmation ? handleConfirmation() : null}
        </>
      ) : (
        <Alert>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Alert>
      )}
    </>
  );
}
