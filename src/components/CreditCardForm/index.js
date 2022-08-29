import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';

import { useForm } from '../../hooks/useForm';

import Input from '../Form/Input';
import Button from '../Form/Button';
import { toast } from 'react-toastify';
import validations from '../Dashboard/Payment/CreditCardFormValidations';
import useUpdateUserTicketPayment from '../../hooks/api/useUpdateUserTicketPayment';

export default function CreditCardForm({ id, setIsPaid }) {
  const { updateUserTicketPayment } = useUpdateUserTicketPayment();
  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: validations,
    // eslint-disable-next-line space-before-function-paren
    onSubmit: async (data) => {
      const newData = {
        cvc: data.cvc,
        expiry: data.expiry,
        name: data.name,
        number: data.number,
      };

      try {
        await updateUserTicketPayment(id);
        toast('Pagamento efetuado com sucesso!');
        setIsPaid(true);
      } catch (e) {
        toast('Não foi possível efeturar o pagamento!');
      }
    },
    initialValues: {
      cvc: '',
      expiry: '',
      name: '',
      number: '',
      id: id,
    },
  });

  return (
    <>
      <Container>
        <Cards cvc={data.cvc} expiry={data.expiry} name={data.name} number={data.number} />
        <Form>
          <Input
            name="number"
            label="Card Number"
            type="text"
            maxLength="20"
            mask="99999999999999999999"
            size="small"
            helperText="E.g.: 49..., 51..., 36..., 37..."
            value={data.number}
            onChange={handleChange('number')}
          />
          {errors.number && <p className="error">{errors.number}</p>}
          <Input name="name" label="Name" type="text" size="small" value={data.name} onChange={handleChange('name')} />
          {errors.name && <p className="error">{errors.name}</p>}
          <Input
            name="expiry"
            className="expiry"
            label="Valid Thru"
            type="text"
            size="small"
            maxLength="5"
            mask="99/99"
            value={data.expiry}
            onChange={handleChange('expiry')}
          />
          {errors.expiry && <p className="error expiry">{errors.expiry}</p>}
          <Input
            name="cvc"
            className="cvc"
            label="CVC"
            type="text"
            size="small"
            maxLength="3"
            mask="999"
            value={data.cvc}
            onChange={handleChange('cvc')}
          />
          {errors.cvc && <p className="error cvc">{errors.cvc}</p>}
        </Form>
      </Container>
      <Button onClick={handleSubmit}>Finalizar Pagamento</Button>
    </>
  );
}

const Container = styled.section`
  display: flex;
  max-width: 706px;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const Form = styled.form`
  margin-left: 30px;

  div {
    width: 100%;
  }

  div.expiry {
    width: 60%;
    margin-right: 5%;
  }

  div.cvc {
    width: 35%;
  }

  p.error {
    color: red;
    font-size: 12px;
  }
`;
