import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';

import { useForm } from '../../hooks/useForm';

import { Instructions } from '../Dashboard/Payment';
import Input from '../Form/Input';
import Button from '../Form/Button';

export default function CreditCardForm() {
  const { handleSubmit, handleChange, data, setData } = useForm({
    initialValues: {
      cvc: '',
      expiry: '',
      name: '',
      number: '',
    },
  });
  // const [creditCardInfo, setCreditCardInfo] = useState({
  //   cvc: '',
  //   expiry: '',
  //   name: '',
  //   number: '',
  // });

  return (
    <>
      <Instructions>Pagamento</Instructions>
      <Container>
        <Cards cvc={data.cvc} expiry={data.expiry} name={data.name} number={data.number} />
        <Form>
          <Input
            name="number"
            label="Card Number"
            type="text"
            size="small"
            maxLength="19"
            mask="9999 9999 9999 9999"
            helperText="E.g.: 49..., 51..., 36..., 37..."
            value={data.number}
            onChange={handleChange('number')}
          />
          <Input name="name" label="Name" type="text" size="small" value={data.name} onChange={handleChange('name')} />
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
        </Form>
      </Container>
      <Button>Finalizar Pagamento</Button>
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
`;
