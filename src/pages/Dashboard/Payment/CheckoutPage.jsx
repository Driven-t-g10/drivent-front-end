import { AiFillCheckCircle } from 'react-icons/ai';
import styled from 'styled-components';

import CreditCardForm from '../../../components/CreditCardForm';
import { Title, Instructions, Option, OptionsContainer } from '../../../components/Dashboard/Payment';

export default function CheckoutPage(props) {
  const { chosenTicket, hasHotel, isPaid, id } = props;

  let ticketName;
  let ticketPrice = chosenTicket.price;
  if (!hasHotel && chosenTicket.hotelPrice > 0) {
    ticketName = `${chosenTicket.name} + Sem Hotel`;
  } else if (hasHotel) {
    ticketName = `${chosenTicket.name} + Com Hotel`;
    ticketPrice += chosenTicket.hotelPrice;
  } else {
    ticketName = chosenTicket.name;
  }

  return (
    <>
      <Title>Ingresso e pagamento</Title>
      <Instructions>Ingresso escolhido</Instructions>
      <OptionsContainer>
        <Option chosen={true} style={{ width: '290px', height: '108px', cursor: 'default' }}>
          <h1>{ticketName}</h1>
          <p>R$ {ticketPrice}</p>
        </Option>
      </OptionsContainer>
      <Instructions>Pagamento</Instructions>
      {isPaid ? (
        <Container>
          <AiFillCheckCircle />
          <div>
            <p>
              <span>Pagamento confirmado com sucesso!</span>
            </p>
            <p>Prossiga para escolha de hospedagem e atividades</p>
          </div>
        </Container>
      ) : (
        <CreditCardForm id={id} />
      )}
    </>
  );
}

const Container = styled.section`
  display: flex;
  align-items: center;

  svg {
    font-size: 48px;
    color: #36b853;
  }

  div {
    margin-left: 15px;
  }

  div p {
    line-height: 18px;
  }

  div p span {
    font-weight: 700;
  }
`;
