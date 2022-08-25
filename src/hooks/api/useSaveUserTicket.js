import useAsync from '../useAsync';
import useToken from '../useToken';

import * as userTicketApi from './../../services/userTicketApi';

export default function useSaveUserTicket() {
  const token = useToken();

  const {
    loading: saveUserTicketLoading,
    error: saveUserTicketError,
    act: saveUserTicket,
  } = useAsync((data) => userTicketApi.saveUserTicket(data, token), false);

  return {
    saveUserTicketLoading,
    saveUserTicketError,
    saveUserTicket,
  };
}
