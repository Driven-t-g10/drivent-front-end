import useAsync from '../useAsync';
import useToken from '../useToken';

import * as userTicketApi from './../../services/userTicketApi';

export default function useUpdateUserTicketPayment() {
  const token = useToken();
  const { act: updateUserTicketPayment } = useAsync((id) => userTicketApi.updateUserTicketPayment(id, token), false);

  return {
    updateUserTicketPayment,
  };
}
